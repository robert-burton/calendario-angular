import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app'

//Variable global para Google API
//Evitamos tipar este dato, ya que causa problemas con Google Calendar
//https://youtu.be/Bj15-6rBHQw?t=175
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  calendarItems: any[];

  constructor(public afAuth: AngularFireAuth){
      this.initClient();
      this.user$ = afAuth.authState;
    }
    //Se inicializa el Google API Client
    initClient(){
      gapi.load('client', ()=> {
          console.log('loaded client')

          //Credenciales y scopes
         gapi.client.init({
          apiKey: "AIzaSyDFnqEn6F2VMUNPmwvpAQophUH9jdSliFI",
          clientId: "301744209989-tog4donrua9tk6iq8a6vkiuhn52he7c8.apps.googleusercontent.com",
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope: "https://www.googleapis.com/auth/calendar"
         })

         gapi.client.load('calendar', 'v3', ()=> console.log('loaded calendar'));

      });

  }

  async login(){
      //Para que el usuario haga log in a Google
      const googleAuth = gapi.auth2.getAuthInstance();
      const googleUser = await googleAuth.signIn();
      const token = googleUser.getAuthResponse().id_token;
      console.log(googleUser);

      //Para que el usuario haga log in a Firebase
      const credential = firebase.auth.GoogleAuthProvider.credential(token);
      await this.afAuth.signInAndRetrieveDataWithCredential(credential);

  }

  logout(){
      this.afAuth.signOut();
  }

  async getCalendar(){
      const events = await gapi.client.calendar.events.list({
          calenarId: 'primary',
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: 'startTime'
      });

      console.log(events);

      this.calendarItems = events.result.items;
  }


  //Habrá que adaptar este método para los eventos de las AFIs
  async InsertEvent(){
      const insert = await gapi.client.calendar.events.insert({
          calendarId: "primary",
          start:{
              dateTime: hoursFromNow(2),
              timeZone: 'America/Los_Angeles'
          },
          end:{
              dateTime: hoursFromNow(3),
              timeZone: 'America/Los_Angeles'
          },
          summary: 'Resumen del evento',
          description: 'Descripcion del evento'
      });

      await this.getCalendar();

  }
}

//Constante auxiliar para InsertEvent()
const hoursFromNow = (n: number) => new Date(Date.now() + n * 1000 * 60 * 60 ).toISOString();

