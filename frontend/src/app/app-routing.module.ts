import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { TecnicoCreateComponent } from './components/tecnicos/tecnico-create/tecnico-create.component';
import { TecnicosListComponent } from './components/tecnicos/tecnicos-list/tecnicos-list.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },

  { 
    path: '', component: MenuComponent, canActivate: [AuthGuard], children: [
      
      { path: 'home', component: HomeComponent },

      { path: 'tecnicos', component: TecnicosListComponent },
      { path: 'tecnicos/create',     component: TecnicoCreateComponent },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
