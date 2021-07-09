import { TestBed } from '@angular/core/testing';

import { TipoDeQuartoService } from './tipo-de-quarto.service';

describe('TipoDeQuartoService', () => {
  let service: TipoDeQuartoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDeQuartoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
