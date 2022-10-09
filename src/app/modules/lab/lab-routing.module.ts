import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabHomeComponent } from './lab-home/lab-home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'lab-home'
  },
  {
    path: 'lab-home',
    component: LabHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabRoutingModule { }
