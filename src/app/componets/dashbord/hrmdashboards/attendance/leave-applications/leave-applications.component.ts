import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { LeavesService } from '../../../../../shared/services/leave.service';

@Component({
  selector: 'app-leave-applications',
  standalone: true,
  imports: [NgbModule,SharedModule,NgSelectModule,RouterModule],
  templateUrl: './leave-applications.component.html',
  styleUrls: ['./leave-applications.component.scss']
})
export class LeaveApplicationsComponent implements OnInit {
  @ViewChild('content', { static: true }) content!: TemplateRef<any>;
  @ViewChild('content1', { static: true }) content1!: TemplateRef<any>;

  private currentModal: any;

  open(modal: TemplateRef<any>) {
    if (this.currentModal) {
      this.currentModal.close(); // Close the currently open modal
    }
    this.currentModal = this.modalService.open(modal, { windowClass: 'modalCusSty' });
  }

  openLeaveApplication() {
    this.open(this.content); // Open the leave application modal
  }

  openReplyModal() {
    this.open(this.content1); // Open the reply modal
  }

  acceptLeave(modal: any) {
    modal.close('accept');
    // Handle additional logic if needed
  }

  rejectLeave(modal: any) {
    this.openReplyModal(); // Open the reply modal
  }

  goBack() {
    this.openLeaveApplication(); // Go back to the leave application modal
  }
  ngOnInit(): void {
  }
leaves=[
  {
    id:"#2987",
    name:"Faith Harris",
    src:"./assets/images/users/1.jpg",
    type:"Casual Leave",
    from:"16-01-2021",
    to:"16-01-2021",
    days:"1 Day",
    reason:"Personal",
    applied:"05-01-2021",
    status:"New",
    bg:"primary",
    check:true,
    x:true

  },
  {
    id:"#4987",
    name:"Austin Bell",
    src:"./assets/images/users/9.jpg",
    type:"Sick Leave",
    from:"14-01-2021",
    to:"15-01-2021",
    days:"2 Days",
    reason:"Going to Hospital",
    applied:"13-01-2021",
    status:"Approved",
    bg:"success",
    check:false,
    x:false
  },
  {
    id:"#6729",
    name:"Maria Bower",
    src:"./assets/images/users/2.jpg",
    type:"Casual Leave",
    from:"21-01-2021",
    to:"27-01-2021",
    days:"7 Days",
    reason:"Going to Family Trip",
    applied:"11-01-2021",
    status:"Pending",
    bg:"warning",
    check:true,
    x:true
  },
  {
    id:"#2098",
    name:"Peter Hill",
    src:"./assets/images/users/10.jpg",
    type:"Casual Leave",
    from:"05-01-2021",
    to:"05-01-2021",
    days:"1 Day",
    reason:"Personal",
    applied:"12-12-2020",
    status:"Approved",
    bg:"success",
    check:false,
    x:false
  },
  {
    id:"#1025",
    name:"Victoria Lyman",
    src:"./assets/images/users/3.jpg",
    type:"Medical Leave",
    from:"22-01-2021",
    to:"22-01-2021",
    days:"1 Day",
    reason:"Take Rest",
    applied:"21-01-2021",
    status:"Approved",
    bg:"success",
    check:false,
    x:false
  },
  {
    id:"#3262",
    name:"Adam Quinn",
    src:"./assets/images/users/11.jpg",
    type:"Casual Leave",
    from:"18-01-2021",
    to:"19-01-2021",
    days:"2 Days",
    reason:"Going to my Hometown",
    applied:"10-01-2021",
    status:"Pending",
    bg:"warning",
    check:true,
    x:true
  },
  {
    id:"#3489",
    name:"Melanie Coleman",
    src:"./assets/images/users/4.jpg",
    type:"Casual Leave",
    from:"11-01-2021",
    to:"11-01-2021",
    days:"1st Half Day",
    reason:"Going to Hosiptal",
    applied:"11-01-2021",
    status:"Rejected",
    bg:"danger",
    check:true,
    x:false
  },
  {
    id:"#3698",
    name:"Max Wilson",
    src:"./assets/images/users/12.jpg",
    type:"Medical Leave",
    from:"09-01-2021",
    to:"09-01-2021",
    days:"1 Day",
    reason:"Going to Hosiptal",
    applied:"08-01-2021",
    status:"Approved",
    bg:"success",
    check:false,
    x:false
  },
  {
    id:"#5612",
    name:"Amelia Russell",
    src:"./assets/images/users/5.jpg",
    type:"Casual Leave",
    from:"08-01-2021",
    to:"07-01-2021",
    days:"2 Days",
    reason:"Personal",
    applied:"25-12-2020",
    status:"Approved",
    bg:"success",
    check:false,
    x:false
  },
  {
    id:"#0245",
    name:"Justin Metcalfe",
    src:"./assets/images/users/13.jpg",
    type:"Casual Leave",
    from:"21-12-2020",
    to:"21-12-20201",
    days:"1 Day",
    reason:"Personal",
    applied:"19-12-2020",
    status:"Rejected",
    bg:"danger",
    check:true,
    x:false
  }
]

private leavesSubject = new BehaviorSubject<{ id: string; check: boolean; x: boolean; name: string; src: string; type: string; from: string; to: string; days: string; reason: string; applied: string; status: string; bg: string; }[]>([]);
leaves$ = this.leavesSubject.asObservable();

constructor(private leavesService: LeavesService,private modalService: NgbModal) {
  this.leavesService.getLeaves().subscribe((data: { id: string; check: boolean; x: boolean; name: string; src: string; type: string; from: string; to: string; days: string; reason: string; applied: string; status: string; bg: string; }[]) => this.leavesSubject.next(data));
}

checked(id: any) {
  this.leaves$.pipe(take(1)).subscribe(result => {
    const updatedLeaves = result.map(leave => {
      if (leave.id === id) {
        return { ...leave, check: false, x: false, status: "Approved", bg: "success" };
      }
      return leave;
    });
    this.leavesSubject.next(updatedLeaves);
  });
}

cancel(id: any) {
  this.leaves$.pipe(take(1)).subscribe(result => {
    const updatedLeaves = result.map(leave => {
      if (leave.id === id) {
        return { ...leave, check: false, x: false, status: "Rejected", bg: "danger" };
      }
      return leave;
    });
    this.leavesSubject.next(updatedLeaves);
  });
}
remove(id:string){
  const data = this.leaves.filter((x: { id: string }) => {
    return x.id != id;

  })
  this.leaves = data;
}
}
