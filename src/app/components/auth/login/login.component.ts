import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { catchError, switchMap, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../security/service/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    // Modules nécessaires
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Méthode de connexion
  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService
        .login(email, password)
        .pipe(
          switchMap((response: any) => {
            console.log(response); // Inspecter la réponse ici pour vérifier les tokens
            if (response.accessToken) {
              // Utilisez 'accessToken' à la place de 'token'
              this.authService.saveToken(response.accessToken); // Sauvegarder l'accessToken
              return this.router.navigate(['/api']); // Redirection vers le tableau de bord
            } else {
              this.errorMessage =
                "Le token d'accès n'a pas été renvoyé par l'API.";
              return throwError('Access token manquant');
            }
          }),
          catchError((error: any) => {
            this.handleLoginError(error);
            return throwError(error);
          })
        )
        .subscribe();
    }
  }

  // Gère les erreurs de connexion
  private handleLoginError(error: any): void {
    if (error.status === 401) {
      this.errorMessage = 'Identifiants incorrects.';
    } else if (error.status === 400) {
      this.errorMessage = 'Requête invalide.';
    } else {
      this.errorMessage =
        "Une erreur s'est produite. Veuillez réessayer plus tard.";
    }
  }

  // Ouvre la boîte de dialogue d'inscription
  register(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(`Dialog result: ${result}`);
      }
    });
  }
}
