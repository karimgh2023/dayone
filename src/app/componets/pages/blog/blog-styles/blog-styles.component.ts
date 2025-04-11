import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-styles',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './blog-styles.component.html',
  styleUrls: ['./blog-styles.component.scss']
})
export class BlogStylesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
