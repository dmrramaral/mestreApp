import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Serviço centralizado para gerenciamento de estado e localStorage
 * Melhora o serviço existente com suporte a observables e tipagem
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageMap = new Map<string, BehaviorSubject<any>>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Obtém um item do localStorage
   * 
   * @param key - Chave do item
   * @returns Valor do item ou null
   */
  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  /**
   * Salva um item no localStorage
   * 
   * @param key - Chave do item
   * @param value - Valor a ser salvo
   */
  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
      this.notifyChange(key, value);
    }
  }

  /**
   * Remove um item do localStorage
   * 
   * @param key - Chave do item
   */
  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
      this.notifyChange(key, null);
    }
  }

  /**
   * Limpa todo o localStorage
   */
  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      this.storageMap.forEach((subject, key) => {
        subject.next(null);
      });
    }
  }

  /**
   * Obtém um item tipado do localStorage
   * 
   * @param key - Chave do item
   * @returns Objeto parseado ou null
   */
  getObject<T>(key: string): T | null {
    const value = this.getItem(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch (error) {
        console.error(`Erro ao parsear objeto da chave ${key}:`, error);
        return null;
      }
    }
    return null;
  }

  /**
   * Salva um objeto no localStorage
   * 
   * @param key - Chave do item
   * @param value - Objeto a ser salvo
   */
  setObject<T>(key: string, value: T): void {
    try {
      const json = JSON.stringify(value);
      this.setItem(key, json);
    } catch (error) {
      console.error(`Erro ao salvar objeto na chave ${key}:`, error);
    }
  }

  /**
   * Observa mudanças em uma chave específica
   * 
   * @param key - Chave a ser observada
   * @returns Observable que emite quando o valor muda
   */
  watch<T>(key: string): Observable<T | null> {
    if (!this.storageMap.has(key)) {
      const currentValue = this.getObject<T>(key);
      this.storageMap.set(key, new BehaviorSubject<T | null>(currentValue));
    }
    return this.storageMap.get(key)!.asObservable();
  }

  /**
   * Notifica observadores sobre mudanças
   */
  private notifyChange(key: string, value: any): void {
    if (this.storageMap.has(key)) {
      const parsedValue = value ? JSON.parse(value) : null;
      this.storageMap.get(key)!.next(parsedValue);
    }
  }

  /**
   * Verifica se uma chave existe no localStorage
   * 
   * @param key - Chave a verificar
   * @returns true se a chave existe
   */
  hasItem(key: string): boolean {
    return this.getItem(key) !== null;
  }

  /**
   * Obtém todas as chaves do localStorage
   * 
   * @returns Array com todas as chaves
   */
  getAllKeys(): string[] {
    if (isPlatformBrowser(this.platformId)) {
      return Object.keys(localStorage);
    }
    return [];
  }

  /**
   * Obtém o tamanho aproximado do localStorage em bytes
   * 
   * @returns Tamanho aproximado em bytes
   */
  getStorageSize(): number {
    if (isPlatformBrowser(this.platformId)) {
      let size = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          size += localStorage[key].length + key.length;
        }
      }
      return size;
    }
    return 0;
  }
}
