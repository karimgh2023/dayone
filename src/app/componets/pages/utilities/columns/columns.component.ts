import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';

@Component({
  selector: 'app-columns',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.scss'
})
export class ColumnsComponent {

}
