import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Si vous utilisez des icônes
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { catchError, switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule, // Si vous utilisez des icônes
    MatDialogModule, // Ajout ici
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
    private dialog: MatDialog // Injection de MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authService
        .login(email, password)
        .pipe(
          switchMap((response: any) => {
            this.authService.saveToken(response.token); // Sauvegarde le token dans le localStorage
            return this.router.navigate(['/dashboard']); // Redirige vers la page du tableau de bord
          }),
          catchError((error: any) => {
            if (error.status === 401) {
              this.errorMessage = 'Identifiants incorrects.';
            } else if (error.status === 400) {
              this.errorMessage = 'Requête invalide.';
            } else {
              this.errorMessage =
                "Une erreur s'est produite. Veuillez réessayer plus tard.";
            }
            return hrowError(error);
          })
        )
        .subscribe();
    }
  }

  register() {
    console.log('Register button clicked'); // Ajout de cette ligne pour déboguer
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '400px', // Largeur de la boîte de dialogue
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(`Dialog result: ${result}`);
      } else {
        console.log('Dialog closed without result');
      }
    });
  }
}
function hrowError(error: any): any {
  throw new Error('Function not implemented.');
}
