import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {

}
