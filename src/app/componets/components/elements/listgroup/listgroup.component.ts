import { Component } from '@angular/core';
import * as PrismCode from '../../../shared/prismData/listgroup';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { ShowcodeCardComponent } from '../../../shared/common/includes/showcode-card/showcode-card.component';
@Component({
  selector: 'app-listgroup',
  standalone: true,
  imports: [SharedModule,ShowcodeCardComponent],
  templateUrl: './listgroup.component.html',
  styleUrls: ['./listgroup.component.scss']
})
export class ListgroupComponent {
  prsimCodeData: any = PrismCode;

}