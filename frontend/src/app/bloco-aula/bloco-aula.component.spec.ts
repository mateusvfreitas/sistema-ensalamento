import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocoAulaComponent } from './bloco-aula.component';

describe('BlocoAulaComponent', () => {
  let component: BlocoAulaComponent;
  let fixture: ComponentFixture<BlocoAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocoAulaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlocoAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
