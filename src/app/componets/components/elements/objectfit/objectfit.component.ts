import { Component } from '@angular/core';
import * as PrismCode from '../../../shared/prismData/objectfit';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { ShowcodeCardComponent } from '../../../shared/common/includes/showcode-card/showcode-card.component';
@Component({
  selector: 'app-objectfit',
  standalone: true,
  imports: [SharedModule,ShowcodeCardComponent],
  templateUrl: './objectfit.component.html',
  styleUrls: ['./objectfit.component.scss']
})
export class ObjectfitComponent {
  prsimCodeData: any = PrismCode;

}
