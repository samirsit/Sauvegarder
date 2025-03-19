import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule, // Si vous utilisez des icônes
    ReactiveFormsModule, // Ajout ici
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  inscriptionForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router // Injection du service Router
  ) {
    this.inscriptionForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onInscription(): void {
    if (this.inscriptionForm.valid) {
      console.log(this.inscriptionForm.value);
      // Logique d'inscription ici
      // Par exemple, appeler un service pour inscrire l'utilisateur
    } else {
      this.errorMessage = 'Veuillez vérifier les champs obligatoires.';
    }
  }

  closeDialogAndNavigateToLogin() {
    this.dialogRef.close(); // Ferme la boîte de dialogue
    this.router.navigate(['/']); // Navigue vers la page de connexion
  }
}
