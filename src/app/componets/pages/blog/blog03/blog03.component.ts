import { NgSelectModule } from '@ng-select/ng-select';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FilePondComponent } from 'ngx-filepond';
import {  FilePondModule } from 'ngx-filepond';
import * as FilePond from 'filepond';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularEditorConfig, AngularEditorModule } from '@wfpena/angular-wysiwyg';
@Component({
  selector: 'app-blog03',
  standalone: true,
  imports: [SharedModule,NgSelectModule,DropzoneModule,AngularEditorModule,FilePondModule,RouterModule,FormsModule],
  templateUrl: './blog03.component.html',
  styleUrls: ['./blog03.component.scss'],
})
export class Blog03Component implements OnInit {
  constructor() {}
    @ViewChild("myPond") myPond!: FilePondComponent;

    pondOptions: FilePond.FilePondOptions = {
      allowMultiple: true,
      labelIdle: "Drop files here to Upload...",
    };
    singlepondOptions: FilePond.FilePondOptions = {
      allowMultiple: false,
      labelIdle: "Drop files here to Upload...",
    };
  
    pondFiles: FilePond.FilePondOptions["files"] = [
      {
        source: "assets/photo.jpeg",
        options: {
          type: "local",
        },
      },
    ];
  
    pondHandleInit() {
    }
  
    pondHandleAddFile(event: any) {
    }
  
    pondHandleActivateFile(event: any) {
    }
  ngOnInit(): void {}

  // dropzone
  files: File[] = [];
  filesPreview: File[] = [];
  filesDisabled: File[] = [];
  disable = true;

  onSelect(event: { addedFiles: any; }) {
    // console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  onPreviewFileSelect(event: { addedFiles: any; }) {
    // console.log(event);
    this.filesPreview.push(...event.addedFiles);
  }

  onPreviewFileRemove(event: File) {
    // console.log(event);
    this.filesPreview.splice(this.filesPreview.indexOf(event), 1);
  }

  htmlContent:string = '';
  config1: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '13rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...', 
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
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
