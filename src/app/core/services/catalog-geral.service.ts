import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AtributoCatalog, AtributosCatalogResponse } from '../models/catalog-geral.model';

@Injectable({ providedIn: 'root' })
export class CatalogGeralService {
  private readonly baseUrl = `${environment.backendSyncUrl}/api/catalog/geral`;

  constructor(private http: HttpClient) {}

  getAtributos(): Observable<AtributosCatalogResponse> {
    return this.http.get<AtributosCatalogResponse>(`${this.baseUrl}/atributos`);
  }

  updateAtributos(items: AtributoCatalog[]): Observable<AtributosCatalogResponse> {
    return this.http.put<AtributosCatalogResponse>(`${this.baseUrl}/atributos`, { items });
  }
}
