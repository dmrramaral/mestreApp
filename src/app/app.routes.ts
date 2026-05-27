import { Routes } from '@angular/router';

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
      loadComponent: () => import('./features/cyberpunk/catalogo/cyberpunk-catalog-admin.component').then(m => m.CyberpunkCatalogAdminComponent)
    },
    {
      path: 'cyberpunk-catalogo/dashboard',
      data: { pagina: 'dashboard' },
      loadComponent: () => import('./features/cyberpunk/catalogo/cyberpunk-catalog-admin.component').then(m => m.CyberpunkCatalogAdminComponent)
    },
    {
      path: 'cyberpunk-catalogo/classes',
      data: { pagina: 'classes' },
      loadComponent: () => import('./features/cyberpunk/catalogo/cyberpunk-catalog-admin.component').then(m => m.CyberpunkCatalogAdminComponent)
    },
    {
      path: 'cyberpunk-catalogo/conteudo',
      data: { pagina: 'conteudo' },
      loadComponent: () => import('./features/cyberpunk/catalogo/cyberpunk-catalog-admin.component').then(m => m.CyberpunkCatalogAdminComponent)
    },
    {
      path: 'cyberpunk-catalogo/loja',
      data: { pagina: 'loja' },
      loadComponent: () => import('./features/cyberpunk/catalogo/cyberpunk-catalog-admin.component').then(m => m.CyberpunkCatalogAdminComponent)
    },
    {
      path: 'cyberpunk-loja',
      loadComponent: () => import('./features/cyberpunk/loja/cyberpunk-loja.component').then(m => m.CyberpunkLojaComponent)
    },
    {path: '**', redirectTo: 'home'},
];
