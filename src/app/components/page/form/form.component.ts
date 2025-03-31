import { Component, Output, EventEmitter, Input } from '@angular/core';
import { StudentsService } from '../../../services/students.service';
import { Students } from '../../../model/students';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [FormsModule],
})
export class FormComponent {
  @Input() student: Students | null = null; // Ajouter la propriété d'entrée student
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

  @Output() formSubmitted = new EventEmitter<Students>();

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    if (this.student) {
      this.newStudent = { ...this.student };
    }
  }

  onSubmit(): void {
    if (
      this.newStudent.firstName &&
      this.newStudent.lastName &&
      this.newStudent.email &&
      this.newStudent.entryAt &&
      this.newStudent.firstDepartureMissionAt
    ) {
      this.studentsService.createStudents(this.newStudent).subscribe({
        next: () => {
          this.formSubmitted.emit(this.newStudent);
          this.resetForm();
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
