import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface RegistroSync {
  id: string;
  payload: any;
  updatedAt: string;
  deleted?: boolean;
  version?: number;
}

interface PullResponse {
  changes: RegistroSync[];
  serverTimestamp: string;
}

interface PushResponse {
  applied: RegistroSync[];
  conflicts: Array<{ incoming: RegistroSync; server: RegistroSync; reason: string }>;
  serverTimestamp: string;
}

interface CharactersResponse {
  records: RegistroSync[];
}

@Injectable({
  providedIn: 'root'
})
export class SyncBackendService {
  private readonly baseUrl = environment.backendSyncUrl.replace(/\/$/, '');

  constructor(private http: HttpClient) {}

  pullMudancas(userId: string, since?: string): Observable<PullResponse> {
    return this.http.post<PullResponse>(`${this.baseUrl}/api/sync/pull`, {
      userId,
      since
    });
  }

  pushMudancas(userId: string, records: RegistroSync[]): Observable<PushResponse> {
    return this.http.post<PushResponse>(`${this.baseUrl}/api/sync/push`, {
      userId,
      records
    });
  }

  listarFichas(userId: string): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(`${this.baseUrl}/api/characters`, {
      params: { userId }
    });
  }
}
