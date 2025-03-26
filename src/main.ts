import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/principale/app.config';
import { AppComponent } from './app/principale/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
