import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { ShowcodeCardComponent } from '../../../shared/common/includes/showcode-card/showcode-card.component';
import * as PrismCode from '../../../shared/prismData/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [SharedModule,ShowcodeCardComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  prsimCodeData: any = PrismCode;

}
