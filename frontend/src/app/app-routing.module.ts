import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { TecnicoCreateComponent } from './components/tecnicos/tecnico-create/tecnico-create.component';
import { TecnicoDeleteComponent } from './components/tecnicos/tecnico-delete/tecnico-delete.component';
import { TecnicoUpdateComponent } from './components/tecnicos/tecnico-update/tecnico-update.component';
import { TecnicosListComponent } from './components/tecnicos/tecnicos-list/tecnicos-list.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },

  { 
    path: '', component: MenuComponent, canActivate: [AuthGuard], children: [
      
      { path: 'home', component: HomeComponent },

      { path: 'tecnicos', component: TecnicosListComponent },
      { path: 'tecnicos/create',     component: TecnicoCreateComponent },
      { path: 'tecnicos/update/:id', component: TecnicoUpdateComponent },
      { path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
