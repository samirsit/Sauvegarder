import { Component, Output, EventEmitter } from '@angular/core';
import { StudentsService } from '../../../services/students.service';
import { Students } from '../../../model/students';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [FormsModule],
})
export class FormComponent {
  newStudent: Students = {
    code: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    speciality: '',
    entryAt: null,
    firstDepartureMissionAt: null,
    createdAt: new Date(),
  };

  @Output() formSubmitted = new EventEmitter<void>();

  constructor(private studentsService: StudentsService) {}

  onSubmit(): void {
    if (
      this.newStudent.firstName &&
      this.newStudent.lastName &&
      this.newStudent.email
    ) {
      this.studentsService.createStudents(this.newStudent).subscribe({
        next: () => {
          this.resetForm();
          this.formSubmitted.emit(); // Émettre l'événement pour informer le parent
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout de l'étudiant :", error);
        },
      });
    } else {
      console.error('Tous les champs requis doivent être remplis');
    }
  }

  resetForm(): void {
    this.newStudent = {
      code: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      speciality: '',
      entryAt: null,
      firstDepartureMissionAt: null,
      createdAt: null,
    };
  }
}
