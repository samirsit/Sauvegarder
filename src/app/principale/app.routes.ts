import { Routes } from '@angular/router';
import { PageLoginComponent } from '../components/page-login/page-login.component';
import { PageComponent } from '../components/page/page.component';
import { AuthGuard } from '../guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PageLoginComponent,
    data: { title: 'Page de connexion' },
  },
  { path: 'acceuil', component: PageComponent, canActivate: [AuthGuard] },
];
