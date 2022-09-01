import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
