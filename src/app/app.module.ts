import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbThemeModule, NbThemeService, NbSidebarService, NbMenuModule, NbCardModule, NbUserModule, NbActionsModule } from '@nebular/theme';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbLayoutModule,
    NbThemeModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    RouterModule,
    NbCardModule,
    BrowserAnimationsModule,
    NbUserModule,
    NbActionsModule,
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule
  ],
  providers: [NbSidebarService, NbThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
