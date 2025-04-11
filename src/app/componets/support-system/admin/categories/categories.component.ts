import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule,NgSelectModule,NgbModule,RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor( private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content);
  }
  open1(content1: any) {
    this.modalService.open(content1);
  }

  tableData = [
    {
      no:'#01',
      name:'Services',
      ticket:'02',
      agents:'01',
      articles:'03'
    },
    {
      no:'#02',
      name:'Support',
      ticket:'18',
      agents:'05',
      articles:'35'
    },
    {
      no:'#03',
      name:'License',
      ticket:'03',
      agents:'01',
      articles:'04'
    },
    {
      no:'#04',
      name:'Billing',
      ticket:'03',
      agents:'01',
      articles:'04'
    },
    {
      no:'#05',
      name:'Settings',
      ticket:'06',
      agents:'02',
      articles:'11'
    },
    {
      no:'#06',
      name:'Customization',
      ticket:'06',
      agents:'02',
      articles:'11'
    },
    
  ]
}
