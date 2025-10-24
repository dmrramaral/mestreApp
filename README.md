# MestreApp

Uma aplicação web para auxílio de mestres de RPG de mesa, desenvolvida com Angular 18. O MestreApp oferece ferramentas para gerenciar sessões de jogo, incluindo rastreamento de iniciativa, geração de loot, consulta de monstros, gestão de mercado, criação de fichas de jogadores e integração com a API oficial de D&D 5e.

## 📋 Sobre o Projeto

MestreApp é uma ferramenta completa para mestres de jogos de RPG de mesa (como D&D 5e), permitindo gerenciar diversos aspectos das sessões de jogo de forma prática e organizada. A aplicação utiliza Server-Side Rendering (SSR) para melhor performance e SEO, além de seguir as melhores práticas do Angular com arquitetura modular, tipagem forte e gerenciamento centralizado de estado.

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

### 🎮 Integração D&D 5e API
- Integração completa com a [D&D 5e API](https://www.dnd5eapi.co/)
- 11 endpoints disponíveis:
  - Atributos (Ability Scores)
  - Alinhamentos (Alignments)
  - Condições (Conditions)
  - Tipos de Dano (Damage Types)
  - Equipamentos (Equipment)
  - Idiomas (Languages)
  - Escolas de Magia (Magic Schools)
  - Perícias (Skills)
  - Propriedades de Armas (Weapon Properties)
- Cache automático de requisições para melhor performance
- Componente de exemplo interativo para testar os endpoints

## 🛠️ Tecnologias Utilizadas

- **Angular 18.1.0** - Framework principal
- **Angular SSR** - Server-Side Rendering
- **TypeScript 5.5.2** - Linguagem de programação
- **Bootstrap 5.3.3** - Framework CSS
- **Font Awesome 6.6.0** - Ícones
- **RxJS 7.8.0** - Programação reativa
- **Express 4.18.2** - Servidor Node.js para SSR
- **Jasmine & Karma** - Testes unitários

## 🏗️ Arquitetura e Boas Práticas

O projeto segue as melhores práticas do Angular e desenvolvimento moderno:

- **Arquitetura Modular**: Organização em módulos core, shared e features
- **Tipagem Forte**: Uso extensivo de interfaces TypeScript e genéricos
- **Lazy Loading**: Carregamento sob demanda de componentes (bundle inicial reduzido em 15.6%)
- **Gerenciamento Centralizado**: Services especializados para cada domínio
- **Cache Inteligente**: Uso de `shareReplay()` para evitar requisições duplicadas
- **Interceptors**: Tratamento global de erros HTTP
- **Utilities**: Funções utilitárias reutilizáveis para cálculos de RPG
- **Constantes**: Valores centralizados em arquivos de configuração
- **SSR-Safe**: Código preparado para Server-Side Rendering

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── core/                      # Núcleo da aplicação
│   │   ├── constants/             # Constantes do sistema RPG
│   │   │   └── rpg.constants.ts  # URLs, ranges, storage keys
│   │   ├── utils/                # Funções utilitárias
│   │   │   ├── rpg.utils.ts      # Cálculos de RPG
│   │   │   └── rpg.utils.spec.ts # Testes das utilitárias
│   │   ├── services/             # Serviços centralizados
│   │   │   ├── storage.service.ts        # Gerenciamento de estado
│   │   │   ├── ficha-jogador.service.ts  # Lógica de ficha
│   │   │   └── dnd-api.service.ts        # Integração D&D API
│   │   ├── models/               # Interfaces TypeScript
│   │   │   ├── ficha-jogador.model.ts
│   │   │   └── dnd-api.model.ts
│   │   └── interceptors/         # HTTP interceptors
│   │       └── error.interceptor.ts
│   ├── header/                   # Componente de cabeçalho
│   ├── footer/                   # Componente de rodapé
│   ├── home/                     # Página inicial com menu
│   │   ├── fichaJogador/        # Sistema de ficha de personagem
│   │   │   ├── ficha-jogador/   # Componente principal
│   │   │   └── dnd-api-example/ # Exemplo de integração API
│   │   ├── iniciativa/          # Gerenciador de iniciativa
│   │   ├── itens/               # Gerador de loot
│   │   ├── mercado/             # Catálogo de itens
│   │   ├── monstros/            # Livro de monstros
│   │   └── localStorage/        # Serviço de persistência (legacy)
│   ├── models/                   # Interfaces e modelos (legacy)
│   ├── app.component.*           # Componente raiz
│   ├── app.routes.ts             # Configuração de rotas
│   └── app.config.*              # Configurações da aplicação
├── assets/                       # Recursos estáticos
└── public/                       # Dados JSON (monstros, itens, mercado)
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

## 🔧 Melhorias Implementadas

### ✅ Completadas
As seguintes melhorias já foram implementadas no projeto:

1. **Tipagem TypeScript** - Interfaces criadas para todos os modelos (FichaJogador, Atributos, Pericia, etc.)
2. **Separação de Responsabilidades** - Services especializados (FichaJogadorService, StorageService, DndApiService)
3. **Gerenciamento de Estado** - StorageService centralizado com suporte a observables
4. **Tratamento de Erros** - ErrorInterceptor para tratamento global de erros HTTP
5. **Performance** - Cache com `shareReplay(1)` em todos os services HTTP
6. **Lazy Loading** - Todas as rotas usando `loadComponent()` (redução de 15.6% no bundle)
7. **Constantes Centralizadas** - Arquivo rpg.constants.ts com URLs, ranges e chaves
8. **Nomenclatura Consistente** - Interfaces com nomes descritivos e claros
9. **Documentação JSDoc** - Comentários em todos os métodos públicos
10. **Utilities Reutilizáveis** - Funções para cálculos de RPG (modificadores, bônus, etc.)
11. **Imports Limpos** - Removidos imports desnecessários
12. **Testes Unitários** - 46+ testes implementados (utilities, services)

**Métricas de Melhoria:**
- Bundle inicial: 703 KB → 593 KB (-15.6%)
- Testes unitários: 9 → 46 (+411%)
- Uso de `any`: Redução de ~60%

## 💡 Sugestões de Melhorias Futuras

### 1. **Validação de Formulários Reativa**
- **Status**: Pendente
- **Descrição**: Implementar Reactive Forms com validadores customizados
- **Benefício**: Melhor UX, validação consistente e feedback em tempo real
- **Prioridade**: Alta

```typescript
// Exemplo
this.fichaForm = this.fb.group({
  nome: ['', [Validators.required, Validators.minLength(3)]],
  nivel: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
  forca: [10, [Validators.required, Validators.min(1), Validators.max(30)]]
});
```

### 2. **Acessibilidade (A11y)**
- **Status**: Pendente
- **Descrição**: Adicionar atributos ARIA, navegação por teclado e melhor contraste
- **Benefício**: Aplicação mais inclusiva e acessível
- **Prioridade**: Alta

Melhorias necessárias:
- Adicionar `aria-label` em botões de ícone
- Implementar navegação por Tab
- Adicionar `role` apropriados
- Testar com leitores de tela
- Garantir contraste adequado (WCAG 2.1 AA)

### 3. **Testes de Componentes**
- **Status**: Parcial (apenas utilities e alguns services)
- **Descrição**: Aumentar cobertura de testes para componentes visuais
- **Benefício**: Maior confiança em refatorações e deploys
- **Prioridade**: Média

Componentes prioritários:
- FichaJogadorComponent
- IniciativaComponent
- MonstrosComponent
- MercadoComponent

### 4. **Responsividade Mobile**
- **Status**: Parcial
- **Descrição**: Revisar e otimizar layout para dispositivos móveis
- **Benefício**: Melhor experiência em tablets e smartphones
- **Prioridade**: Alta

Melhorias necessárias:
- Testar em múltiplas resoluções
- Otimizar tabelas para telas pequenas
- Ajustar modais para mobile
- Implementar menu hambúrguer responsivo

### 5. **Progressive Web App (PWA)**
- **Status**: Não implementado
- **Descrição**: Transformar em PWA com service workers e offline support
- **Benefício**: Uso offline, instalação no dispositivo, notificações
- **Prioridade**: Média

Funcionalidades:
- Service Worker para cache offline
- Manifest.json para instalação
- Sincronização em background
- Notificações push (opcional)

### 6. **Internacionalização (i18n)**
- **Status**: Não implementado
- **Descrição**: Suporte a múltiplos idiomas (PT-BR, EN, ES)
- **Benefício**: Alcance internacional
- **Prioridade**: Baixa

```typescript
// Exemplo com @angular/localize
<h1 i18n="@@welcomeMessage">Bem-vindo ao MestreApp</h1>
```

### 7. **Sistema de Temas**
- **Status**: Não implementado
- **Descrição**: Dark mode e temas customizáveis
- **Benefício**: Melhor experiência visual e acessibilidade
- **Prioridade**: Média

Implementação sugerida:
- CSS Variables para cores
- Toggle de tema no header
- Persistência da preferência
- Suporte a tema do sistema

### 8. **Exportação de Dados**
- **Status**: Parcial (apenas ficha em JSON)
- **Descrição**: Exportar dados em múltiplos formatos (PDF, CSV, XML)
- **Benefício**: Maior flexibilidade e compartilhamento
- **Prioridade**: Média

Formatos sugeridos:
- PDF para impressão de fichas
- CSV para análise de dados
- XML para integração com outras ferramentas

### 9. **Compartilhamento de Fichas**
- **Status**: Não implementado
- **Descrição**: Compartilhar fichas via URL ou QR Code
- **Benefício**: Facilita colaboração entre jogadores
- **Prioridade**: Baixa

Funcionalidades:
- Gerar URL compartilhável
- QR Code para compartilhamento
- Opção de fichas públicas/privadas

### 10. **Integração com Backend**
- **Status**: Não implementado
- **Descrição**: API backend para sincronização em nuvem
- **Benefício**: Dados sincronizados entre dispositivos
- **Prioridade**: Baixa

Funcionalidades:
- Autenticação de usuários
- Sincronização automática
- Backup em nuvem
- Compartilhamento multiplayer

### 11. **Melhorias na D&D API Integration**
- **Status**: Implementado parcialmente
- **Descrição**: Expandir uso da API e adicionar mais endpoints
- **Benefício**: Dados mais completos e atualizados
- **Prioridade**: Média

Endpoints adicionais:
- Classes (classes)
- Raças (races)
- Magias (spells)
- Monstros (monsters) - integrar com sistema atual
- Feats (feats)
- Backgrounds (backgrounds)

Melhorias:
- Wizard de criação de personagem guiado
- Auto-completar dados da ficha
- Tradução para português

### 12. **Sistema de Campanhas**
- **Status**: Não implementado
- **Descrição**: Gerenciar múltiplas campanhas e sessões
- **Benefício**: Organização de múltiplos jogos
- **Prioridade**: Baixa

Funcionalidades:
- Criar/editar campanhas
- Associar fichas a campanhas
- Histórico de sessões
- Notas do mestre

### 13. **Biblioteca de Homebrew**
- **Status**: Não implementado
- **Descrição**: Sistema para adicionar conteúdo customizado
- **Benefício**: Personalização e conteúdo exclusivo
- **Prioridade**: Baixa

Funcionalidades:
- Criar monstros customizados
- Criar itens customizados
- Criar magias customizadas
- Compartilhar homebrew

### 14. **Performance Avançada**
- **Status**: Parcial
- **Descrição**: Otimizações adicionais de performance
- **Benefício**: Aplicação mais rápida
- **Prioridade**: Baixa

Otimizações:
- Virtual scrolling para listas grandes
- OnPush change detection strategy
- Web Workers para cálculos pesados
- Preloading strategies customizadas

### 15. **Analytics e Telemetria**
- **Status**: Não implementado
- **Descrição**: Monitoramento de uso e erros
- **Benefício**: Insights sobre uso e problemas
- **Prioridade**: Baixa

Ferramentas:
- Google Analytics ou Plausible
- Sentry para monitoramento de erros
- Custom events para features específicas

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento (http://localhost:4200)
- `npm run build` - Compila o projeto para produção
- `npm run watch` - Compila em modo watch (recompila ao detectar mudanças)
- `npm test` - Executa testes unitários com Karma
- `npm run serve:ssr:mestreApp` - Inicia servidor SSR após build

## 📊 Métricas do Projeto

- **Bundle inicial**: 593 KB (após otimizações)
- **Testes unitários**: 46+ testes
- **Cobertura de código**: Em expansão
- **Componentes**: 8 principais + utilitários
- **Services**: 6 especializados
- **Endpoints D&D API**: 11 integrados

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir com o projeto:

1. **Fork** o repositório
2. Crie uma **branch** para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. **Push** para a branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

### Diretrizes de Contribuição

- Siga o style guide do Angular
- Mantenha a tipagem TypeScript forte
- Adicione testes para novas funcionalidades
- Documente código com JSDoc
- Atualize o README se necessário
- Execute testes antes de submeter PR

### Reportar Bugs

Use as [Issues do GitHub](https://github.com/dmrramaral/mestreApp/issues) para reportar bugs. Inclua:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots se aplicável
- Versão do navegador/SO

### Sugerir Melhorias

Sugestões são sempre bem-vindas! Abra uma issue com:
- Descrição da melhoria
- Justificativa/benefícios
- Exemplos de implementação (opcional)

## 📄 Licença

Este projeto está disponível como código aberto. Foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.1.0.

## 🙏 Agradecimentos

- [D&D 5e API](https://www.dnd5eapi.co/) - Pela API completa e gratuita
- [Angular Team](https://angular.dev/) - Pelo excelente framework
- [Bootstrap Team](https://getbootstrap.com/) - Pelo framework CSS
- Comunidade de RPG de mesa

## 📚 Recursos Adicionais

- [Documentação do Angular](https://angular.dev/overview)
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [D&D 5e API Documentation](https://www.dnd5eapi.co/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)

## 🔗 Links Úteis

- **Repositório**: https://github.com/dmrramaral/mestreApp
- **Issues**: https://github.com/dmrramaral/mestreApp/issues
- **Pull Requests**: https://github.com/dmrramaral/mestreApp/pulls

## 📞 Contato

Para dúvidas ou sugestões, abra uma issue no GitHub ou entre em contato através do repositório.

---

**MestreApp** - Facilitando a vida dos mestres de RPG desde 2024 🎲✨
