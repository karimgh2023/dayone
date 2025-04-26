import { Component } from '@angular/core';
import { NgbDropdownConfig, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import * as PrismCode from '../../../shared/prismData/dropdowns';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { ShowcodeCardComponent } from '../../../shared/common/includes/showcode-card/showcode-card.component';
@Component({
  selector: 'app-dropdowns',
  standalone: true,
  imports: [SharedModule,NgbDropdownModule,ShowcodeCardComponent],
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.scss']
})
export class DropdownsComponent {

  constructor(config: NgbDropdownConfig) {
		// customize default values of dropdowns used by this component tree
		// config.placement = 'top-start';
		config.autoClose = true;
	}
  prsimCodeData: any = PrismCode;

}
