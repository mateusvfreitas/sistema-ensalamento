import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HorarioComponent } from './horario.component';

describe('HorarioComponent', () => {
    let component: HorarioComponent;
    let fixture: ComponentFixture<HorarioComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HorarioComponent],
            imports: [MatSnackBarModule],
            providers: [{ provide: MatDialog, useValue: {} }],
        }).compileComponents();

        fixture = TestBed.createComponent(HorarioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
