import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { CenterComponent } from '../center/center.component';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CenterComponent,
    NzAvatarModule,
    LoginComponent,
  ],
  templateUrl: './ihm.component.html',
  styleUrls: ['./ihm.component.css'],
})
export class IhmComponent {
  home: string = 'Home';
  products: string = 'Products';
  order: string = 'Order';
  customers: string = 'Customers';
  files: string = 'Files';
  logout: string = 'logout';
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isCollapsed: boolean = false; // Par défaut, le texte est visible

  // Méthode pour basculer l'affichage du texte
  toggleMenu() {
    if (this.isCollapsed === true) {
      this.home = '';
      this.products = '';
      this.order = '';
      this.customers = '';
      this.files = '';
      this.logout = '';
    } else {
      this.home = 'Home';
      this.products = 'Products';
      this.order = 'Order';
      this.customers = 'Customers';
      this.files = 'Files';
      this.logout = 'Logout';
    }
  }
}
