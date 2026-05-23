import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciativaComponent } from './iniciativa.component';

describe('IniciativaComponent', () => {
  let component: IniciativaComponent;
  let fixture: ComponentFixture<IniciativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciativaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
