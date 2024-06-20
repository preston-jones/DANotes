import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "danotes-5616c", "appId": "1:7809826903:web:f98093c6d7fe2bbcada312", "storageBucket": "danotes-5616c.appspot.com", "apiKey": "AIzaSyA1tP6C_q-ngK2tKC5h6dboQd_CIfBqoxg", "authDomain": "danotes-5616c.firebaseapp.com", "messagingSenderId": "7809826903" }))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};