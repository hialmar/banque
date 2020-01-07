import { TestBed } from '@angular/core/testing';

import { BanqueService } from './banque.service';

describe('BanqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BanqueService = TestBed.get(BanqueService);
    expect(service).toBeTruthy();
  });
});
