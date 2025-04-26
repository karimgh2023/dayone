import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { ShowcodeCardComponent } from '../../../shared/common/includes/showcode-card/showcode-card.component';
import * as PrismCode from '../../../shared/prismData/buttons';
@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [SharedModule,ShowcodeCardComponent],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  
  prsimCodeData: any = PrismCode;

}
