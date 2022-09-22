import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Material Design
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {
    MatPaginatorIntl,
    MatPaginatorModule,
} from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

// Components
import { AppComponent } from './app.component';
import { AtributoModalComponent } from './atributo/atributo-modal/atributo-modal.component';
import { AtributoComponent } from './atributo/atributo.component';
import { CursoModalComponent } from './curso/curso-modal/curso-modal.component';
import { CursoComponent } from './curso/curso.component';
import { HorarioModalComponent } from './horario/horario-modal/horario-modal.component';
import { HorarioComponent } from './horario/horario.component';
import { CustomPaginatorConfiguration } from './shared/CustomPaginatorConfiguration';
import { HttpErrorInterceptor } from './shared/http-error.interceptor';
import { CreateUsuarioComponent } from './usuario/create/create-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';

@NgModule({
    declarations: [
        AppComponent,
        UsuarioComponent,
        CreateUsuarioComponent,
        HorarioComponent,
        HorarioModalComponent,
        CursoComponent,
        CursoModalComponent,
        AtributoComponent,
        AtributoModalComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,

        // Material Design
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
        MatChipsModule,
    ],
    exports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: CustomPaginatorConfiguration },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
