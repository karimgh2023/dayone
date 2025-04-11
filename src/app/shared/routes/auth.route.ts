
import { NgModule } from '@angular/core';
import {   RouterModule, Routes } from '@angular/router';


export const authen: Routes = [
  {
    path: '',
    children: [
  


    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(authen)],
  exports: [RouterModule]
})
export class AuthenticationsRoutingModule { }