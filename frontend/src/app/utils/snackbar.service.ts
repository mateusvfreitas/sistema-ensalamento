import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    constructor(private _snackBar: MatSnackBar) {}

    openSnackbar(mensagem: string, sucesso: boolean): void {
        let classe = sucesso ? 'success-snackbar' : 'error-snackbar';
        this._snackBar.open(mensagem, '', {
            panelClass: [classe],
            duration: 3000,
        });
    }
}
