import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { ShowcodeCardComponent } from '../../../shared/common/includes/showcode-card/showcode-card.component';
import * as prismcodeData from '../../../shared/prismData/spinners';
@Component({
  selector: 'app-spinners',
  standalone: true,
  imports: [SharedModule,ShowcodeCardComponent],
  templateUrl: './spinners.component.html',
  styleUrls: ['./spinners.component.scss']
})
export class SpinnersComponent {
  prismCode = prismcodeData;
}
