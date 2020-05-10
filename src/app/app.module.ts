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
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { AuthGuard } from './guard/auth-guard.service';
import { of as observableOf } from 'rxjs/observable/of';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxDatatableModule
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
    , HttpClientModule
    , NbSelectModule
    , NbListModule
    , NbTooltipModule
    , NbSidebarModule.forRoot()
    , NbMenuModule.forRoot()
    , NbThemeModule.forRoot({ name: 'default' })
    , NbDialogModule.forRoot()
    , NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:3000',
          login: {
            endpoint: '/api/auth/login',
            method: 'post',
            requireValidToken: true,
            redirect: {
              success: 'pages/requisition-dashboard',
              failure: null,
            },
            defaultErrors: ['El email y/o password son incorrectos, intente más tarde'],
            defaultMessages: ['Login Correcto'],
          },
          token: {
            class: NbAuthJWTToken,
            key: 'token'
          }
        }),

      ],
      forms: {
        login: {
          redirectDelay: 500, //Change to 0 to cancel delay 
          strategy: 'email',
          rememberMe: true,
          showMessages: {
            success: true,
            error: true,
          },
        },
        validation: {
          password: {
            required: true,
            minLength: 4,
            maxLength: 10,
          },
          email: {
            required: true,
          },
        },
      },

    })
    , NbSecurityModule.forRoot({
      accessControl: {
        user: {
          view: ['news', 'comments'],
        },
        admin: {
          parent: 'user',
          create: 'comments',
        },
        super_admin: {
          parent: 'admin',
          create: 'news',
          remove: '*',
        },
      },
    }
    )
  ],
  providers: [NbSidebarService, NbThemeService, NbDialogService, AuthGuard,
    {
      provide: NbRoleProvider,
      useValue: () => {
        return observableOf('guest');
      },
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
