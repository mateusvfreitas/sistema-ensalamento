import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtributoComponent } from './atributo/atributo.component';
import { CursoComponent } from './curso/curso.component';
import { HorarioComponent } from './horario/horario.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
    {
        path: 'usuarios',
        component: UsuarioComponent,
    },
    {
        path: 'horarios',
        component: HorarioComponent,
    },
    {
        path: 'cursos',
        component: CursoComponent,
    },
    {
        path: 'atributos',
        component: AtributoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
