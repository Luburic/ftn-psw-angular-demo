import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  // withComponentInputBinding: parametar rute stiže u komponentu kao ulaz.
  providers: [provideRouter(routes, withComponentInputBinding())],
};
