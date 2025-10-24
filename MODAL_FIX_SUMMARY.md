# Modal Navigation Fix - Class and Race Selection

## Problem Statement

When clicking on the "Detalhes" (Details) button for a class or race in the selection modal, the modal would close completely instead of opening the details view. This made it difficult to review class/race details during character creation.

## Solution

Modified the modal behavior to use Bootstrap's JavaScript API instead of data attributes:

### Changes Made

1. **HTML Changes** (`ficha-jogador.component.html`):
   - Removed `data-bs-toggle="modal"` and `data-bs-target="#classDetailsModal"` from the class details button
   - Removed `data-bs-toggle="modal"` and `data-bs-target="#raceDetailsModal"` from the race details button

2. **TypeScript Changes** (`ficha-jogador.component.ts`):
   - Modified `viewClassDetails()` to manually open the details modal using Bootstrap's Modal API
   - Modified `viewRaceDetails()` to manually open the details modal using Bootstrap's Modal API
   - Modified `closeClassDetails()` to close the details modal and reopen the selection modal
   - Modified `closeRaceDetails()` to close the details modal and reopen the selection modal

### Behavior After Fix

1. User clicks "Selecionar Classe" or "Selecionar Raça" → Selection modal opens
2. User clicks "Detalhes" on a class/race → Details modal opens on top, selection modal stays in background
3. User clicks "Fechar" (Close) on details modal → Details modal closes and selection modal reappears
4. User can continue browsing and selecting classes/races

### Technical Details

- Used Bootstrap 5's Modal API (`bootstrap.Modal`)
- Added 300ms delay when reopening selection modal to ensure smooth transition
- Added null checks for SSR compatibility (`typeof window !== 'undefined'`)

## Files Modified

- `src/app/home/fichaJogador/ficha-jogador/ficha-jogador.component.html`
- `src/app/home/fichaJogador/ficha-jogador/ficha-jogador.component.ts`

## Testing

The fix has been tested to ensure:
- Selection modal stays open when details button is clicked
- Details modal opens on top of selection modal
- Closing details modal returns to selection modal
- The same behavior applies to both class and race selection

## Browser Compatibility

Works with Bootstrap 5.3.3+ and modern browsers that support:
- JavaScript Classes
- Arrow functions
- `setTimeout`
- Bootstrap's Modal API
