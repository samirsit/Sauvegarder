import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageComponent } from '../components/page/page.component';
import { PageLoginComponent } from '../components/page-login/page-login.component';
import { withInterceptors } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageComponent, PageLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'front';
}
