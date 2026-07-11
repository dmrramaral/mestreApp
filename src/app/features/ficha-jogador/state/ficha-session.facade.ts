import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../../../core/constants/rpg.constants';
import { StorageService } from '../../../core/services/storage.service';
import { SessaoJogador } from './ficha-state.models';

@Injectable({
  providedIn: 'root'
})
export class FichaSessionFacade {
  constructor(private storageService: StorageService) {}

  obterSessaoPadrao(): SessaoJogador {
    return {
      modo: 'convidado',
      usuarioId: 'guest',
      ultimoLogin: new Date().toISOString()
    };
  }

  carregarSessao(): SessaoJogador {
    const sessaoSalva = this.storageService.getObject<SessaoJogador>(STORAGE_KEYS.PLAYER_SESSION);
    if (sessaoSalva?.usuarioId) {
      return sessaoSalva;
    }
    return this.obterSessaoPadrao();
  }

  salvarSessao(sessao: SessaoJogador): void {
    this.storageService.setObject(STORAGE_KEYS.PLAYER_SESSION, {
      ...sessao,
      ultimoLogin: new Date().toISOString()
    });
  }

  obterChaveFichaAtual(usuarioId: string): string {
    return usuarioId === 'guest'
      ? STORAGE_KEYS.PLAYER_CHARACTER
      : `${STORAGE_KEYS.PLAYER_CHARACTER_PREFIX}${usuarioId}`;
  }

  obterChaveUltimoSync(usuarioId: string): string {
    return `${STORAGE_KEYS.PLAYER_LAST_SYNC_PREFIX}${usuarioId}`;
  }

  obterChaveFichaSelecionada(usuarioId: string): string {
    return `${STORAGE_KEYS.PLAYER_SELECTED_CHARACTER_PREFIX}${usuarioId}`;
  }

  carregarFichaSelecionada(usuarioId: string): string {
    if (usuarioId === 'guest') {
      return 'main-character';
    }
    return this.storageService.getItem(this.obterChaveFichaSelecionada(usuarioId)) || 'main-character';
  }

  salvarFichaSelecionada(usuarioId: string, fichaId: string): void {
    if (usuarioId === 'guest') {
      return;
    }
    this.storageService.setItem(this.obterChaveFichaSelecionada(usuarioId), fichaId);
  }
}
