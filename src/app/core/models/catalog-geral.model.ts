export interface PericiaCatalog {
  id?: string;
  slug?: string;
  nome: string;
  descricao?: string;
  sistemas?: string[];
}

export interface AtributoCatalog {
  id?: string;
  slug?: string;
  nome: string;
  abreviacao?: string;
  descricao?: string;
  sistemas?: string[];
  pericias: PericiaCatalog[];
}

export interface AtributosCatalogResponse {
  version: number;
  items: AtributoCatalog[];
}
