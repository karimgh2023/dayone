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
  standalone: true,
  imports: [CommonModule],
  templateUrl: './protocol-selection.component.html',
  styleUrls: ['./protocol-selection.component.scss']
})
export class ProtocolSelectionComponent implements OnInit {
  protocolsByType: { [key: string]: any[] } = {};

  constructor(
    private protocolService: ProtocolService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.protocolService.getAllProtocolsGroupedByType().subscribe({
      next: data => {
        this.protocolsByType = data;
      },
      error: err => {
        console.error('Failed to load protocols:', err);
      }
    });
  }

  selectProtocol(protocolId: number) {
    this.router.navigate(['/report-create'], { queryParams: { protocolId } });
  }
}
  
