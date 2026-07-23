import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiceRollToastComponent } from './dice-roll-toast.component';

describe('DiceRollToastComponent', () => {
  let component: DiceRollToastComponent;
  let fixture: ComponentFixture<DiceRollToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceRollToastComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DiceRollToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o total da rolagem quando houver resultado', () => {
    component.resultado = { campo: 'Ataque', d20: 17, mod: 3, total: 20 };
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('20');
  });
});
