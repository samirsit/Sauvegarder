import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { CenterComponent } from '../components/center/center.component';
import { TableComponent } from '../components/center/table/table.component';
import { IhmComponent } from '../components/ihm/ihm.component';
import { AuthInterceptor } from '../security/interceptor/auth.interceptor';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LoginComponent,
    RegisterComponent,
    CenterComponent,
    TableComponent,
    IhmComponent,
    CommonModule,
    RouterModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // Ajouter l'intercepteur
  ],
  templateUrl: './app.component.html', // Chemin relatif corrigé
  styleUrls: ['./app.component.css'], // Style corrigé aussi
})
export class AppComponent {
  title = "Village d'emploi";
}
