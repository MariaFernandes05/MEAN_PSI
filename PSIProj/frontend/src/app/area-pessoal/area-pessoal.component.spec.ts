import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaPessoalComponent } from './area-pessoal.component';

describe('AreaPessoalComponent', () => {
  let component: AreaPessoalComponent;
  let fixture: ComponentFixture<AreaPessoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaPessoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaPessoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
