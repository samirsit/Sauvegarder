import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'code',
    'firstname',
    'lastname',
    'email',
    'phone',
    'speciality',
    'entryDate',
    'departureDate',
    'createdDate', // ✅ Correction du nom de colonne
  ];

  dataSource = new MatTableDataSource<StudentElement>(STUDENTS_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface StudentElement {
  code: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  speciality: string;
  entryDate: Date;
  departureDate: Date;
  createdDate: Date; // ✅ Ajout du champ manquant
}

const STUDENTS_DATA: StudentElement[] = [
  {
    code: 1,
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    speciality: 'Math',
    entryDate: new Date('2023-09-01'),
    departureDate: new Date('2024-06-30'),
    createdDate: new Date('2023-09-01'), // ✅ Correction
  },
  {
    code: 2,
    firstname: 'Jane',
    lastname: 'Smith',
    email: 'jane.smith@example.com',
    phone: '0987654321',
    speciality: 'Science',
    entryDate: new Date('2022-09-01'),
    departureDate: new Date('2023-06-30'),
    createdDate: new Date('2022-09-01'), // ✅ Correction
  },
  {
    code: 3,
    firstname: 'Alice',
    lastname: 'Brown',
    email: 'alice.brown@example.com',
    phone: '1122334455',
    speciality: 'Physics',
    entryDate: new Date('2021-09-01'),
    departureDate: new Date('2022-06-30'),
    createdDate: new Date('2021-09-01'), // ✅ Correction
  },
];
