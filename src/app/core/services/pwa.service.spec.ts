import { TestBed } from '@angular/core/testing';
import { PwaService } from './pwa.service';
import { SwUpdate } from '@angular/service-worker';
import { ApplicationRef } from '@angular/core';

describe('PwaService', () => {
  let service: PwaService;
  let swUpdateMock: jasmine.SpyObj<SwUpdate>;
  let appRefMock: jasmine.SpyObj<ApplicationRef>;

  beforeEach(() => {
    const swUpdateSpy = jasmine.createSpyObj('SwUpdate', ['checkForUpdate', 'activateUpdate']);
    const appRefSpy = jasmine.createSpyObj('ApplicationRef', ['isStable']);

    TestBed.configureTestingModule({
      providers: [
        PwaService,
        { provide: SwUpdate, useValue: swUpdateSpy },
        { provide: ApplicationRef, useValue: appRefSpy }
      ]
    });
    
    service = TestBed.inject(PwaService);
    swUpdateMock = TestBed.inject(SwUpdate) as jasmine.SpyObj<SwUpdate>;
    appRefMock = TestBed.inject(ApplicationRef) as jasmine.SpyObj<ApplicationRef>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if can install', () => {
    expect(service.canInstall).toBeDefined();
  });

  it('should check if is installed', () => {
    expect(service.isInstalled).toBeDefined();
  });
});
