import {
  NbSidebarModule
  , NbThemeModule
  , NbThemeService
  , NbSidebarService
  , NbMenuModule
  , NbDialogModule
  , NbDialogService
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
    , NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:3000',
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
          view: ['own-requisitions','user'],
          create: ['own-requisitions'],
          remove: ['own-requisitions']
        },
        '2': {
          view: ['own-requisitions','assigned-requitions', 'rooms','admin'],
          create: ['own-requisitions','assigned-requitions', 'rooms'],
          remove: ['own-requisitions','assigned-requisitions']
        },
        '3': {
          view: ['own-requisitions','assigned-requitions', 'rooms','users','super_admin'],
          create: ['own-requisitions','assigned-requitions', 'rooms','users'],
          remove: ['own-requisitions','assigned-requisitions']
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
