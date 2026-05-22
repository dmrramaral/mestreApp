import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CyberpunkCatalog } from '../models/cyberpunk-catalog.model';

@Injectable({ providedIn: 'root' })
export class CyberpunkCatalogService {
  private readonly baseUrl = `${environment.backendSyncUrl}/api/catalog/cyberpunk`;

  constructor(private http: HttpClient) {}

  getCatalog(): Observable<CyberpunkCatalog> {
    return this.http.get<CyberpunkCatalog>(this.baseUrl);
  }

  updateCatalog(catalog: CyberpunkCatalog): Observable<CyberpunkCatalog> {
    return this.http.put<CyberpunkCatalog>(this.baseUrl, catalog);
  }
}
