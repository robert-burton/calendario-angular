import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

const yourFirebaseConfig = {
  apiKey: "AIzaSyDAwda8_ntdlFp6iWReA3zeuoc2b15nQ2o",
  authDomain: "calendario-angular-525a3.firebaseapp.com",
  projectId: "calendario-angular-525a3",
  storageBucket: "calendario-angular-525a3.appspot.com",
  messagingSenderId: "301744209989",
  appId: "1:301744209989:web:61609d6535227d96fc232c"
};

//https://stackoverflow.com/questions/60160761/angular-8-firebase-cannot-initialize-project-due-to-angularfiremodule-initial
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
