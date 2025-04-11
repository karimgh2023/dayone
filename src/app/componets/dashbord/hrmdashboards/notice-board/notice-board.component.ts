import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from 'flatpickr';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorConfig, AngularEditorModule, UploadResponse } from '@wfpena/angular-wysiwyg';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
@Component({
  selector: 'app-notice-board',
  standalone: true,
  imports: [NgbModule,FlatpickrModule,AngularEditorModule,FormsModule,SharedModule,RouterModule,NgSelectModule],
  providers:[FlatpickrDefaults],
  templateUrl: './notice-board.component.html',
  styleUrl: './notice-board.component.scss'
})
export class NoticeBoardComponent {
notices=[
  {
    id:"01",
    title:"Board meeting Completed",
    description:"Attend the  company mangers & teamleads.",
    date:"18-02-2021",
    bg:"success",
    status:"Active"
  },
  {
    id:"02",
    title:"Updated the Company Policy",
    description:"some changes & add the terms & conditions.",
    date:"16-02-2021",
    bg:"success",
    status:"Active"
  },
  {
    id:"03",
    title:"Office Timings Changed",
    description:"This effetct after March 01st 9:00 Am To 5:00 Pm",
    date:"17-02-2021",
    bg:"success",
    status:"Active"
  },
  {
    id:"04",
    title:"Republic Day Celebrated",
    description:"Participate the all employess",
    date:"26-01-2021",
    bg:"success",
    status:"Active"
  },
  {
    id:"05",
    title:"Client meeting Completed",
    description:"Participate the all the managers",
    date:"12-01-2021",
    bg:"danger",
    status:"InActive"
  },
  {
    id:"06",
    title:"Update the Employee Leave Policy",
    description:"Participate the all employess",
    date:"02-01-2021",
    bg:"success",
    status:"Active"
  },
  {
    id:"07",
    title:"Faith Harris, Please sent the email",
    description:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
    date:"26-01-2021",
    bg:"success",
    status:"Active"
  },
  {
    id:"08",
    title:"Update the Agreement Policy",
    description:"There are many variations of passages of  but the majority have suffered alteration",
    date:"12-02-2021",
    bg:"danger",
    status:"InActive"
  }
]
remove(id:string){
  const data = this.notices.filter((x: { id: string }) => x.id !== id);
  this.notices = data;
}
constructor(private modalService: NgbModal,private http: HttpClient) { }
open(content:any){
  this.modalService.open(content, {  windowClass : 'modalCusSty' ,size:'lg'})
}
 inlineDatePicker: boolean = false;
  weekNumbers!: true
  // selectedDate: Date | null = null; 
  flatpickrOptions: any = {
    inline: true,
   
  };
  // flatpickrOptions: FlatpickrOptions;


  ngOnInit() {
    this.flatpickrOptions = {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
    };

    flatpickr('#inlinetime', this.flatpickrOptions);

      this.flatpickrOptions = {
        enableTime: true,
        dateFormat: 'Y-m-d H:i', // Specify the format you want
        defaultDate: '2023-11-07 14:30', // Set the default/preloaded time (adjust this to your desired time)
      };

      flatpickr('#pretime', this.flatpickrOptions);
  }
  htmlContent:string = '';
  // config: AngularEditorConfig = {
  //   // ...
  //   upload: (file) => {
  //     const url = 'http://localhost:9000/upload_img';
  //     const uploadData: FormData = new FormData();
  //     uploadData.append('file', file, file.name);
  //     return this.http
  //       .post<{ file: string; url: string }>(url, uploadData, {
  //         observe: 'response',
  //       })
  //       .pipe(
  //         map((response: any) => {
  //           const imageUrl = response.body.url;
  //           return {
  //             ...response,
  //             body: { imageUrl },
  //           } as HttpResponse<UploadResponse>;
  //         }),
  //       );
  //   },
  //   // ...
  // };
  config1: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '13rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...', 
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
}
