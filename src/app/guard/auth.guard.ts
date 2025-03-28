import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Vérifie si l'utilisateur est connecté
    if (this.authService.isConnected()) {
      return true; // L'utilisateur est connecté, autoriser l'accès
    }

    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    this.router.navigate(['']);
    return false;
  }
}
