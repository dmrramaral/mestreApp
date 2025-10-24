import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

/**
 * Interceptor para tratamento global de erros HTTP
 * Captura e formata erros de requisições HTTP
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocorreu um erro desconhecido';

      if (error.error instanceof ErrorEvent) {
        // Erro do lado do cliente
        errorMessage = `Erro: ${error.error.message}`;
        console.error('Erro do cliente:', error.error.message);
      } else {
        // Erro do lado do servidor
        errorMessage = `Erro ${error.status}: ${error.message}`;
        console.error(`Erro do servidor - Status: ${error.status}, Mensagem: ${error.message}`);
        
        // Tratamento específico por código de status
        switch (error.status) {
          case 400:
            errorMessage = 'Requisição inválida';
            break;
          case 401:
            errorMessage = 'Não autorizado';
            break;
          case 403:
            errorMessage = 'Acesso negado';
            break;
          case 404:
            errorMessage = 'Recurso não encontrado';
            break;
          case 500:
            errorMessage = 'Erro interno do servidor';
            break;
          case 503:
            errorMessage = 'Serviço temporariamente indisponível';
            break;
        }
      }

      // Log detalhado em modo desenvolvimento
      if (typeof window !== 'undefined' && !window.location.hostname.includes('prod')) {
        console.error('Detalhes completos do erro:', {
          url: error.url,
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        });
      }

      return throwError(() => new Error(errorMessage));
    })
  );
};
