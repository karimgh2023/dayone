import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { ShowcodeCardComponent } from '../../../shared/common/includes/showcode-card/showcode-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as PrismCode from '../../../shared/prismData/buttongroup';

@Component({
  selector: 'app-buttongroup',
  standalone: true,
  imports: [SharedModule,NgbModule,ShowcodeCardComponent],
  templateUrl: './buttongroup.component.html',
  styleUrls: ['./buttongroup.component.scss']
})
export class ButtongroupComponent {
  prsimCodeData: any = PrismCode;

}
