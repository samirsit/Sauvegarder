import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  inscriptionForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    this.inscriptionForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Validation de la correspondance des mots de passe
  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Méthode d'inscription
  onInscription(): void {
    if (this.inscriptionForm.valid) {
      const { username, email, password } = this.inscriptionForm.value;

      this.authService
        .register(username, email, password)
        .pipe(
          catchError((error) => {
            this.errorMessage =
              error?.error?.message || "Une erreur s'est produite.";
            return of(null);
          })
        )
        .subscribe((response) => {
          if (response) {
            this.dialogRef.close(); // Ferme la boîte de dialogue
            this.router.navigate(['/']); // Redirection vers la page de connexion
          }
        });
    } else {
      this.errorMessage = 'Veuillez vérifier les champs obligatoires.';
    }
  }

  // Ferme la boîte de dialogue et redirige vers la page de connexion
  closeDialogAndNavigateToLogin(): void {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}
