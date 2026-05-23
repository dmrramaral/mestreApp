import { FaixaResultado } from "./faixa-resultado.model";

export interface LootItens {
    id?: number;
    tipo: string;
    nome: string;
    descricao?: string;
    faixa?: FaixaResultado;

}
