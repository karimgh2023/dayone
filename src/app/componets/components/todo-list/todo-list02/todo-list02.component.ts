import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo-list02',
  standalone: true,
  imports: [SharedModule,NgbModule,RouterModule],
  templateUrl: './todo-list02.component.html',
  styleUrls: ['./todo-list02.component.scss']
})
export class TodoList02Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
