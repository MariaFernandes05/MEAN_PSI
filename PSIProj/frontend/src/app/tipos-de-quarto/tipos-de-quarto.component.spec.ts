import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDeQuartoComponent } from './tipos-de-quarto.component';

describe('TiposDeQuartoComponent', () => {
  let component: TiposDeQuartoComponent;
  let fixture: ComponentFixture<TiposDeQuartoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposDeQuartoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposDeQuartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
