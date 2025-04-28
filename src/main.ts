import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './0-app/app.config';
import { AppComponent } from './0-app/UI/app.component';

bootstrapApplication(AppComponent, appConfig)
    .catch((err: string): void => { console.error(err); });
