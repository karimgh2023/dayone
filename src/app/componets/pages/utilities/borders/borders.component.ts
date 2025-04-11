import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import * as prismcodeData from '../../../../shared/prismData/borders'
import { ShowcodeCardComponent } from '../../../../shared/common/includes/showcode-card/showcode-card.component';
@Component({
  selector: 'app-borders',
  standalone: true,
  imports: [SharedModule, ShowcodeCardComponent],
  templateUrl: './borders.component.html',
  styleUrl: './borders.component.scss'
})
export class BordersComponent {
prismCode = prismcodeData;
}
