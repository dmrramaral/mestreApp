import { Injectable } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class FichaStateFacade {
  constructor(private storageService: StorageService) {}

  obterItem(chave: string): string | null {
    return this.storageService.getItem(chave);
  }

  salvarItem(chave: string, valor: string): void {
    this.storageService.setItem(chave, valor);
  }

  removerItem(chave: string): void {
    this.storageService.removeItem(chave);
  }

  obterObjeto<T>(chave: string): T | null {
    return this.storageService.getObject<T>(chave);
  }

  salvarObjeto<T>(chave: string, valor: T): void {
    this.storageService.setObject(chave, valor);
  }
}
