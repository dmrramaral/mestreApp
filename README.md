# MestreApp

Uma aplicação web para auxílio de mestres de RPG de mesa, desenvolvida com Angular 18. O MestreApp oferece ferramentas para gerenciar sessões de jogo, incluindo rastreamento de iniciativa, geração de loot, consulta de monstros, gestão de mercado e criação de fichas de jogadores.

## 📋 Sobre o Projeto

MestreApp é uma ferramenta completa para mestres de jogos de RPG de mesa (como D&D), permitindo gerenciar diversos aspectos das sessões de jogo de forma prática e organizada. A aplicação utiliza Server-Side Rendering (SSR) para melhor performance e SEO.

## ✨ Funcionalidades Principais

### 🎲 Sistema de Iniciativa
- Adicione jogadores e NPCs com suas respectivas iniciativas
- Ordenação automática por valor de iniciativa
- Rastreamento de pontos de vida em tempo real
- Persistência local dos dados

### ⚔️ Livro de Monstros
- Consulta de monstros com dados detalhados
- Filtros avançados por:
  - Nome
  - Tipo (type)
  - Tamanho (size)
  - Alinhamento (alignment)
  - XP
- Integração com dados de D&D

### 🎁 Sistema de Loot/Itens
- Geração automática de itens baseada em rolagens
- Sistema de raridade:
  - Baixa (2-9)
  - Média (10-15)
  - Alta (16-22)
  - Lendária (23+)
  - Crítico
- Diferentes tipos de objetos (armas, armaduras, etc.)

### 🏪 Mercado
- Catálogo de itens disponíveis para compra
- Integração com dados de D&D
- Filtros por categoria e subcategoria
- Listagem de:
  - Armas
  - Armaduras
  - Comidas e bebidas
  - Anéis e amuletos

### 📄 Ficha de Jogador
- Criação e edição completa de fichas de personagem
- Campos para:
  - Informações básicas (nome, raça, classe, nível)
  - Atributos (Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma, Sorte)
  - Cálculo automático de modificadores
  - Sistema de perícias completo
  - Gestão de equipamentos por categoria
  - Inventário (mochila)
  - Magias
  - Talentos
  - Status (fome, sede, cansaço, calor, frio, sono)
- Exportação/importação de fichas em JSON
- Persistência automática no LocalStorage
- Upload de avatar customizado

## 🛠️ Tecnologias Utilizadas

- **Angular 18.1.0** - Framework principal
- **Angular SSR** - Server-Side Rendering
- **TypeScript 5.5.2** - Linguagem de programação
- **Bootstrap 5.3.3** - Framework CSS
- **Font Awesome 6.6.0** - Ícones
- **RxJS 7.8.0** - Programação reativa
- **Express 4.18.2** - Servidor Node.js para SSR
- **Jasmine & Karma** - Testes unitários

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── header/              # Componente de cabeçalho
│   ├── footer/              # Componente de rodapé
│   ├── home/                # Página inicial com menu
│   │   ├── fichaJogador/   # Sistema de ficha de personagem
│   │   ├── iniciativa/     # Gerenciador de iniciativa
│   │   ├── itens/          # Gerador de loot
│   │   ├── mercado/        # Catálogo de itens
│   │   ├── monstros/       # Livro de monstros
│   │   └── localStorage/   # Serviço de persistência
│   ├── models/              # Interfaces e modelos de dados
│   ├── app.component.*      # Componente raiz
│   ├── app.routes.ts        # Configuração de rotas
│   └── app.config.*         # Configurações da aplicação
├── assets/                  # Recursos estáticos
└── public/                  # Dados JSON (monstros, itens, mercado)
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/dmrramaral/mestreApp.git

# Entre no diretório
cd mestreApp

# Instale as dependências
npm install
```

### Servidor de Desenvolvimento

Execute `npm start` ou `ng serve` para iniciar o servidor de desenvolvimento. Navegue para `http://localhost:4200/`. A aplicação recarregará automaticamente quando você modificar os arquivos.

```bash
npm start
```

### Build

Execute `npm run build` para compilar o projeto. Os arquivos compilados serão armazenados no diretório `dist/`.

```bash
npm run build
```

### Build de Produção

```bash
ng build --configuration production
```

### Servidor SSR

Para executar o servidor SSR após o build:

```bash
npm run serve:ssr:mestreApp
```

### Testes

Execute `npm test` para executar os testes unitários via [Karma](https://karma-runner.github.io).

```bash
npm test
```

## 🔧 Possíveis Melhorias de Código

### 1. **Tipagem TypeScript**
- **Problema**: Uso excessivo de `any` em vários componentes (ex: `monstros: any`, `jogador: any`)
- **Solução**: Criar interfaces tipadas para todos os modelos de dados
- **Benefício**: Melhor autocomplete, detecção de erros em tempo de desenvolvimento

```typescript
// Exemplo de melhoria
interface Monstro {
  name: string;
  type: string;
  size: string;
  alignment: string;
  xp: number;
  // ... outros campos
}
```

### 2. **Separação de Responsabilidades**
- **Problema**: Componentes com muita lógica de negócio (ex: `FichaJogadorComponent` com 522 linhas)
- **Solução**: Extrair lógica para services e criar componentes menores
- **Benefício**: Código mais testável e manutenível

### 3. **Duplicação de Código**
- **Problema**: Lógica duplicada em vários lugares (ex: cálculo de modificadores, estrutura de perícias)
- **Solução**: Criar funções utilitárias e constantes compartilhadas
- **Benefício**: Facilita manutenção e reduz bugs

### 4. **Gerenciamento de Estado**
- **Problema**: Uso direto de LocalStorage nos componentes
- **Solução**: Implementar um serviço centralizado de estado ou usar NgRx/Akita
- **Benefício**: Estado mais previsível e debugável

### 5. **Validação de Formulários**
- **Problema**: Falta de validação reativa em formulários
- **Solução**: Implementar Reactive Forms com validadores
- **Benefício**: Melhor UX e validação consistente

### 6. **Tratamento de Erros**
- **Problema**: Falta de tratamento de erros nas chamadas HTTP
- **Solução**: Implementar interceptors e tratamento global de erros
- **Benefício**: Melhor experiência do usuário em casos de erro

### 7. **Performance**
- **Problema**: Re-subscrição desnecessária em alguns observables
- **Solução**: Usar `shareReplay()`, `take(1)` ou async pipe no template
- **Benefício**: Redução de requisições HTTP desnecessárias

### 8. **Acessibilidade**
- **Problema**: Falta de atributos ARIA e navegação por teclado
- **Solução**: Adicionar atributos semânticos e suporte a navegação
- **Benefício**: Aplicação mais inclusiva

### 9. **Imports Não Utilizados**
- **Problema**: Import de `BrowserModule` em componentes standalone (ex: `ItensComponent`)
- **Solução**: Remover imports desnecessários
- **Benefício**: Bundle menor e código mais limpo

### 10. **Testes**
- **Problema**: Testes unitários não implementados ou básicos
- **Solução**: Aumentar cobertura de testes para componentes e services
- **Benefício**: Maior confiança em refatorações e deploys

### 11. **Constantes e Configuração**
- **Problema**: Valores hardcoded espalhados pelo código (URLs, faixas de valores)
- **Solução**: Centralizar em arquivos de configuração/constantes
- **Benefício**: Facilita manutenção e configuração por ambiente

### 12. **Lazy Loading**
- **Problema**: Todas as rotas carregadas no início
- **Solução**: Implementar lazy loading para rotas principais
- **Benefício**: Redução do bundle inicial e melhor performance

### 13. **Nomenclatura**
- **Problema**: Nomes inconsistentes (ex: `pva` não é claro)
- **Solução**: Usar nomes descritivos e consistentes
- **Benefício**: Código mais legível

### 14. **Responsividade**
- **Problema**: Alguns componentes podem ter problemas em telas pequenas
- **Solução**: Revisar e testar em diferentes resoluções
- **Benefício**: Melhor experiência mobile

### 15. **Documentação de Código**
- **Problema**: Falta de comentários JSDoc em funções complexas
- **Solução**: Adicionar documentação para métodos públicos
- **Benefício**: Facilita onboarding de novos desenvolvedores

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto
- `npm run watch` - Compila em modo watch
- `npm test` - Executa testes unitários
- `npm run serve:ssr:mestreApp` - Inicia servidor SSR

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.1.0.

## 📚 Recursos Adicionais

Para mais informações sobre Angular CLI, use `ng help` ou consulte a [Documentação Oficial do Angular](https://angular.dev/tools/cli).
