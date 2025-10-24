import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
      path: 'home', 
      loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
      path: 'itens', 
      loadComponent: () => import('./home/itens/itens.component').then(m => m.ItensComponent)
    },
    {
      path: 'iniciativa', 
      loadComponent: () => import('./home/iniciativa/iniciativa.component').then(m => m.IniciativaComponent)
    },
    {
      path: 'mercado', 
      loadComponent: () => import('./home/mercado/mercado.component').then(m => m.MercadoComponent)
    },
    {
      path: 'monstros', 
      loadComponent: () => import('./home/monstros/monstros.component').then(m => m.MonstrosComponent)
    },
    {
      path: 'ficha-jogador', 
      loadComponent: () => import('./home/fichaJogador/ficha-jogador/ficha-jogador.component').then(m => m.FichaJogadorComponent)
    },
    {path: '**', redirectTo: 'home'},
];
