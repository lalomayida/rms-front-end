import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbThemeModule, NbThemeService, NbSidebarService } from '@nebular/theme';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbLayoutModule,
    NbThemeModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    RouterModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule
  ],
  providers: [NbSidebarService, NbThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
