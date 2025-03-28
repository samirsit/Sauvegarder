import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, catchError, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Ajouter le token JWT à l'en-tête "Authorization"
  const token = authService.userToken();
  let modifiedReq = req;

  if (token) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(modifiedReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((newTokens) => {
            const newToken = newTokens.access_token; // Vérifie bien la clé retournée par ton backend

            if (newToken) {
              authService.saveToken(newToken, newTokens.refresh_token); // Sauvegarde du nouveau token
              // Réessayer la requête avec le nouveau token
              modifiedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
              return next(modifiedReq);
            }

            authService.logout(); // Déconnecte si aucun token n'est reçu
            router.navigate(['/']); // Rediriger vers la page de login
            return throwError(() => error);
          }),
          catchError(() => {
            authService.logout(); // Déconnecte si le refresh token est expiré
            router.navigate(['/']); // Rediriger vers la page de login
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
}
