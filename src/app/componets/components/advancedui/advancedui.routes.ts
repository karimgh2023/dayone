     import { NgModule } from '@angular/core';
      import { RouterModule, Routes } from '@angular/router';
      
      export const admin: Routes = [
       {path:'advancedui',children:[ {
        path: 'accordions',
        loadComponent: () =>
          import('./accordions/accordions.component').then((m) => m.AccordionsComponent),
      },
      {
        path: 'draggable-cards',
        loadComponent: () =>
          import('./draggable-cards/draggable-cards.component').then(
            (m) => m.DraggableCardsComponent
          ),
      },
      {
        path: 'carousels',
        loadComponent: () =>
          import('./carousels/carousels.component').then(
            (m) => m.CarouselsComponent
          ),
      },
      {
        path: 'modals-closes',
        loadComponent: () =>
          import('./modals-closes/modals-closes.component').then(
            (m) => m.ModelsClosesComponent
          ),
      },
      {
        path: 'navbar',
        loadComponent: () =>
          import('./navbar/navbar.component').then((m) => m.NavbarComponent),
      },
      {
        path: 'offcanvas',
        loadComponent: () =>
          import('./offcanvas/offcanvas.component').then((m) => m.OffcanvasComponent),
      },
      {
        path: 'placeholders',
        loadComponent: () =>
          import('./placeholders/placeholders.component').then((m) => m.PlaceholdersComponent),
      },
      {
        path: 'rating',
        loadComponent: () =>
          import('./rating/rating.component').then((m) => m.RatingComponent),
      },
      {
        path: 'scrollspy',
        loadComponent: () =>
          import('./scrollspy/scrollspy.component').then((m) => m.ScrollspyComponent),
      },
      {
        path: 'swiperjs',
        loadComponent: () =>
          import('./swiperjs/swiperjs.component').then((m) => m.SwiperjsComponent),
      },
      
      
      ]}
      ];
      @NgModule({
        imports: [RouterModule.forChild(admin)],
        exports: [RouterModule],
      })
      export class advanceduiRoutingModule {
        static routes = admin;
      }