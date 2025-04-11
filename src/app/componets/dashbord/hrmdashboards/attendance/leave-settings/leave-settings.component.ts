import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-leave-settings',
  standalone: true,
  imports: [NgbModule,RouterModule],
  templateUrl: './leave-settings.component.html',
  styleUrls: ['./leave-settings.component.scss']
})
export class LeaveSettingsComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content:any) {
    this.modalService.open(content, { windowClass : 'modalCusSty' })
  }

leaves=[
{
  id:"1",
  type:"Casual Leaves",
  number:"14"
},
{
  id:"2",
  type:"Sick Leaves",
  number:"07"
},
{
  id:"3",
  type:"Maternity Leaves",
  number:"20"
},
{
  id:"4",
  type:"Paternity Leaves",
  number:"00"
},
{
  id:"5",
  type:"Annual Leaves",
  number:"00"
},
{
  id:"6",
  type:"Unpaid Leaves",
  number:"00"
},
{
  id:"7",
  type:"Other Leaves",
  number:"00"
},
]
remove(id:string){
  const data = this.leaves.filter((x: { id: string }) => {
    return x.id != id;

  })
  this.leaves = data;
}
}
