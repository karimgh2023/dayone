import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProtocolService } from '../../../../shared/services/protocol.service';
import { ProtocolType } from '../../../../models/protocol-type.enum';
import { ProtocolCreationRequest } from '../../../../models/protocol-creation-request.model';
import { CommonModule } from '@angular/common';

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

  constructor(
    private fb: FormBuilder,
    private protocolService: ProtocolService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.protocolForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      type: [ProtocolType.Homologation, Validators.required]
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
        alert('Protocol created successfully!');
        this.protocolForm.reset({
          type: ProtocolType.Homologation
        });
      },
      error: (error) => {
        console.error('Error creating protocol:', error);
        alert('Failed to create protocol. Please try again.');
      }
    });
  }
}