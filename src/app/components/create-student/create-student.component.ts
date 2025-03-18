import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-student',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule, // ✅ Ajout du module pour les champs de formulaire
    MatInputModule, // ✅ Ajout du module pour les entrées texte
    MatButtonModule, // ✅ Ajout du module pour les boutons Material
    FormsModule, // ✅ Pour les formulaires template-driven
    ReactiveFormsModule, // ✅ Pour les formulaires réactifs],
  ],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateStudentComponent {}
