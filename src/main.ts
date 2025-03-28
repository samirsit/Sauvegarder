import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/principale/app.component';
import { appConfig } from './app/principale/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
