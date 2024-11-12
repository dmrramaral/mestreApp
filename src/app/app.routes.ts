import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItensComponent } from './home/itens/itens.component';
import { IniciativaComponent } from './home/iniciativa/iniciativa.component';
import path from 'path';
import { MercadoComponent } from './home/mercado/mercado.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'itens', component: ItensComponent},
    {path: 'iniciativa', component: IniciativaComponent},
    {path: 'mercado', component: MercadoComponent} ,  
    {path: '**', redirectTo: 'home'},
];
