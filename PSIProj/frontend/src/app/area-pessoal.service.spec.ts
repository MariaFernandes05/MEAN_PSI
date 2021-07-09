import { TestBed } from '@angular/core/testing';

import { AreaPessoalService } from './area-pessoal.service';

describe('AreaPessoalService', () => {
  let service: AreaPessoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaPessoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
