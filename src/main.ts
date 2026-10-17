import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Ulazna tačka: pokreće aplikaciju od korenske komponente.
bootstrapApplication(App, appConfig);
