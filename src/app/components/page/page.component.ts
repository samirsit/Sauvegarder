import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentsService } from '../../services/students.service';
import { Students } from '../../model/students';
import { FormComponent } from './form/form.component';
import { catchError, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, FormComponent, FormsModule],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  students: Students[] = [];
  filterStudents: Students[] = [];
  showForm = false;
  searchQuery: string = '';
  searchType: string = 'code';
  editingStudent: Students | null = null;
  showUpdateForm = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentsService
      .getStudents()
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la récupération des étudiants :',
            error
          );
          if (error.status === 401) {
            console.log('Déconnexion due à une erreur 401');
            this.logout();
          }
          return of([]);
        })
      )
      .subscribe((students) => {
        this.students = students;
        this.filterStudents = students;
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onFormSubmitted(student: Students) {
    // Recevoir Students
    this.studentsService.createStudents(student).subscribe({
      next: (newStudent) => {
        console.log('Étudiant créé :', newStudent);
        this.loadStudents();
      },
      error: (error) => {
        console.error("Erreur lors de la création de l'étudiant :", error);
      },
    });
  }

  onSearchChange() {
    if (!this.searchQuery.trim()) {
      this.filterStudents = this.students;
      return;
    }

    const searchService =
      this.searchType === 'code'
        ? this.studentsService.getStudentsByCode(this.searchQuery)
        : this.studentsService.getStudentsByEmail(this.searchQuery);

    searchService
      .pipe(
        catchError((err) => {
          console.error(
            `Erreur lors de la recherche par ${this.searchType}:`,
            err
          );
          return of([]);
        })
      )
      .subscribe((response) => {
        this.filterStudents = response;
        console.log(`Résultats par ${this.searchType}:`, response);
      });
  }

  deleteStudent(student: Students) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      const deleteObservable = student.code
        ? this.studentsService.deleteStudentsByCode(student.code)
        : this.studentsService.deleteStudentsByEmail(student.email);

      deleteObservable.subscribe({
        next: () => {
          console.log('Étudiant supprimé.');
          this.loadStudents();
        },
        error: (error) => {
          console.error("Erreur lors de la suppression de l'étudiant :", error);
        },
      });
    }
  }

  updateStudent(student: Students) {
    this.editingStudent = { ...student };
    this.showUpdateForm = true;
  }

  onUpdateFormSubmitted(updatedStudent: Students) {
    if (this.editingStudent && this.editingStudent.code) {
      this.studentsService
        .updateStudents(updatedStudent, this.editingStudent.code)
        .subscribe({
          next: (response) => {
            console.log('Étudiant mis à jour :', response);
            this.loadStudents();
            this.showUpdateForm = false;
            this.editingStudent = null;
          },
          error: (error) => {
            console.error(
              "Erreur lors de la mise à jour de l'étudiant :",
              error
            );
          },
        });
    }
  }
}
