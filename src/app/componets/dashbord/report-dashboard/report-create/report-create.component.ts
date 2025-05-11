import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../shared/services/user.service';
import { ReportService } from '../../../../shared/services/report.service';
import { ToastrService } from 'ngx-toastr';
import { AssignedUserDTO } from '../../../../models/assignedUserDTO.model';
import { NotificationService } from '@/app/shared/services/notification.service';
import { NotificationType } from '@/app/models/NotificationType.enum';
import { ReportDTO } from '@/app/models/reportDTO.model';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportCreateComponent implements OnInit {
  reportForm!: FormGroup;
  users: AssignedUserDTO[] = [];
  departments: any[] = [];
  protocolId!: number;
  usersByDepartment: { [key: number]: AssignedUserDTO[] } = {};
  isSubmitting: boolean = false;
  submitted: boolean = false;
  loadingUsers: boolean = false;

  constructor(
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private userService: UserService,
    private reportService: ReportService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getProtocolId();
    this.loadUsers();
  }

  /**
   * Initialize the form with validators
   */
  initForm(): void {
    this.reportForm = this.fb.group({
      type: ['', [Validators.required]],
      serialNumber: ['', [Validators.required]],
      equipmentDescription: [''],
      designation: [''],
      manufacturer: [''],
      immobilization: [''],
      serviceSeg: [''],
      businessUnit: ['']
    });
  }

  /**
   * Get the protocol ID from route params
   */
  getProtocolId(): void {
    this.route.params.subscribe(params => {
      const id = params['protocolId'];
      if (id) {
        this.protocolId = +id;
        console.log('✅ Protocol ID from route:', this.protocolId);
      } else {
        this.toastr.error('Aucun protocole sélectionné', 'Erreur');
        this.router.navigate(['/dashboard/report-dashboard/protocol-selection']);
      }
    });
  }

  /**
   * Load users and organize them by department
   */
  loadUsers(): void {
    this.loadingUsers = true;
    this.reportService.getRequiredUsers(this.protocolId).subscribe({
      next: (users) => {
        this.users = users;
        this.departments = [...new Set(users.map(u => u.department.id))].map(id => {
          return { id, name: users.find(u => u.department.id === id)!.department.name };
        });

        this.departments.forEach((dept) => {
          this.reportForm.addControl(`department_${dept.id}`, this.fb.control(''));
          this.usersByDepartment[dept.id] = users.filter(u => u.department.id === dept.id);
        });
        this.loadingUsers = false;
      },
      error: (error) => {
        console.error('Failed to load users:', error);
        this.toastr.error('Impossible de charger les utilisateurs', 'Erreur');
        this.loadingUsers = false;
      }
    });
  }

  /**
   * Submit the report
   */
  submitReport(): void {
    this.submitted = true;
    
    if (this.reportForm.invalid) {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires', 'Attention');
      this.markFormGroupTouched(this.reportForm);
      return;
    }

    this.isSubmitting = true;
    const formValues = this.reportForm.value;

    const assignedUsers = this.departments.map(dept => ({
      departmentId: dept.id,
      userId: formValues[`department_${dept.id}`]
    })).filter(assignment => assignment.userId);

    const payload = {
      ...formValues,
      protocolId: this.protocolId,
      assignedUsers
    };

    console.log("📦 Submitting Report:", payload);

    this.reportService.createNewReport(payload).subscribe({
      next: (response: any) => {
        // Send notifications to assigned users
        assignedUsers.forEach(assignment => {
          const notificationDTO = {
            description: `Un nouveau rapport ${formValues.type} a été créé et vous a été assigné`,
            link: `/dashboard/report-dashboard/fill-report/${response.reportId}`,
            notificationType: NotificationType.REPORT,
            userId: assignment.userId
          };

          this.notificationService.createNotification(notificationDTO).subscribe({
            next: () => console.log(`✅ Notification sent to user ${assignment.userId}`),
            error: (err) => console.error(`❌ Failed to send notification to user ${assignment.userId}:`, err)
          });
        });

        this.isSubmitting = false;
        this.toastr.success('Le rapport a été créé avec succès', 'Succès');
        this.router.navigate(['/dashboard/report-dashboard/view-reports']);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('❌ Creation failed:', err);
        this.toastr.error('Une erreur est survenue lors de la création du rapport', 'Erreur');
      }
    });
  }

  /**
   * Go back to the previous page
   */
  goBack(): void {
    this.router.navigate(['/dashboard/report-dashboard/protocol-selection']);
  }

  /**
   * Check if a field is invalid
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.reportForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched || this.submitted);
  }

  /**
   * Mark all fields in a form group as touched
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
