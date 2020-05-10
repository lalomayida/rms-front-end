import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersDashboardComponent } from './users-dashboard/users-dashboard.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { RoomDashboardComponent } from './room-dashboard/room-dashboard.component';
import { RoomCreateComponent } from './room-create/room-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { RequisitionDashboardComponent } from './requisition-dashboard/requisition-dashboard.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'requisition-dashboard',
      component: RequisitionDashboardComponent
    },
    {
      path: 'user-dashboard',
      component: UsersDashboardComponent
    },
    {
      path: 'user-create',
      component: UserCreateComponent
    },
    {
      path: 'user-edit',
      component: UserEditComponent
    },
    {
      path: 'room-edit',
      component: RoomEditComponent
    },
    {
      path: 'room-dashboard',
      component: RoomDashboardComponent
    },
    {
      path: 'room-create',
      component: RoomCreateComponent
    }]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }