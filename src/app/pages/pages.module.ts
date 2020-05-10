import {
  NbLayoutModule
  , NbSidebarModule
  , NbButtonModule
  , NbThemeModule
  , NbThemeService
  , NbSidebarService
  , NbMenuModule
  , NbCardModule
  , NbUserModule
  , NbActionsModule
  , NbInputModule
  , NbIconModule
  , NbCheckboxModule
  , NbSelectModule
  , NbDialogModule
  , NbDialogService
  , NbListModule
  , NbTooltipModule
  , NbContextMenuModule
} from '@nebular/theme';
import { CommonModule } from '@angular/common';  
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule }       from '@angular/core';
import { PagesComponent } from './pages.component';
import { NavbarComponent } from '../@theme/components/navbar/navbar.component';
import { SidebarComponent } from '../@theme/components/sidebar/sidebar.component';
import { UsersDashboardComponent } from '../pages/users-dashboard/users-dashboard.component';
import { UserCreateComponent } from '../pages/user-create/user-create.component';
import { RoomCreateComponent } from '../pages/room-create/room-create.component';
import { RoomDashboardComponent } from '../pages/room-dashboard/room-dashboard.component';
import { UserEditComponent } from '../pages/user-edit/user-edit.component';
import { RoomEditComponent } from '../pages/room-edit/room-edit.component';
import { RequisitionDashboardComponent } from '../pages/requisition-dashboard/requisition-dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    PagesComponent
    , NavbarComponent
    , SidebarComponent
    , UsersDashboardComponent
    , UserCreateComponent
    , RoomCreateComponent
    , RoomDashboardComponent
    , UserEditComponent
    , RoomEditComponent
    , RequisitionDashboardComponent],
  imports: [
    PagesRoutingModule
    , CommonModule
    , NgxDatatableModule
    , FormsModule
    , NbLayoutModule
    , NbThemeModule
    , NbButtonModule
    , RouterModule
    , NbCardModule
    , NbUserModule
    , NbActionsModule
    , NbEvaIconsModule
    , NbIconModule
    , NbInputModule
    , NbCheckboxModule
    , HttpClientModule
    , NbSelectModule
    , NbListModule
    , NbTooltipModule
    , NbSidebarModule
    , NbMenuModule
    , NbContextMenuModule
    , NbDialogModule.forChild()
  ],
  providers: [NbSidebarService, NbThemeService, NbDialogService]
})
export class PagesModule {}