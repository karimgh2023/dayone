import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';

@Component({
  selector: 'app-empty-pages',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './empty-pages.component.html',
  styleUrls: ['./empty-pages.component.scss']
})
export class EmptyPagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
