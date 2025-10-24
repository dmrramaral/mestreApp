# Feature: Card-Based Class and Race Selection with Trait Display

## Overview
This feature enhances the player character sheet by replacing dropdown selectors for classes and races with interactive card-based selection modals. It automatically extracts and displays class and race traits on the main character sheet.

## Changes Made

### 1. Model Updates (`src/app/core/models/ficha-jogador.model.ts`)
- Added new `Traco` interface to represent class and race traits:
  ```typescript
  export interface Traco {
    nome: string;
    descricao?: string;
    origem: 'classe' | 'raca';
  }
  ```
- Added `tracos?: Traco[]` property to `FichaJogador` interface

### 2. Component Updates (`src/app/home/fichaJogador/ficha-jogador/ficha-jogador.component.ts`)

#### New Methods:
- `selectClass(classRef: ApiReference)`: Selects a class and automatically extracts its traits
  - Extracts proficiencies, saving throws, hit die, and spellcasting information
  - Stores traits with `origem: 'classe'`
  
- `selectRace(raceRef: ApiReference)`: Selects a race and automatically extracts its traits
  - Extracts speed, ability bonuses, size, languages, and racial traits
  - Stores traits with `origem: 'raca'`

- `removerTraco(traco: any)`: Removes a specific trait

- `getTracosClasse()`: Returns class traits for display

- `getTracosRaca()`: Returns race traits for display

- `hasTracosClasse()`: Checks if class traits exist

- `hasTracosRaca()`: Checks if race traits exist

#### Data Initialization:
- Added `tracos: []` to the initial `jogador` object

### 3. Template Updates (`src/app/home/fichaJogador/ficha-jogador/ficha-jogador.component.html`)

#### Edit Modal Changes:
- Replaced dropdown selectors with card-based selection buttons
- Shows current selection as badges
- Buttons open new selection modals

#### New Modals:
- **Class Selection Modal** (`#classSelectionModal`): 
  - Displays all available classes as interactive cards
  - Shows selected class with visual feedback
  - Clicking a card selects the class and loads its traits

- **Race Selection Modal** (`#raceSelectionModal`):
  - Displays all available races as interactive cards
  - Shows selected race with visual feedback
  - Clicking a card selects the race and loads its traits

#### New Section Button:
- Added "Traços" button to the collapsible sections toolbar

#### New Traços Section:
- Displays class traits under "Traços de Classe" heading
- Displays race traits under "Traços Raciais" heading
- Shows appropriate icons for each trait type
- Includes delete buttons for individual traits
- Shows helpful message when no traits exist

### 4. Style Updates (`src/app/home/fichaJogador/ficha-jogador/ficha-jogador.component.scss`)

#### New Styles:
- `.selection-card`: Interactive card styling with hover effects
  - Transforms on hover for better UX
  - Shows selected state with green border
  - Smooth transitions

- `.current-selection`: Badge display for selected class/race

- `.trait-list` and `.trait-item`: Trait display styling
  - Clean, organized layout
  - Left border color coding
  - Hover effects for better interactivity
  - Proper spacing and typography

## User Experience Flow

### Selecting a Class:
1. User clicks "Editar Ficha" button
2. In the edit modal, clicks "Selecionar Classe" button
3. Class selection modal opens showing all available classes as cards
4. User clicks on desired class card
5. Class is selected and its traits are automatically extracted and saved
6. Modal can be closed and traits appear in the main sheet under "Traços"

### Selecting a Race:
1. User clicks "Editar Ficha" button
2. In the edit modal, clicks "Selecionar Raça" button
3. Race selection modal opens showing all available races as cards
4. User clicks on desired race card
5. Race is selected and its traits are automatically extracted and saved
6. Modal can be closed and traits appear in the main sheet under "Traços"

### Viewing Traits:
1. User clicks "Traços" button in the collapsible sections
2. Section expands showing:
   - Class traits (if a class is selected)
   - Race traits (if a race is selected)
3. Each trait shows its name and description
4. Traits can be individually removed if needed

## Technical Details

### Trait Extraction

#### From Classes:
- **Proficiências**: Combined list of all class proficiencies
- **Testes de Resistência**: Combined list of saving throw proficiencies
- **Dado de Vida**: The hit die for the class (e.g., "d12")
- **Conjuração**: Indicates if the class has spellcasting abilities

#### From Races:
- **Velocidade**: Movement speed in feet
- **Bônus de Atributos**: Ability score bonuses
- **Tamanho**: Size category with description
- **Idiomas**: Languages known with description
- **Traços Raciais**: List of all racial traits

### Data Persistence
- All trait data is automatically saved to localStorage
- Uses the existing cache mechanism with the `jogador` key
- Traits are preserved across browser sessions
- Traits are included in the JSON export/import functionality

## Future Enhancements

Possible improvements for future iterations:
1. Add detailed trait descriptions in expandable panels
2. Load full trait details from API when clicking on a trait
3. Add search/filter functionality in selection modals
4. Display trait source (which book/rules set)
5. Add custom trait creation functionality
6. Implement trait prerequisites and dependencies
7. Add visual indicators for trait categories
8. Include level-based trait progression

## API Integration

The feature integrates with the D&D 5e API:
- **Classes**: `https://www.dnd5eapi.co/api/2014/classes`
- **Races**: `https://www.dnd5eapi.co/api/2014/races`

Note: The 2014 API is used for classes and races as it provides more comprehensive trait information than the 2024 API.

## Testing

To test the feature:
1. Start the development server: `npm start`
2. Navigate to the player character sheet
3. Click "Editar Ficha"
4. Click "Selecionar Classe" to test class selection
5. Click "Selecionar Raça" to test race selection
6. Close the edit modal
7. Click "Traços" to view the extracted traits

Note: API access may be blocked in certain environments. In production, ensure CORS is properly configured or use a proxy.
