import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Students } from '../../../model/students';
import { CommonModule } from '@angular/common'; // Importation de CommonModule
import { StudentsService } from '../../../service/students.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination'; // Pagination de ng-zorro

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzPaginationModule], // Ajout de NzPaginationModule pour la pagination
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'code',
    'firstname',
    'lastname',
    'email',
    'phone',
    'speciality',
    'entryDate',
    'departureDate',
    'createdDate',
  ];

  students: Students[] = [];
  listOfstudents: Students[] = [];
  pageIndex = 1;
  pageSize = 10;

  constructor(private studentsService: StudentsService) {}

  ngOnInit() {
    this.studentsService.getUsers().subscribe((data) => {
      console.log('Converted Data:', data);
      this.students = data;
      this.listOfstudents = [...this.students];
    });
  }

  onPageChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    // Vous pouvez ajouter une logique de pagination ici si vous le souhaitez
  }
}
