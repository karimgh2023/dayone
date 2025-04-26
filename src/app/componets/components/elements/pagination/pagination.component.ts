import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as prismcodeData from '../../../shared/prismData/pagination';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { ShowcodeCardComponent } from '../../../shared/common/includes/showcode-card/showcode-card.component';
const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [SharedModule, NgbModule,ShowcodeCardComponent],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  page = 2;
  page0 = 3;
  page1 = 1;
  page2 = 3;
  page3 = 1;
  page5 = 8;
  page6 = 6;
  page7 = 3;
  page8 = 8;
  page9 = 5;
  pagef = 7;
  pageactive1 = 2;
  pageactive = 2;
  pages2=5;
  pageA=5;
  prismCode = prismcodeData;

 

	getPageSymbol(current: number) {
		return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
	}

	selectPage(page: string) {
		this.page = parseInt(page, 10) || 1;
	}
  pagest4 = 3;
	isDisabled = true;

	toggleDisabled() {
		this.isDisabled = !this.isDisabled;
	}

	formatInput(input: HTMLInputElement) {
		input.value = input.value.replace(FILTER_PAG_REGEX, '');
	}

}
