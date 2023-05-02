import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocoAulaModalComponent } from './bloco-aula-modal.component';

describe('BlocoAulaModalComponent', () => {
  let component: BlocoAulaModalComponent;
  let fixture: ComponentFixture<BlocoAulaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocoAulaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlocoAulaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
