export interface Usuario {
  id: string;
  email: string;
  nome: string;
  avatar?: string | null;
  googleId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  email: string;
  senha: string;
  nome: string;
}

export interface GoogleLoginRequest {
  credential: string;
}

export interface AuthResponse {
  token: string;
  user: Usuario;
}
