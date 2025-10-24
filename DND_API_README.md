# D&D 5e API Integration

Este projeto agora inclui integração com a [D&D 5e API 2024](https://www.dnd5eapi.co/api/2024/) para auxiliar na criação de personagens.

## Serviço DndApiService

O `DndApiService` fornece acesso aos seguintes endpoints da API D&D 5e:

### Endpoints Disponíveis

1. **Ability Scores (Atributos)**
   - `getAbilityScores()` - Lista todos os atributos (STR, DEX, CON, INT, WIS, CHA)
   - `getAbilityScoreDetails(index)` - Detalhes de um atributo específico

2. **Alignments (Alinhamentos)**
   - `getAlignments()` - Lista todos os alinhamentos
   - `getAlignmentDetails(index)` - Detalhes de um alinhamento específico

3. **Conditions (Condições)**
   - `getConditions()` - Lista todas as condições (Blinded, Charmed, etc.)
   - `getConditionDetails(index)` - Detalhes de uma condição específica

4. **Damage Types (Tipos de Dano)**
   - `getDamageTypes()` - Lista todos os tipos de dano (Fire, Cold, etc.)
   - `getDamageTypeDetails(index)` - Detalhes de um tipo de dano específico

5. **Equipment (Equipamento)**
   - `getEquipment()` - Lista todos os equipamentos
   - `getEquipmentDetails(index)` - Detalhes de um equipamento específico

6. **Equipment Categories (Categorias de Equipamento)**
   - `getEquipmentCategories()` - Lista todas as categorias de equipamento
   - `getEquipmentCategoryDetails(index)` - Detalhes de uma categoria específica

7. **Languages (Idiomas)**
   - `getLanguages()` - Lista todos os idiomas
   - `getLanguageDetails(index)` - Detalhes de um idioma específico

8. **Magic Schools (Escolas de Magia)**
   - `getMagicSchools()` - Lista todas as escolas de magia
   - `getMagicSchoolDetails(index)` - Detalhes de uma escola específica

9. **Skills (Perícias)**
   - `getSkills()` - Lista todas as perícias
   - `getSkillDetails(index)` - Detalhes de uma perícia específica

10. **Weapon Mastery Properties (Propriedades de Maestria de Arma)**
    - `getWeaponMasteryProperties()` - Lista todas as propriedades
    - `getWeaponMasteryPropertyDetails(index)` - Detalhes de uma propriedade específica

11. **Weapon Properties (Propriedades de Arma)**
    - `getWeaponProperties()` - Lista todas as propriedades de arma
    - `getWeaponPropertyDetails(index)` - Detalhes de uma propriedade específica

### Exemplo de Uso

```typescript
import { Component, OnInit } from '@angular/core';
import { DndApiService } from './core/services/dnd-api.service';
import { ApiResourceList } from './core/models/dnd-api.model';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html'
})
export class MyComponent implements OnInit {
  abilityScores?: ApiResourceList;
  
  constructor(private dndApiService: DndApiService) {}
  
  ngOnInit(): void {
    // Buscar ability scores
    this.dndApiService.getAbilityScores().subscribe({
      next: (data) => {
        this.abilityScores = data;
        console.log('Ability Scores:', data);
      },
      error: (error) => {
        console.error('Erro ao carregar ability scores:', error);
      }
    });
    
    // Buscar detalhes de um ability score específico
    this.dndApiService.getAbilityScoreDetails('str').subscribe({
      next: (data) => {
        console.log('Strength details:', data);
      }
    });
  }
}
```

### Exemplo Prático

Para ver um exemplo completo de uso do DndApiService, acesse a rota `/dnd-api-example` na aplicação.

Este componente de exemplo demonstra como:
- Buscar dados de todos os endpoints
- Exibir os dados em uma interface
- Tratar erros e estados de loading

### Cache

O serviço utiliza cache automático (via `shareReplay`) para evitar requisições duplicadas:
- Cada endpoint de lista é cacheado na primeira requisição
- Chamadas subsequentes retornam os dados em cache
- Para limpar o cache, use `dndApiService.clearCache()`

### Modelos TypeScript

Interfaces TypeScript estão disponíveis em `src/app/core/models/dnd-api.model.ts`:

```typescript
import { ApiResourceList, AbilityScore, Alignment, Language } from './core/models/dnd-api.model';
```

### Constantes

URLs da API estão definidas em `src/app/core/constants/rpg.constants.ts`:

```typescript
export const API_URLS = {
  DND_API_2024: 'https://www.dnd5eapi.co/api/2024',
  DND_ABILITY_SCORES: 'https://www.dnd5eapi.co/api/2024/ability-scores',
  // ... outros endpoints
}
```

### Testes

O serviço inclui testes unitários completos em `dnd-api.service.spec.ts`.

Execute os testes com:
```bash
npm run test
```

### Integração com Ficha de Jogador

Para integrar com o componente de ficha de jogador, você pode:

1. Injetar o serviço no componente
2. Buscar dados da API conforme necessário
3. Usar os dados para popular campos do formulário ou oferecer opções ao usuário

Exemplo:
```typescript
// No componente de ficha de jogador
export class FichaJogadorComponent implements OnInit {
  languages?: ApiResourceList;
  
  constructor(
    private dndApiService: DndApiService,
    // ... outros serviços
  ) {}
  
  ngOnInit(): void {
    // Carregar idiomas disponíveis
    this.dndApiService.getLanguages().subscribe(data => {
      this.languages = data;
    });
  }
}
```

### Recursos da API

A API D&D 5e é gratuita e não requer autenticação. Para mais informações sobre os dados disponíveis, visite:
- [Documentação da API](https://www.dnd5eapi.co/docs/)
- [Repositório GitHub](https://github.com/5e-bits/5e-database)

### Notas

- A API retorna dados em inglês
- Todos os métodos retornam Observables do RxJS
- O serviço é fornecido como singleton (`providedIn: 'root'`)
- Compatível com Angular 18+
