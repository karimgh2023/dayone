import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { ShowcodeCardComponent } from '../../../../shared/common/includes/showcode-card/showcode-card.component';
import * as prismcodeData from '../../../../shared/prismData/avatars';
@Component({
  selector: 'app-avatars',
  standalone: true,
  imports: [SharedModule,ShowcodeCardComponent],
  templateUrl: './avatars.component.html',
  styleUrl: './avatars.component.scss'
})
export class AvatarsComponent {
  prismcode = prismcodeData;
}
