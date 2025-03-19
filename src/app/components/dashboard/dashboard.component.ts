import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { TableComponent } from '../table/table.component';
import { CreateStudentComponent } from '../create-student/create-student.component';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    TableComponent,
    CreateStudentComponent,
    RegisterComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
