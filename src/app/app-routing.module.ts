import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersDashboardComponent } from './pages/users-dashboard/users-dashboard.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { RoomDashboardComponent } from './pages/room-dashboard/room-dashboard.component';
import { RoomCreateComponent } from './pages/room-create/room-create.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { RoomEditComponent } from './pages/room-edit/room-edit.component';

const routes: Routes = [
  {
    path:'user-dashboard',
    component: UsersDashboardComponent
  },
  {
    path:'user-create',
    component: UserCreateComponent
  },
  {
    path:'user-edit',
    component: UserEditComponent
  },
  {
    path:'room-edit',
    component: RoomEditComponent
  },
  {
    path:'room-dashboard',
    component: RoomDashboardComponent
  },
  {
    path:'room-create',
    component: RoomCreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
