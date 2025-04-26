import { Component } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import * as prismcodeData from '../../../shared/prismData/popovers';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { ShowcodeCardComponent } from '../../../shared/common/includes/showcode-card/showcode-card.component';
@Component({
  selector: 'app-popovers',
  standalone: true,
  imports: [SharedModule,NgbPopoverModule,ShowcodeCardComponent],
  templateUrl: './popovers.component.html',
  styleUrls: ['./popovers.component.scss']
})
export class PopoversComponent {
  prismCode = prismcodeData;

}
