import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../shared/services/user.service';
import { ReportService } from '../../../../shared/services/report.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '@/app/shared/services/notification.service';
import { NotificationType } from '@/app/models/NotificationType.enum';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class ReportCreateComponent implements OnInit {
  reportForm!: FormGroup;
  users: User[] = [];
  departments: any[] = [];
  protocolId!: number;
  usersByDepartment: { [key: number]: User[] } = {};
  isSubmitting = false;
  submitted = false;
  loadingUsers = false;
isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private reportService: ReportService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getProtocolId();
    this.loadUsers();
  }

  initForm(): void {
    this.reportForm = this.fb.group({
      type: ['', Validators.required],
      serialNumber: ['', Validators.required],
      equipmentDescription: [''],
      designation: [''],
      manufacturer: [''],
      immobilization: [''],
      serviceSeg: [''],
      businessUnit: ['']
    });
  }

  getProtocolId(): void {
    this.route.params.subscribe(params => {
      const id = params['protocolId'];
      if (id) {
        this.protocolId = +id;
      } else {
        this.toastr.error('Aucun protocole sélectionné', 'Erreur');
        this.router.navigate(['/dashboard/report-dashboard/protocol-selection']);
      }
    });
  }

  loadUsers(): void {
    this.loadingUsers = true;

    this.userService.getAllUsersExceptAdmins().subscribe({
      next: (users) => {
        this.users = users;

        this.departments = [...new Set(users.map(u => u.department.id))].map(id => ({
          id,
          name: users.find(u => u.department.id === id)!.department.name
        }));

        this.departments.forEach(dept => {
          const deptUsers = users
            .filter(u => u.department.id === dept.id)
            .map(user => ({
              ...user,
              fullName: `${user.firstName} ${user.lastName} (${user.email})`
            }));

          this.usersByDepartment[dept.id] = deptUsers;

          this.reportForm.addControl(`department_${dept.id}`, this.fb.control([]));
        });

        this.loadingUsers = false;
        this.cdr.detectChanges(); // ✅ Ensure view updates
      },
      error: (err) => {
        this.loadingUsers = false;
        console.error(err);
        this.toastr.error('Erreur lors du chargement des utilisateurs');
      }
    });
  }

  submitReport(): void {
    this.submitted = true;
        this.isLoading = true;

    if (this.reportForm.invalid) {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires', 'Attention');
      this.markFormGroupTouched(this.reportForm);
      return;
    }

    this.isSubmitting = true;
    const formValues = this.reportForm.value;

    const assignedUsers: { departmentId: number; userId: number }[] = [];

    this.departments.forEach(dept => {
      const userIds: number[] = formValues[`department_${dept.id}`];
      if (Array.isArray(userIds) && userIds.length > 0) {
        userIds.forEach(userId => {
          assignedUsers.push({ departmentId: dept.id, userId });
        });
      }
    });

    const payload = {
      ...formValues,
      protocolId: this.protocolId,
      assignedUsers
    };

this.reportService.createNewReport(payload).subscribe({
  next: (response: any) => {
    assignedUsers.forEach(assignment => {
      const notificationDTO = {
        description: `Un nouveau rapport ${formValues.type} a été créé et vous a été assigné`,
        link: `/dashboard/report-dashboard/fill-report/${response.reportId}`,
        notificationType: NotificationType.REPORT,
        userId: assignment.userId
      };
      this.notificationService.createNotification(notificationDTO).subscribe();
    });

    this.toastr.success('Le rapport a été créé avec succès', 'Succès');
    this.router.navigate(['/dashboard/report-dashboard/view-reports']);
    this.isSubmitting = false;
    this.isLoading = false; // ✅ ADDED
  },
  error: (err) => {
    console.error('Erreur création:', err);
    this.toastr.error('Erreur lors de la création du rapport');
    this.isSubmitting = false;
    this.isLoading = false; // ✅ ADDED
  }
});

  }

  goBack(): void {
    this.router.navigate(['/dashboard/report-dashboard/protocol-selection']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.reportForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched || this.submitted);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
