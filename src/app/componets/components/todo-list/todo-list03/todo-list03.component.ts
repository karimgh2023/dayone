import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo-list03',
  standalone: true,
  imports: [SharedModule,NgbModule,RouterModule],
  templateUrl: './todo-list03.component.html',
  styleUrls: ['./todo-list03.component.scss']
})
export class TodoList03Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
