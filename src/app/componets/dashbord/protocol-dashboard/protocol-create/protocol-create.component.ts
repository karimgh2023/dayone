import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../shared/services/user.service';
import { ProtocolService } from '../../../../shared/services/protocol.service';
import { ToastrService } from 'ngx-toastr';

@Component({  
  selector: 'app-protocol-create',
  templateUrl: './protocol-create.component.html',
  styleUrls: ['./protocol-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProtocolCreateComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
  
