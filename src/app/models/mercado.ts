export interface Item {
    nome: string;
    preco: number;
    moeda: string;
    beneficios?: string;
}

export interface Mercado {
    armas: Item[];
    comidas: Item[];
    bebidas: Item[];
    armaduras: Item[];
    aneis: Item[];
    amuletos: Item[];
}