import { Component } from '@angular/core';
import { ShowcodeCardComponent } from '../../../shared/common/includes/showcode-card/showcode-card.component';
import * as prismCodeData from '../../../shared/prismData/advancedUi/placeholder'
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/common/sharedmodule';

@Component({
  selector: 'app-placeholders',
  standalone: true,
  imports: [ShowcodeCardComponent,RouterModule,SharedModule],
  templateUrl: './placeholders.component.html',
  styleUrl: './placeholders.component.scss'
})
export class PlaceholdersComponent {
  prismCode = prismCodeData;
}
