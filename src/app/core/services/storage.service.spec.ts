import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    
    // Clear localStorage before each test
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve string items', () => {
    service.setItem('testKey', 'testValue');
    expect(service.getItem('testKey')).toBe('testValue');
  });

  it('should store and retrieve objects', () => {
    const testObj = { name: 'Test', value: 123 };
    service.setObject('testKey', testObj);
    const retrieved = service.getObject<typeof testObj>('testKey');
    expect(retrieved).toEqual(testObj);
  });

  it('should remove items', () => {
    service.setItem('testKey', 'testValue');
    service.removeItem('testKey');
    expect(service.getItem('testKey')).toBe(null);
  });

  it('should check if item exists', () => {
    service.setItem('testKey', 'testValue');
    expect(service.hasItem('testKey')).toBe(true);
    expect(service.hasItem('nonExistent')).toBe(false);
  });

  it('should clear all items', () => {
    service.setItem('key1', 'value1');
    service.setItem('key2', 'value2');
    service.clear();
    expect(service.getItem('key1')).toBe(null);
    expect(service.getItem('key2')).toBe(null);
  });

  it('should handle null values gracefully', () => {
    expect(service.getItem('nonExistent')).toBe(null);
    expect(service.getObject('nonExistent')).toBe(null);
  });
});
