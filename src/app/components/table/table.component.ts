import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Students } from '../../model/students';
import { StudentsService } from '../../service/student/students.service';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
})
export class TableComponent implements AfterViewInit, OnInit {
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

  dataSource = new MatTableDataSource<Students>();
  students: Students[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private studentsService: StudentsService) {}

  ngOnInit() {
    this.studentsService.getUsers().subscribe((data) => {
      this.students = data;
      this.dataSource.data = this.students;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
