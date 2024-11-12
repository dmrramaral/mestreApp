import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonstrosComponent } from './monstros.component';

describe('MonstrosComponent', () => {
  let component: MonstrosComponent;
  let fixture: ComponentFixture<MonstrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonstrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonstrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
