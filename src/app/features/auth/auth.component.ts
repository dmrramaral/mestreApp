import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

declare const google: any;

type Aba = 'login' | 'registro';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  abaAtiva = signal<Aba>('login');
  carregando = signal(false);
  erro = signal<string | null>(null);

  formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  });

  formRegistro: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit(): void {
    // Se já autenticado, redirecionar para home
    if (this.authService.estaAutenticado) {
      this.router.navigate(['/home']);
      return;
    }

    this.inicializarGoogleGSI();
  }

  mudarAba(aba: Aba): void {
    this.abaAtiva.set(aba);
    this.erro.set(null);
  }

  fazerLogin(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }
    this.carregando.set(true);
    this.erro.set(null);

    this.authService.login(this.formLogin.value).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (e) => {
        this.erro.set(this.traduzirErro(e));
        this.carregando.set(false);
      }
    });
  }

  fazerRegistro(): void {
    if (this.formRegistro.invalid) {
      this.formRegistro.markAllAsTouched();
      return;
    }
    this.carregando.set(true);
    this.erro.set(null);

    this.authService.register(this.formRegistro.value).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (e) => {
        this.erro.set(this.traduzirErro(e));
        this.carregando.set(false);
      }
    });
  }

  private inicializarGoogleGSI(): void {
    if (typeof window === 'undefined' || typeof google === 'undefined') return;

    try {
      const clientId = (window as any).__GOOGLE_CLIENT_ID__;
      if (!clientId) return;

      google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: { credential: string }) => {
          this.carregando.set(true);
          this.erro.set(null);
          this.authService.loginComGoogle({ credential: response.credential }).subscribe({
            next: () => this.router.navigate(['/home']),
            error: (e) => {
              this.erro.set(this.traduzirErro(e));
              this.carregando.set(false);
            }
          });
        }
      });

      google.accounts.id.renderButton(
        document.getElementById('google-gsi-btn'),
        { theme: 'outline', size: 'large', width: 400, locale: 'pt-BR' }
      );
    } catch {
      // Google GSI não disponível — silencia
    }
  }

  private traduzirErro(err: any): string {
    const status = err?.status;
    const serverMsg = err?.error?.error;
    if (serverMsg === 'email_already_exists') return 'E-mail já cadastrado.';
    if (serverMsg === 'invalid_credentials') return 'E-mail ou senha incorretos.';
    if (serverMsg === 'invalid_token') return 'Falha na autenticação Google.';
    if (status === 400) return 'Dados inválidos. Verifique os campos.';
    if (status === 401) return 'E-mail ou senha incorretos.';
    if (status === 409) return 'E-mail já cadastrado.';
    return 'Erro ao conectar com o servidor. Tente novamente.';
  }
}
