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
  , NbTabsetModule
  , NbRouteTabsetModule
  , NbDatepickerModule
  , NbChatModule
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
import { MyRequisitionsDashboardComponent } from './my-requisitions-dashboard/my-requisitions-dashboard.component';
import { AssignedRequisitionsDashboardComponent } from './assigned-requisitions-dashboard/assigned-requisitions-dashboard.component';
import { AllRequisitionsDashboardComponent } from './all-requisitions-dashboard/all-requisitions-dashboard.component';
import { RequisitionCreateComponent } from './requisition-create/requisition-create.component';
import { RequisitionEditComponent } from './requisition-edit/requisition-edit.component';

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
    , RequisitionDashboardComponent
    , MyRequisitionsDashboardComponent
    , AssignedRequisitionsDashboardComponent
    , AllRequisitionsDashboardComponent
    , RequisitionCreateComponent, RequisitionEditComponent],
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
    , NbTabsetModule
    , NbRouteTabsetModule
    , NbDatepickerModule
    , NbChatModule
    , NbDialogModule.forChild()
  ],
  providers: [NbSidebarService, NbThemeService, NbDialogService]
})
export class PagesModule {}