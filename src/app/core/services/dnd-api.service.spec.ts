import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DndApiService } from './dnd-api.service';

describe('DndApiService', () => {
  let service: DndApiService;
  let httpMock: HttpTestingController;
  const BASE_URL = 'https://www.dnd5eapi.co/api/2024';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DndApiService]
    });
    service = TestBed.inject(DndApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch ability scores', () => {
    const mockData = { results: [] };
    
    service.getAbilityScores().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${BASE_URL}/ability-scores`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should cache ability scores', () => {
    const mockData = { results: [] };
    
    service.getAbilityScores().subscribe();
    service.getAbilityScores().subscribe();

    const requests = httpMock.match(`${BASE_URL}/ability-scores`);
    expect(requests.length).toBe(1);
    requests[0].flush(mockData);
  });

  it('should fetch alignments', () => {
    const mockData = { results: [] };
    
    service.getAlignments().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${BASE_URL}/alignments`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch conditions', () => {
    const mockData = { results: [] };
    
    service.getConditions().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${BASE_URL}/conditions`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch damage types', () => {
    const mockData = { results: [] };
    
    service.getDamageTypes().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${BASE_URL}/damage-types`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch equipment', () => {
    const mockData = { results: [] };
    
    service.getEquipment().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${BASE_URL}/equipment`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch equipment categories', () => {
    const mockData = { results: [] };
    
    service.getEquipmentCategories().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${BASE_URL}/equipment-categories`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch equipment details with multiple categories', () => {
    const mockData = {
      index: 'longsword',
      name: 'Longsword',
      url: '/api/2024/equipment/longsword',
      equipment_category: {
        index: 'weapons',
        name: 'Weapons',
        url: '/api/2024/equipment-categories/weapons'
      },
      equipment_categories: [
        {
          index: 'martial-melee-weapons',
          name: 'Martial Melee Weapons',
          url: '/api/2024/equipment-categories/martial-melee-weapons'
        },
        {
          index: 'martial-weapons',
          name: 'Martial Weapons',
          url: '/api/2024/equipment-categories/martial-weapons'
        },
        {
          index: 'melee-weapons',
          name: 'Melee Weapons',
          url: '/api/2024/equipment-categories/melee-weapons'
        },
        {
          index: 'weapons',
          name: 'Weapons',
          url: '/api/2024/equipment-categories/weapons'
        }
      ]
    };
    
    service.getEquipmentDetails('longsword').subscribe(data => {
      expect(data).toEqual(mockData);
      expect(data.equipment_categories).toBeDefined();
      expect(data.equipment_categories.length).toBe(4);
    });

    const req = httpMock.expectOne(`${BASE_URL}/equipment/longsword`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch languages', () => {
    const mockData = { results: [] };
    
    service.getLanguages().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${BASE_URL}/languages`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch magic schools', () => {
    const mockData = { results: [] };
    
    service.getMagicSchools().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${BASE_URL}/magic-schools`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch skills', () => {
    const mockData = { results: [] };
    
    service.getSkills().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${BASE_URL}/skills`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch weapon mastery properties', () => {
    const mockData = { results: [] };
    
    service.getWeaponMasteryProperties().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${BASE_URL}/weapon-mastery-properties`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch weapon properties', () => {
    const mockData = { results: [] };
    
    service.getWeaponProperties().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${BASE_URL}/weapon-properties`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch ability score details', () => {
    const mockData = { index: 'str', name: 'STR' };
    
    service.getAbilityScoreDetails('str').subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${BASE_URL}/ability-scores/str`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch ability score details with description as string', () => {
    const mockData = {
      index: 'cha',
      name: 'CHA',
      full_name: 'Charisma',
      description: 'Confidence, poise, and charm',
      skills: [
        { name: 'Deception', index: 'deception', url: '/api/2024/skills/deception' },
        { name: 'Intimidation', index: 'intimidation', url: '/api/2024/skills/intimidation' }
      ],
      url: '/api/2024/ability-scores/cha'
    };
    
    service.getAbilityScoreDetails('cha').subscribe(data => {
      expect(data).toEqual(mockData);
      expect(typeof data.description).toBe('string');
      expect(data.description).toBe('Confidence, poise, and charm');
    });

    const req = httpMock.expectOne(`${BASE_URL}/ability-scores/cha`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should clear cache', () => {
    const mockData = { results: [] };
    
    // First call
    service.getAbilityScores().subscribe();
    httpMock.expectOne(`${BASE_URL}/ability-scores`).flush(mockData);

    // Clear cache
    service.clearCache();

    // Second call should make a new request
    service.getAbilityScores().subscribe();
    httpMock.expectOne(`${BASE_URL}/ability-scores`).flush(mockData);
  });
});
