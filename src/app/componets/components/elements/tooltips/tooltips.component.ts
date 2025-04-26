import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { ShowcodeCardComponent } from '../../../shared/common/includes/showcode-card/showcode-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as prismcodeData from '../../../shared/prismData/tooltips';
@Component({
  selector: 'app-tooltips',
  standalone: true,
  imports: [SharedModule,NgbModule,ShowcodeCardComponent],
  templateUrl: './tooltips.component.html',
  styleUrls: ['./tooltips.component.scss']
})
export class TooltipsComponent {
  prismCode = prismcodeData;

}
