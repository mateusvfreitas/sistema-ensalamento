import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Material Design
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Components
import { AppComponent } from './app.component';
import { AtributoModalComponent } from './atributo/atributo-modal/atributo-modal.component';
import { AtributoComponent } from './atributo/atributo.component';
import { BlocoAulaModalComponent } from './bloco-aula/bloco-aula-modal/bloco-aula-modal.component';
import { BlocoAulaComponent } from './bloco-aula/bloco-aula.component';
import { CursoModalComponent } from './curso/curso-modal/curso-modal.component';
import { CursoComponent } from './curso/curso.component';
import { GrupoSalaModalComponent } from './grupo-sala/grupo-sala-modal/grupo-sala-modal.component';
import { GrupoSalaComponent } from './grupo-sala/grupo-sala.component';
import { HorarioModalComponent } from './horario/horario-modal/horario-modal.component';
import { HorarioComponent } from './horario/horario.component';
import { SalaModalComponent } from './sala/sala-modal/sala-modal.component';
import { SalaComponent } from './sala/sala.component';
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
        SalaComponent,
        GrupoSalaComponent,
        GrupoSalaModalComponent,
        BlocoAulaComponent,
        BlocoAulaModalComponent,
        SalaModalComponent,
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
        MatAutocompleteModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatTooltipModule,
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
