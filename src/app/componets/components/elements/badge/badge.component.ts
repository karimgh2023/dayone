import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { ShowcodeCardComponent } from '../../../shared/common/includes/showcode-card/showcode-card.component';
import * as PrismCode from '../../../shared/prismData/badge';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [SharedModule,ShowcodeCardComponent],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  prsimCodeData: any = PrismCode;


}



  
  

  

  

  

  
  

  

  

