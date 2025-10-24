import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with light theme by default', () => {
    expect(service.theme()).toBe('light');
  });

  it('should toggle theme from light to dark', () => {
    service.theme.set('light');
    service.toggleTheme();
    expect(service.theme()).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    service.theme.set('dark');
    service.toggleTheme();
    expect(service.theme()).toBe('light');
  });

  it('should set theme to dark', () => {
    service.setTheme('dark');
    expect(service.theme()).toBe('dark');
  });

  it('should set theme to light', () => {
    service.setTheme('light');
    expect(service.theme()).toBe('light');
  });

  it('should return true when theme is dark', () => {
    service.theme.set('dark');
    expect(service.isDark()).toBe(true);
  });

  it('should return false when theme is light', () => {
    service.theme.set('light');
    expect(service.isDark()).toBe(false);
  });

  it('should save theme to localStorage', (done) => {
    service.setTheme('dark');
    // Wait for effect to run
    setTimeout(() => {
      expect(localStorage.getItem('app-theme')).toBe('dark');
      done();
    }, 100);
  });

  it('should load theme from localStorage', () => {
    localStorage.setItem('app-theme', 'dark');
    // Create new service via TestBed to have proper injection context
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const newService = TestBed.inject(ThemeService);
    expect(newService.theme()).toBe('dark');
  });
});
