import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from '../../../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import jsonDoc from '../../../../../shared/data/editor';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { NgxEditorModule, Validators, Editor, Toolbar } from 'ngx-editor';
@Component({
  selector: 'app-create-tickets',
  standalone: true,
  imports: [SharedModule,NgxEditorModule,NgSelectModule,AngularEditorModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-tickets.component.html',
  styleUrls: ['./create-tickets.component.scss']
})
export class CreateTicketsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.editor = new Editor();
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
  editordoc = jsonDoc;

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl(
      { value: jsonDoc, disabled: false },
      Validators.required()
    ),
  });

  



}
