import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-template',
  templateUrl: './report-template.component.html',
  styleUrls: ['./report-template.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    NgbNavModule,
    ToastrModule
  ],
  providers: [
    { provide: ToastrService, useClass: ToastrService }
  ]
})
export class ReportTemplateComponent implements OnInit {
  reportForm!: FormGroup;
  active = 1; // For nav tabs

  // Sample status options
  statusOptions = [
    { value: 'PASSED', label: 'Passed', icon: '✅' },
    { value: 'FAILED', label: 'Failed', icon: '❌' },
    { value: 'PENDING', label: 'Pending', icon: '⏳' }
  ];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.reportForm = this.fb.group({
      // Basic Information
      reportTitle: ['Equipment Inspection Report', Validators.required],
      serialNumber: ['', Validators.required],
      equipmentDescription: [''],
      designation: [''],
      manufacturer: [''],
      immobilization: [''],
      serviceSeg: [''],
      businessUnit: [''],
      type: ['Qualification'],
      
      // Parameters section
      parameters: this.fb.array([])
    });
    
    // Add some default parameters
    this.addParameter();
    this.addParameter();
  }
  
  get parametersArray(): FormArray {
    return this.reportForm.get('parameters') as FormArray;
  }
  
  addParameter(): void {
    const parameterGroup = this.fb.group({
      name: ['', Validators.required],
      value: [''],
      unit: [''],
      status: ['PENDING'],
      action: [''],
      notes: ['']
    });
    
    this.parametersArray.push(parameterGroup);
  }
  
  removeParameter(index: number): void {
    this.parametersArray.removeAt(index);
  }
  
  isActionRequired(index: number): boolean {
    const status = this.parametersArray.at(index).get('status')?.value;
    return status === 'FAILED';
  }
  
  submitReport(): void {
    if (this.reportForm.valid) {
      console.log('Report data:', this.reportForm.value);
      // Call service to submit the report
      this.toastr.success('Rapport soumis avec succès!', 'Succès');
    } else {
      // Mark all fields as touched to trigger validation
      this.markFormGroupTouched(this.reportForm);
      this.toastr.warning('Veuillez remplir tous les champs obligatoires', 'Attention');
    }
  }
  
  // Helper method to mark all form controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
} 