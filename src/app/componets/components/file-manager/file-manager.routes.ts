import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'components/file-manager',
    children: [
      {
        path: 'file-manager01',
        loadComponent: () =>
          import('./file-manager01/file-manager01.component').then((m) => m.FileManager01Component),
          
      },
      {
        path: 'file-manager02',
        loadComponent: () =>
          import('./file-manager02/file-manager02.component').then((m) => m.FileManager02Component),
          
      },
      {
        path: 'file-attachments',
        loadComponent: () =>
          import('./file-attachments/file-attachments.component').then((m) => m.FileAttachmentsComponent),
          
      },
      {
        path: 'file-details',
        loadComponent: () =>
          import('./file-details/file-details.component').then((m) => m.FileDetailsComponent),
          
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileManagerRoutingModule { 
  static routes = routes;

}
