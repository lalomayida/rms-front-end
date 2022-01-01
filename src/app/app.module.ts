import {
  NbSidebarModule
  , NbThemeModule
  , NbThemeService
  , NbSidebarService
  , NbMenuModule
  , NbDialogModule
  , NbDialogService
  , NbDatepickerModule 
} from '@nebular/theme';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { RoleProvider } from './auth/role.provider';
import { AuthGuard } from './guard/auth-guard.service';
import { of as observableOf } from 'rxjs/observable/of';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


const login: any = {
  endpoint: '/api/auth/login',
  method: 'post',
  requireValidToken: true,
  redirect: {
    success: 'pages/requisition-dashboard',
    failure: null,
  },
  defaultErrors: ['El email y/o password son incorrectos, intente más tarde'],
  defaultMessages: ['Login Correcto'],
}

const loginForm: any = {
  redirectDelay: 500, //Change to 0 to cancel delay 
  strategy: 'email',
  rememberMe: true,
  showMessages: {
    success: true,
    error: true,
  }
}

const logout: any = {
  endpoint: '',
}


const validation: any = {
  password: {
    required: true,
    minLength: 4,
    maxLength: 10,
  },
  email: {
    required: true,
  },
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
    , BrowserAnimationsModule
    , AppRoutingModule
    , RouterModule
    , HttpClientModule
    , NbSidebarModule.forRoot()
    , NbMenuModule.forRoot()
    , NbThemeModule.forRoot({ name: 'default' })
    , NbDialogModule.forRoot()
    , NbDatepickerModule.forRoot()
    , NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'https://requisition-management-db.herokuapp.com',
          login: login,
          logout: logout,
          token: { class: NbAuthJWTToken, key: 'token' }
        }),
      ],
      forms: {
        login: loginForm,
        logout: { redirectDelay: 0 },
        validation: validation
      },
    })
    , NbSecurityModule.forRoot({
      accessControl: {
        '1': {
          view: ['my-requisitions', 'user'],
          create: ['requisitions'],
          edit: ['requisitions'],
          remove: ['requisitions']
        },
        '2': {
          view: ['my-requisitions', 'assigned-requitions', 'rooms', 'admin'],
          create: ['requisitions', 'rooms'],
          edit: ['assigned-requisitions', 'rooms'],
          remove: ['requisitions']
        },
        '3': {
          view: ['my-requisitions', 'assigned-requitions', 'all-requitions', 'rooms', 'users', 'super_admin'],
          create: ['requisitions', 'rooms', 'users'],
          edit: ['assigned-requisitions', 'rooms', 'users'],
          remove: ['requisitions']
        },
      },
    }
    )
  ],
  providers: [
    NbSidebarService
    , NbThemeService
    , NbDialogService
    , AuthGuard
    , { provide: NbRoleProvider, useClass: RoleProvider }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
