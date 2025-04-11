import { Component, OnInit } from '@angular/core';
import { TodoList01List, TodoListType } from './todolist';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo-list01',
  standalone: true,
  imports: [SharedModule,NgbModule,RouterModule],
  templateUrl: './todo-list01.component.html',
  styleUrls: ['./todo-list01.component.scss']
})
export class TodoList01Component implements OnInit {
  page = 1;
  TodoList01ListData: TodoListType[];

  constructor() { 
    this.TodoList01ListData = TodoList01List
  }

  ngOnInit(): void {
  }
  
  remove(e:any){
    this.TodoList01ListData.forEach((el,ind)=>{
      if(el.id == e){
        this.TodoList01ListData.splice(ind,1)
      }
    })
    
  }
  
}
