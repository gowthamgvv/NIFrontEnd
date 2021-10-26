import { FeaturesModule } from './Features/Features.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './Core/_interceptor/auth/auth.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

// imported modules from the src
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Authentication/login/login.component';
import { ViewIncentiveComponent } from './Features/view-incentive/view-incentive.component';
import { HeaderComponent } from './Layout/header/header.component';
import { LeftPanelComponent } from './Layout/left-panel/left-panel.component';

import { ImageCropperModule } from 'ngx-image-cropper';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PipesModule } from '../app/Core/_pipes/pipes.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SoldUnitsDataComponent } from './Partials/sold-units-data/sold-units-data.component';
import {​​​​​​​​ NgxSliderModule }​​​​​​​​ from'@angular-slider/ngx-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

//import { DealerincentivesComponent } from './Features/dealerincentives/dealerincentives.component'; 

export function tokenGetter() {
  return localStorage.getItem('NetImpFrtEND_Token');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SoldUnitsDataComponent 
   // DealerincentivesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FeaturesModule,
    HttpClientModule,
    MatDialogModule,
    PipesModule,
    NgxSliderModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['http://demoapi.nilocal.com'],
        disallowedRoutes: ['http://demoapi.nilocal.com/api/dealerlogin/dealersignin'],

        // allowedDomains: ['http://niapi.local.com'],
        // disallowedRoutes: ['http://niapi.local.com/api/dealerlogin/dealersignin'],

        //  allowedDomains: ['http://localapi.throttle.com'],
        //  disallowedRoutes: ['http://localapi.throttle.com/api/dealerlogin/dealersignin'],

      },
    }),
    ReactiveFormsModule,
    ImageCropperModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe,
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }