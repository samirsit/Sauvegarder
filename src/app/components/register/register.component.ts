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
import { AuthService } from '../../service/auth.service'; // Importation du service AuthService
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
    private authService: AuthService, // Injection du service AuthService
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
      const { username, email, password } = this.inscriptionForm.value;

      this.authService
        .register(username, email, password)
        .pipe(
          catchError((error) => {
            this.errorMessage =
              error?.error?.message || "Une erreur s'est produite.";
            return of(null); // Retourne un observable vide pour éviter la rupture du flux
          })
        )
        .subscribe((response) => {
          if (response) {
            console.log('Inscription réussie', response);
            this.dialogRef.close(); // Ferme la boîte de dialogue
            this.router.navigate(['/']); // Redirige vers la page de connexion
          }
        });
    } else {
      this.errorMessage = 'Veuillez vérifier les champs obligatoires.';
    }
  }

  closeDialogAndNavigateToLogin() {
    this.dialogRef.close(); // Ferme la boîte de dialogue
    this.router.navigate(['/']); // Navigue vers la page de connexion
  }
}
