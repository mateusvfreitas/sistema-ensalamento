import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoSalaModalComponent } from './grupo-sala-modal.component';

describe('GrupoSalaModalComponent', () => {
  let component: GrupoSalaModalComponent;
  let fixture: ComponentFixture<GrupoSalaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoSalaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoSalaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
