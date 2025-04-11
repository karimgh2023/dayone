import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-knowledge-page',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './knowledge-page.component.html',
  styleUrls: ['./knowledge-page.component.scss']
})
export class KnowledgePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
