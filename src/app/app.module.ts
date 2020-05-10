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
  
} from '@nebular/theme';
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NavbarComponent } from './@theme/components/navbar/navbar.component';
import { SidebarComponent } from './@theme/components/sidebar/sidebar.component';
import { UsersDashboardComponent } from './pages/users-dashboard/users-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { RoomCreateComponent } from './pages/room-create/room-create.component';
import { RoomDashboardComponent } from './pages/room-dashboard/room-dashboard.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { RoomEditComponent } from './pages/room-edit/room-edit.component';
import { AuthModule } from './auth.module';

@NgModule({
  declarations: [
    AppComponent
    , NavbarComponent
    , SidebarComponent
    , UsersDashboardComponent
    , UserCreateComponent
    , RoomCreateComponent
    , RoomDashboardComponent
    , UserEditComponent
    , RoomEditComponent
  ],
  imports: [
    AuthModule
    , NgxDatatableModule
    , BrowserModule
    , FormsModule
    , AppRoutingModule
    , NbLayoutModule
    , NbThemeModule
    , NbButtonModule
    , RouterModule
    , NbCardModule
    , BrowserAnimationsModule
    , NbUserModule
    , NbActionsModule
    , NbEvaIconsModule
    , NbIconModule
    , NbInputModule
    , NbCheckboxModule
    , NbSidebarModule.forRoot()
    , NbMenuModule.forRoot()
    , NbThemeModule.forRoot({ name: 'default' })
    , NbDialogModule.forRoot()
    , HttpClientModule
    , NbSelectModule
    , NbListModule
    , NbTooltipModule
    ,  NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:3000',
              login: {
                endpoint: '/api/auth/login',
              },
        }),
      ],
      forms: {},
    }), 
  ],
  providers: [NbSidebarService, NbThemeService, NbDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
