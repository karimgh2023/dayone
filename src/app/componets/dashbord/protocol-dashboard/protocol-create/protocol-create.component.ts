import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProtocolService } from '../../../../shared/services/protocol.service';
import { ProtocolType } from '../../../../models/protocol-type.enum';
import { ProtocolCreationRequest } from '../../../../models/protocol-creation-request.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../../shared/services/data.service';
import { Department } from '../../../../models/department.model';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-protocol-create',
  templateUrl: './protocol-create.component.html',
  styleUrls: ['./protocol-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgSelectModule
  ]
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
    private dataService: DataService,
    private cdr: ChangeDetectorRef // ✅ Inject ChangeDetectorRef
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

    this.addCriteria();
  }

  loadDepartments(): void {
    this.loading = true;
    this.dataService.getDepartments().subscribe({
      next: (depts) => {
        this.departments = depts;
        this.loading = false;
        this.cdr.detectChanges(); // ✅ Ensure view updates
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
    const group = index !== undefined ? this.specificCriteria.at(index) : this.protocolForm;
    const field = group.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string, index?: number): string {
    const group = index !== undefined ? this.specificCriteria.at(index) : this.protocolForm;
    const field = group.get(fieldName);
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
