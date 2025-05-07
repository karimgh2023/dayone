import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProtocolService } from '../../../../shared/services/protocol.service';
import { ProtocolType } from '../../../../models/protocol-type.enum';
import { ProtocolCreationRequest } from '../../../../models/protocol-creation-request.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../../shared/services/data.service';
import { Department } from '../../../../models/department.model';
import { TaskDashboardPageHeaderComponent } from '../../task-dashboard/task-dashboard-page-header/task-dashboard-page-header.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-protocol-create',
  templateUrl: './protocol-create.component.html',
  styleUrls: ['./protocol-create.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskDashboardPageHeaderComponent,
    NgbTooltipModule
  ],
  standalone: true
})
export class ProtocolCreateComponent implements OnInit {
  protocolForm!: FormGroup;
  protocolTypes = Object.values(ProtocolType);
  departments: Department[] = [];
  loading: boolean = false;
  submitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private protocolService: ProtocolService,
    private toastr: ToastrService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDepartments();
  }

  private initForm(): void {
    this.protocolForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      protocolType: [ProtocolType.Homologation, Validators.required],
      specificCriteria: this.fb.array([])
    });

    // Add default criteria
    this.addCriteria();
  }

  loadDepartments(): void {
    this.loading = true;
    this.dataService.getDepartments().subscribe({
      next: (depts) => {
        this.departments = depts;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading departments:', error);
        this.toastr.error('Failed to load departments. Please try again.');
        this.loading = false;
      }
    });
  }

  get specificCriteria() {
    return this.protocolForm.get('specificCriteria') as FormArray;
  }

  addCriteria(): void {
    this.specificCriteria.push(this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10)]],
      implementationResponsibles: [[], [Validators.required, Validators.minLength(1)]],
      checkResponsibles: [[], [Validators.required, Validators.minLength(1)]]
    }));
  }

  removeCriteria(index: number): void {
    if (this.specificCriteria.length > 1) {
      this.specificCriteria.removeAt(index);
    } else {
      this.toastr.warning('At least one criteria is required.');
    }
  }

  isFieldInvalid(fieldName: string, index?: number): boolean {
    if (index !== undefined) {
      const criteriaGroup = this.specificCriteria.at(index);
      const field = criteriaGroup.get(fieldName);
      return field ? field.invalid && (field.dirty || field.touched) : false;
    }
    
    const field = this.protocolForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string, index?: number): string {
    if (index !== undefined) {
      const criteriaGroup = this.specificCriteria.at(index);
      const field = criteriaGroup.get(fieldName);
      if (!field) return '';

      if (field.hasError('required')) return 'This field is required';
      if (field.hasError('minlength')) return `Minimum length is ${field.errors?.['minlength'].requiredLength} characters`;
      return '';
    }

    const field = this.protocolForm.get(fieldName);
    if (!field) return '';

    if (field.hasError('required')) return 'This field is required';
    if (field.hasError('minlength')) return `Minimum length is ${field.errors?.['minlength'].requiredLength} characters`;
    return '';
  }

  submit(): void {
    if (this.protocolForm.invalid) {
      this.protocolForm.markAllAsTouched();
      this.toastr.error('Please fill in all required fields correctly.');
      return;
    }

    this.submitting = true;
    const rawValue = this.protocolForm.value;

    const formatted = {
      name: rawValue.name,
      description: rawValue.description,
      protocolType: rawValue.protocolType,
      specificCriteria: rawValue.specificCriteria.map((crit: any) => ({
        description: crit.description,
        implementationResponsibles: this.departments.filter(d => crit.implementationResponsibles.includes(d.id)),
        checkResponsibles: this.departments.filter(d => crit.checkResponsibles.includes(d.id))
      }))
    };

    this.protocolService.createProtocol(formatted as unknown as ProtocolCreationRequest).subscribe({
      next: () => {
        this.toastr.success('Protocol created successfully!');
        this.protocolForm.reset({
          protocolType: ProtocolType.Homologation
        });
        this.specificCriteria.clear();
        this.addCriteria();
        this.submitting = false;
      },
      error: (error) => {
        console.error('Error creating protocol:', error);
        this.toastr.error('Failed to create protocol. Please try again.');
        this.submitting = false;
      }
    });
  }
}