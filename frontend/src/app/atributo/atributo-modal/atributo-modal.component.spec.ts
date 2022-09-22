import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtributoModalComponent } from './atributo-modal.component';

describe('AtributoModalComponent', () => {
  let component: AtributoModalComponent;
  let fixture: ComponentFixture<AtributoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtributoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtributoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
