import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RegistroSync, SyncBackendService } from '../../../core/services/sync-backend.service';
import { FichaContaResumo } from './ficha-state.models';

@Injectable({
  providedIn: 'root'
})
export class FichaSyncFacade {
  constructor(private syncBackendService: SyncBackendService) {}

  async listarFichasConta(): Promise<FichaContaResumo[]> {
    const lista = await firstValueFrom(this.syncBackendService.listarFichas());
    return (lista.records || [])
      .filter((change) => !change.deleted)
      .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
      .map((change) => ({
        id: change.id,
        nome: String(change.payload?.nome || 'Sem Nome').trim() || 'Sem Nome',
        updatedAt: change.updatedAt,
        payload: change.payload
      }));
  }

  async pushMudancas(registros: RegistroSync[]): Promise<string> {
    const push = await firstValueFrom(this.syncBackendService.pushMudancas(registros));
    return push.serverTimestamp;
  }
}
