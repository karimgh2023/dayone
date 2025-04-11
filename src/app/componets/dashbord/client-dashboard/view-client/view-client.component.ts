import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { AngularEditorModule,AngularEditorConfig } from '@wfpena/angular-wysiwyg';

@Component({
  selector: 'app-view-client',
  standalone: true,
  imports: [SharedModule,NgbModule,AngularEditorModule,NgSelectModule,RouterModule],
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {
  active = 1;
  
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

    //Angular Editor
    public config: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: '15rem',
      minHeight: '5rem',
      placeholder: 'Enter text here...',
      translate: 'no',
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
    }

  open(content:any) {
    this.modalService.open(content, { windowClass : 'modalCusSty',size:'lg' })
  }


}
