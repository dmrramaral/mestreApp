import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DndApiService } from '../../../../core/services/dnd-api.service';
import { FeatureSearchModalComponent } from './feature-search-modal.component';

describe('FeatureSearchModalComponent', () => {
  let component: FeatureSearchModalComponent;
  let fixture: ComponentFixture<FeatureSearchModalComponent>;

  const dndApiServiceMock = {
    getFeatsOpen5e: jasmine.createSpy('getFeatsOpen5e').and.returnValue(of({ results: [] })),
    getFeats: jasmine.createSpy('getFeats').and.returnValue(of({ results: [] })),
    searchFeatsOpen5e: jasmine.createSpy('searchFeatsOpen5e').and.returnValue(of({ results: [] })),
    getFeatDetailsOpen5e: jasmine.createSpy('getFeatDetailsOpen5e').and.returnValue(of({ name: 'Teste' })),
    getFeatDetails: jasmine.createSpy('getFeatDetails').and.returnValue(of({ name: 'Teste' }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureSearchModalComponent],
      providers: [{ provide: DndApiService, useValue: dndApiServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar talentos ao abrir o modal', () => {
    component.ngOnChanges({
      isOpen: {
        currentValue: true,
        previousValue: false,
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(dndApiServiceMock.getFeatsOpen5e).toHaveBeenCalled();
  });
});
