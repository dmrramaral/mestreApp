import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    AcessorioArmaCatalog,
    CyberpunkAntecedenteCatalog,
    CyberpunkCatalog,
    CyberpunkClassCatalog,
    CyberpunkStoreCatalog,
    CyberpunkStoreItem,
    CyberpunkTalentCatalog
} from '../models/cyberpunk-catalog.model';

export interface CyberpunkSubclassEntity {
  id?: string;
  slug?: string;
  source?: 'constants' | 'backend' | 'manual';
  sourceRef?: string;
  updatedAt?: string;
  nome: string;
  descricao: string;
  classId: string;
  classNome?: string;
  progressao: Array<{ id?: string; slug?: string; source?: 'constants' | 'backend' | 'manual'; sourceRef?: string; updatedAt?: string; nivel: number; habilidade: string; descricao: string }>;
}

@Injectable({ providedIn: 'root' })
export class CyberpunkCatalogService {
  private readonly baseUrl = `${environment.backendSyncUrl}/api/catalog/cyberpunk`;
  private readonly entitiesBaseUrl = `${environment.backendSyncUrl}/api/catalog/entities`;

  constructor(private http: HttpClient) {}

  getCatalog(): Observable<CyberpunkCatalog> {
    return this.http.get<CyberpunkCatalog>(this.baseUrl);
  }

  updateCatalog(catalog: CyberpunkCatalog): Observable<CyberpunkCatalog> {
    return this.http.put<CyberpunkCatalog>(this.baseUrl, catalog);
  }

  getClassesEntity(): Observable<{ system: string; version: number; seedVersion?: string; items: CyberpunkClassCatalog[] }> {
    return this.http.get<{ system: string; version: number; seedVersion?: string; items: CyberpunkClassCatalog[] }>(`${this.entitiesBaseUrl}/classes`);
  }

  updateClassesEntity(items: CyberpunkClassCatalog[]): Observable<{ system: string; version: number; seedVersion?: string; items: CyberpunkClassCatalog[] }> {
    return this.http.put<{ system: string; version: number; seedVersion?: string; items: CyberpunkClassCatalog[] }>(`${this.entitiesBaseUrl}/classes`, { items });
  }

  getSubclassesEntity(): Observable<{ system: string; version: number; seedVersion?: string; items: CyberpunkSubclassEntity[] }> {
    return this.http.get<{ system: string; version: number; seedVersion?: string; items: CyberpunkSubclassEntity[] }>(`${this.entitiesBaseUrl}/subclasses`);
  }

  updateSubclassesEntity(items: CyberpunkSubclassEntity[]): Observable<{ system: string; version: number; seedVersion?: string; items: CyberpunkSubclassEntity[] }> {
    return this.http.put<{ system: string; version: number; seedVersion?: string; items: CyberpunkSubclassEntity[] }>(`${this.entitiesBaseUrl}/subclasses`, { items });
  }

  getAntecedentesEntity(): Observable<{ system: string; version: number; seedVersion?: string; items: CyberpunkAntecedenteCatalog[] }> {
    return this.http.get<{ system: string; version: number; seedVersion?: string; items: CyberpunkAntecedenteCatalog[] }>(`${this.entitiesBaseUrl}/antecedentes`);
  }

  updateAntecedentesEntity(items: CyberpunkAntecedenteCatalog[]): Observable<{ system: string; version: number; seedVersion?: string; items: CyberpunkAntecedenteCatalog[] }> {
    return this.http.put<{ system: string; version: number; seedVersion?: string; items: CyberpunkAntecedenteCatalog[] }>(`${this.entitiesBaseUrl}/antecedentes`, { items });
  }

  getTalentosEntity(): Observable<{ system: string; version: number; seedVersion?: string; items: CyberpunkTalentCatalog[] }> {
    return this.http.get<{ system: string; version: number; seedVersion?: string; items: CyberpunkTalentCatalog[] }>(`${this.entitiesBaseUrl}/talentos`);
  }

  updateTalentosEntity(items: CyberpunkTalentCatalog[]): Observable<{ system: string; version: number; seedVersion?: string; items: CyberpunkTalentCatalog[] }> {
    return this.http.put<{ system: string; version: number; seedVersion?: string; items: CyberpunkTalentCatalog[] }>(`${this.entitiesBaseUrl}/talentos`, { items });
  }

  getHacksEntity(): Observable<{ system: string; version: number; seedVersion?: string; items: CyberpunkStoreItem[] }> {
    return this.http.get<{ system: string; version: number; seedVersion?: string; items: CyberpunkStoreItem[] }>(`${this.entitiesBaseUrl}/hacks`);
  }

  updateHacksEntity(items: CyberpunkStoreItem[]): Observable<{ system: string; version: number; seedVersion?: string; items: CyberpunkStoreItem[] }> {
    return this.http.put<{ system: string; version: number; seedVersion?: string; items: CyberpunkStoreItem[] }>(`${this.entitiesBaseUrl}/hacks`, { items });
  }

  getLojaEntity(): Observable<{ system: string; version: number; seedVersion?: string; loja: Omit<CyberpunkStoreCatalog, 'hacksRapidos'> }> {
    return this.http.get<{ system: string; version: number; seedVersion?: string; loja: Omit<CyberpunkStoreCatalog, 'hacksRapidos'> }>(`${this.entitiesBaseUrl}/loja`);
  }

  updateLojaEntity(loja: Omit<CyberpunkStoreCatalog, 'hacksRapidos'>): Observable<{ system: string; version: number; seedVersion?: string; loja: Omit<CyberpunkStoreCatalog, 'hacksRapidos'> }> {
    return this.http.put<{ system: string; version: number; seedVersion?: string; loja: Omit<CyberpunkStoreCatalog, 'hacksRapidos'> }>(`${this.entitiesBaseUrl}/loja`, { loja });
  }

  getAcessoriosArmasEntity(): Observable<{ system: string; version: number; seedVersion?: string; items: AcessorioArmaCatalog[] }> {
    return this.http.get<{ system: string; version: number; seedVersion?: string; items: AcessorioArmaCatalog[] }>(`${this.entitiesBaseUrl}/acessorios-armas`);
  }

  updateAcessoriosArmasEntity(items: AcessorioArmaCatalog[]): Observable<{ system: string; version: number; seedVersion?: string; items: AcessorioArmaCatalog[] }> {
    return this.http.put<{ system: string; version: number; seedVersion?: string; items: AcessorioArmaCatalog[] }>(`${this.entitiesBaseUrl}/acessorios-armas`, { items });
  }
}
