import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: 'support-system/admin',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
          
      },
      {
        path: 'edit-profile',
        loadComponent: () =>
          import('./edit-profile/edit-profile.component').then((m) => m.EditProfileComponent),
          
      }, 
      {
        path: 'customers',
        loadComponent: () =>
          import('./customers/customers.component').then((m) => m.CustomersComponent),
          
      }, 
      {
        path: 'categories',
        loadComponent: () =>
          import('./categories/categories.component').then((m) => m.CategoriesComponent),
          
      }, 
      {
        path: 'articles',
        loadComponent: () =>
          import('./articles/articles.component').then((m) => m.ArticlesComponent),
          
      },
      {
        path: 'customerView',
        loadComponent: () =>
          import('./customer-view/customer-view.component').then((m) => m.CustomerViewComponent),
          
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 
  static routes = routes;

}
