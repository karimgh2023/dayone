import { Component, OnInit, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../shared/services/user.service';
import { ProtocolService } from '../../../../shared/services/protocol.service';
import { ToastrService } from 'ngx-toastr';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({  
  selector: 'app-protocol-selection',
  templateUrl: './protocol-selection.component.html',
  styleUrls: ['./protocol-selection.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProtocolSelectionComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
  
