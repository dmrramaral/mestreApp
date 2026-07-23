export type ModoSessao = 'convidado' | 'google';

export interface SessaoJogador {
  modo: ModoSessao;
  usuarioId: string;
  email?: string;
  ultimoLogin: string;
}

export interface FichaContaResumo {
  id: string;
  nome: string;
  updatedAt: string;
  payload: any;
}
