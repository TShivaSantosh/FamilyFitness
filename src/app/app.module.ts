import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Health } from '@awesome-cordova-plugins/health/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
    ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Health,
    GooglePlus
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
