import { NgSelectModule } from '@ng-select/ng-select';
import { Component } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

interface departmentList {
  id: string;
  name: string;
}

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [NgbModule,NgSelectModule,SharedModule,RouterModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent {
  departments:departmentList[] | any;
  departmantname:any
  departmantid:any
  constructor(private modalService: NgbModal) { 
    this.departments =[
      {id: '#01', name: 'Designing Department'},
      {id: '#02', name: 'Development Department'},
      {id: '#03', name: 'Marketing Department'},
      {id: '#04', name: 'Human Resource Department'},
      {id: '#05', name: 'Managers Department'},
      {id: '#06', name: 'Application Department'},
      {id: '#07', name: 'Support Department'},
      {id: '#08', name: 'IT Department'},
      {id: '#09', name: 'Technical Department'},
      {id: '#10', name: 'Accounts Department'},
    ]
  }

  ngOnInit(): void {
  }

  open(content1:any) {
    this.modalService.open(content1, { windowClass : 'modalCusSty' })
  }

  edit(editData:any, departmant: any) {
    this.modalService.open(editData, {backdrop : 'static' , windowClass : 'modalCusSty' })
    this.departmantname = departmant.name
    this.departmantid = departmant.id
  }
  click(id:string){
    const data = this.departments.filter((x: { id: string }) => {
      return x.id != id;
  
    })
    this.departments = data;

}
}
