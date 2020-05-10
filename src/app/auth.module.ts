import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
    , AuthRoutingModule
    , NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:3000',
          login: {
            endpoint: '/api/login',
            redirect:{
              success: '/user-dashboard',
              failure: null, // stay on the same page
            }
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          strategy: 'email',
          rememberMe: true,
          showMessages: {
            success: true,
            error: true,
          },
        },
        logout: {
          redirectDelay: 0,
        },
      },
    }),
  ],
  providers: []
})
export class AuthModule { }
