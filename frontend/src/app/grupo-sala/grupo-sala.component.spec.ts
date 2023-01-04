import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoSalaComponent } from './grupo-sala.component';

describe('GrupoSalaComponent', () => {
  let component: GrupoSalaComponent;
  let fixture: ComponentFixture<GrupoSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoSalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
