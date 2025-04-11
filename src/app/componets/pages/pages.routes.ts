import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'pages',
    children: [
      {
        path: 'about',
        loadComponent: () =>
          import('./about/about.component').then((m) => m.AboutComponent),  
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.component').then((m) => m.SettingsComponent),  
      },
      {
        path: 'notify-list',
        loadComponent: () =>
          import('./notify-list/notify-list.component').then((m) => m.NotifyListComponent),  
      },
      {
        path: 'edit-profile',
        loadComponent: () =>
          import('./edit-profile/edit-profile.component').then((m) => m.EditProfileComponent),  
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('./gallery/gallery.component').then((m) => m.GalleryComponent),  
      },
      {
        path: 'faqs',
        loadComponent: () =>
          import('./faqs/faqs.component').then((m) => m.FaqsComponent),  
      },
      {
        path: 'terms',
        loadComponent: () =>
          import('./terms/terms.component').then((m) => m.TermsComponent),  
      },
      {
        path: 'empty-pages',
        loadComponent: () =>
          import('./empty-pages/empty-pages.component').then((m) => m.EmptyPagesComponent),  
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./search/search.component').then((m) => m.SearchComponent),  
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
  static routes = routes;

 }
