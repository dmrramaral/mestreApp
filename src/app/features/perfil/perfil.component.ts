import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { STORAGE_KEYS } from '../../core/constants/rpg.constants';
import { Usuario } from '../../core/models/auth.model';
import { AuthService } from '../../core/services/auth.service';
import { StorageService } from '../../core/services/storage.service';
import { RegistroSync, SyncBackendService } from '../../core/services/sync-backend.service';

interface FichaResumo {
  id: string;
  nome: string;
  sistema: string;
  classe: string;
  nivel: number | null;
  raca: string;
  avatar: string | null;
  updatedAt: string;
  payload: any;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, RouterLink],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly syncService = inject(SyncBackendService);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);

  usuario = signal<Usuario | null>(null);
  fichas = signal<FichaResumo[]>([]);
  carregandoFichas = signal(false);
  erroFichas = signal<string | null>(null);

  editando = signal(false);
  salvando = signal(false);
  erroSalvar = signal<string | null>(null);
  nomeEdit = '';
  avatarEdit = '';

  ngOnInit(): void {
    this.authService.usuario$.subscribe(u => {
      this.usuario.set(u);
      if (u) {
        this.nomeEdit = u.nome;
        this.avatarEdit = u.avatar || '';
        this.carregarFichas(u.id);
      }
    });
  }

  carregarFichas(userId: string): void {
    this.carregandoFichas.set(true);
    this.erroFichas.set(null);
    this.syncService.listarFichas().subscribe({
      next: (resp) => {
        const resumos = (resp.records || [])
          .filter(r => !r.deleted)
          .map(r => this.mapearFicha(r))
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        this.fichas.set(resumos);
        this.carregandoFichas.set(false);
      },
      error: () => {
        this.erroFichas.set('Não foi possível carregar as fichas. Verifique sua conexão.');
        this.carregandoFichas.set(false);
      }
    });
  }

  private mapearFicha(record: RegistroSync): FichaResumo {
    const p = record.payload || {};
    return {
      id: record.id,
      nome: p.nome || 'Sem nome',
      sistema: p.sistema || 'dnd5e',
      classe: p.classe || p.cyberpun2080?.papel || '—',
      nivel: p.nivel ?? null,
      raca: p.raca || p.cyberpun2080?.origem || '—',
      avatar: p.avatar || null,
      updatedAt: record.updatedAt,
      payload: p
    };
  }

  iniciarEdicao(): void {
    const u = this.usuario();
    if (!u) return;
    this.nomeEdit = u.nome;
    this.avatarEdit = u.avatar || '';
    this.erroSalvar.set(null);
    this.editando.set(true);
  }

  cancelarEdicao(): void {
    this.editando.set(false);
    this.erroSalvar.set(null);
  }

  salvarPerfil(): void {
    if (!this.nomeEdit.trim()) {
      this.erroSalvar.set('O nome não pode ser vazio.');
      return;
    }
    this.salvando.set(true);
    this.erroSalvar.set(null);
    this.authService.atualizarPerfil({ nome: this.nomeEdit.trim(), avatar: this.avatarEdit || null })
      .subscribe({
        next: () => {
          this.salvando.set(false);
          this.editando.set(false);
        },
        error: () => {
          this.salvando.set(false);
          this.erroSalvar.set('Erro ao salvar. Tente novamente.');
        }
      });
  }

  abrirFicha(ficha: FichaResumo): void {
    const u = this.usuario();
    const chave = u ? `${STORAGE_KEYS.PLAYER_CHARACTER_PREFIX}${u.id}` : STORAGE_KEYS.PLAYER_CHARACTER;
    this.storageService.setItem(chave, JSON.stringify(ficha.payload));
    this.router.navigate(['/ficha-jogador']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  sistemaLabel(sistema: string): string {
    return sistema === 'cyberpun2080' ? 'Cyberpunk 2080' : 'D&D 5e';
  }

  sistemaIconClass(sistema: string): string {
    return sistema === 'cyberpun2080' ? 'fas fa-bolt text-danger' : 'fas fa-dragon text-primary';
  }

  getAvatarUrl(ficha: FichaResumo): string {
    return ficha.avatar || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22%3E%3Crect width=%2260%22 height=%2260%22 fill=%22%23667eea%22/%3E%3Ctext x=%2230%22 y=%2238%22 text-anchor=%22middle%22 font-size=%2224%22 fill=%22white%22%3E%3F%3C/text%3E%3C/svg%3E';
  }

  getUserAvatarUrl(): string {
    const u = this.usuario();
    if (u?.avatar) return u.avatar;
    const inicial = (u?.nome || '?')[0].toUpperCase();
    return `data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23667eea%22/%3E%3Ctext x=%2250%22 y=%2263%22 text-anchor=%22middle%22 font-size=%2242%22 font-family=%22sans-serif%22 fill=%22white%22%3E${inicial}%3C/text%3E%3C/svg%3E`;
  }

  get isGoogleUser(): boolean {
    return !!this.usuario()?.googleId;
  }

  get primeiroNome(): string {
    return this.usuario()?.nome?.split(' ')[0] || '';
  }
}
