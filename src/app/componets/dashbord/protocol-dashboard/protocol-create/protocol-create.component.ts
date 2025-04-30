import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProtocolService } from '../../../../shared/services/protocol.service';
import { ProtocolType } from '../../../../models/protocol-type.enum';
import { ProtocolCreationRequest } from '../../../../models/protocol-creation-request.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../../shared/services/data.service';
import { Department } from '../../../../models/department.model';
@Component({
  selector: 'app-protocol-create',
  templateUrl: './protocol-create.component.html',
  styleUrls: ['./protocol-create.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  standalone: true
})
export class ProtocolCreateComponent implements OnInit {
  protocolForm!: FormGroup;
  protocolTypes = Object.values(ProtocolType);
  departments: Department[] = [];
  constructor(
    private fb: FormBuilder,
    private protocolService: ProtocolService,
    private toastr: ToastrService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDepartments();

    this.protocolForm = this.fb.group({
      name: ['', Validators.required],
      protocolType: ['Homologation', Validators.required],
      specificCriteria: this.fb.array([])
    });

    // Add default one
    this.addCriteria();
  }

  private initForm(): void {
    this.protocolForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      type: [ProtocolType.Homologation, Validators.required]
    });
  }
  /**
   * Handles the protocol creation form submission
   * This method is triggered when the user clicks the submit button
   * 
   * Flow:
   * 1. Validates the form
   * 2. If invalid, marks all fields as touched to show validation errors
   * 3. If valid, creates a ProtocolCreationRequest object from form values
   * 4. Calls the protocol service to create the protocol
   * 5. Handles success/error responses with appropriate user feedback
 
  onSubmit()
  loadDepartments() {
    this.publicService.getDepartments().subscribe(depts => {
      this.departments = depts;
    });
  }

  onSubmit(): void {
    if (this.protocolForm.invalid) {
      this.protocolForm.markAllAsTouched();
      return;
    }

    const protocolData: ProtocolCreationRequest = {
      name: this.protocolForm.get('name')?.value,
      description: this.protocolForm.get('description')?.value,
      type: this.protocolForm.get('type')?.value
    };

    this.protocolService.createProtocol(protocolData).subscribe({
      next: (response) => {
        console.log('Protocol created successfully:', response);
        this.toastr.success('Protocol created successfully!');
        this.protocolForm.reset({
          type: ProtocolType.Homologation
        });
      },
      error: (error) => {
        console.error('Error creating protocol:', error);
        this.toastr.error('Failed to create protocol. Please try again.');
      }
    });
  }  */

    loadDepartments() {
      this.dataService.getDepartments().subscribe(depts => {
        this.departments = depts;
      });
    }
  
    get specificCriteria() {
      return this.protocolForm.get('specificCriteria') as FormArray;
    }
  
    addCriteria() {
      this.specificCriteria.push(this.fb.group({
        description: ['', Validators.required],
        implementationResponsibles: [[]],
        checkResponsibles: [[]]
      }));
    }
  
    removeCriteria(index: number) {
      this.specificCriteria.removeAt(index);
    }
  
    submit() {
      if (this.protocolForm.invalid) return;
  
      const rawValue = this.protocolForm.value;
  
      const formatted = {
        name: rawValue.name,
        protocolType: rawValue.protocolType,
        specificCriteria: rawValue.specificCriteria.map((crit: any) => ({
          description: crit.description,
          implementationResponsibles: this.departments.filter(d => crit.implementationResponsibles.includes(d.id)),
          checkResponsibles: this.departments.filter(d => crit.checkResponsibles.includes(d.id))
        }))
      };
  
      this.protocolService.createProtocol(formatted as unknown as ProtocolCreationRequest).subscribe({
        next: res => {
          alert('✅ Protocol created successfully.');
          this.protocolForm.reset();
          this.specificCriteria.clear();
          this.addCriteria();
        },
        error: err => {
          console.error('❌ Protocol creation failed', err);
          alert('❌ Error creating protocol');
        }
      });
    }
}