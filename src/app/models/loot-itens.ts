import { FaixaResultado } from "./faixa-resultado";

export interface LootItens {
    id?: number;
    tipo: string;
    nome: string;
    descricao?: string;
    faixa?: FaixaResultado; 
   
}