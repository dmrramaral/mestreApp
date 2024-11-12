export interface Item {
    nome: string;
    preco: number;
    moeda: string;
}

export interface Mercado {
    armas: Item[];
    comidas: Item[];
    bebidas: Item[];
    armaduras: Item[];
}