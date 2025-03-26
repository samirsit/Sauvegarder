import { Routes } from '@angular/router';
import { LoginComponent } from '../components/auth/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from '../security/guard/guard.guard';
import { IhmComponent } from '../components/ihm/ihm.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'api', component: IhmComponent, canActivate: [AuthGuard] },
];
