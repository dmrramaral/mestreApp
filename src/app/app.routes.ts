import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
      path: 'home',
      loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    },
    {
      path: 'itens',
      loadComponent: () => import('./features/itens/itens.component').then(m => m.ItensComponent)
    },
    {
      path: 'iniciativa',
      loadComponent: () => import('./features/iniciativa/iniciativa.component').then(m => m.IniciativaComponent)
    },
    {
      path: 'mercado',
      loadComponent: () => import('./features/mercado/mercado.component').then(m => m.MercadoComponent)
    },
    {
      path: 'monstros',
      loadComponent: () => import('./features/monstros/monstros.component').then(m => m.MonstrosComponent)
    },
    {
      path: 'ficha-jogador',
      loadComponent: () => import('./features/ficha-jogador/ficha-jogador.component').then(m => m.FichaJogadorComponent)
    },
    {
      path: 'cyberpunk-catalogo',
      pathMatch: 'full',
      canActivate: [authGuard],
      loadComponent: () => import('./features/cyberpunk/catalogo/cyberpunk-catalog-admin.component').then(m => m.CyberpunkCatalogAdminComponent)
    },
    {
      path: 'cyberpunk-catalogo/dashboard',
      data: { pagina: 'dashboard' },
      canActivate: [authGuard],
      loadComponent: () => import('./features/cyberpunk/catalogo/cyberpunk-catalog-admin.component').then(m => m.CyberpunkCatalogAdminComponent)
    },
    {
      path: 'cyberpunk-catalogo/classes',
      data: { pagina: 'classes' },
      canActivate: [authGuard],
      loadComponent: () => import('./features/cyberpunk/catalogo/cyberpunk-catalog-admin.component').then(m => m.CyberpunkCatalogAdminComponent)
    },
    {
      path: 'cyberpunk-catalogo/conteudo',
      data: { pagina: 'conteudo' },
      canActivate: [authGuard],
      loadComponent: () => import('./features/cyberpunk/catalogo/cyberpunk-catalog-admin.component').then(m => m.CyberpunkCatalogAdminComponent)
    },
    {
      path: 'cyberpunk-catalogo/loja',
      data: { pagina: 'loja' },
      canActivate: [authGuard],
      loadComponent: () => import('./features/cyberpunk/catalogo/cyberpunk-catalog-admin.component').then(m => m.CyberpunkCatalogAdminComponent)
    },
    {
      path: 'cyberpunk-catalogo/acessorios',
      data: { pagina: 'acessorios' },
      canActivate: [authGuard],
      loadComponent: () => import('./features/cyberpunk/catalogo/cyberpunk-catalog-admin.component').then(m => m.CyberpunkCatalogAdminComponent)
    },
    {
      path: 'cyberpunk-loja',
      loadComponent: () => import('./features/cyberpunk/loja/cyberpunk-loja.component').then(m => m.CyberpunkLojaComponent)
    },
    {
      path: 'auth',
      loadComponent: () => import('./features/auth/auth.component').then(m => m.AuthComponent)
    },
    {
      path: 'perfil',
      canActivate: [authGuard],
      loadComponent: () => import('./features/perfil/perfil.component').then(m => m.PerfilComponent)
    },
    {path: '**', redirectTo: 'home'},
];
