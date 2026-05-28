import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    AuthResponse,
    GoogleLoginRequest,
    LoginRequest,
    RegisterRequest,
    Usuario
} from '../models/auth.model';

const TOKEN_KEY = 'mestreapp_token';
const USER_KEY = 'mestreapp_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.backendSyncUrl.replace(/\/$/, '');
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly _usuario$ = new BehaviorSubject<Usuario | null>(this.carregarUsuarioLocal());
  readonly usuario$ = this._usuario$.asObservable();

  get usuarioAtual(): Usuario | null {
    return this._usuario$.value;
  }

  get estaAutenticado(): boolean {
    return !!this._usuario$.value && !!this.obterToken();
  }

  obterToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  login(dados: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/api/auth/login`, dados)
      .pipe(tap(resposta => this.salvarSessao(resposta)));
  }

  register(dados: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/api/auth/register`, dados)
      .pipe(tap(resposta => this.salvarSessao(resposta)));
  }

  loginComGoogle(dados: GoogleLoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/api/auth/google`, dados)
      .pipe(tap(resposta => this.salvarSessao(resposta)));
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    this._usuario$.next(null);
  }

  private salvarSessao(resposta: AuthResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(TOKEN_KEY, resposta.token);
      localStorage.setItem(USER_KEY, JSON.stringify(resposta.user));
    }
    this._usuario$.next(resposta.user);
  }

  private carregarUsuarioLocal(): Usuario | null {
    if (typeof localStorage === 'undefined') return null;
    try {
      const json = localStorage.getItem(USER_KEY);
      return json ? (JSON.parse(json) as Usuario) : null;
    } catch {
      return null;
    }
  }
}
