import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { FichaJogadorComponent } from './ficha-jogador.component';

describe('FichaJogadorComponent', () => {
  let component: FichaJogadorComponent;
  let fixture: ComponentFixture<FichaJogadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaJogadorComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaJogadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
