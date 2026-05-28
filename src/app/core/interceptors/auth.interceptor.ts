import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

const backendOrigin = environment.backendSyncUrl.replace(/\/$/, '');

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Injeta Bearer apenas em requisições para o backend próprio
  if (!req.url.startsWith(backendOrigin)) {
    return next(req);
  }

  const authService = inject(AuthService);
  const token = authService.obterToken();

  if (!token) {
    return next(req);
  }

  const reqAutenticada = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(reqAutenticada);
};
