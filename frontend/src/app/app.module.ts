import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modulo para requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Modulo para trabalhar com formulários
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import 'boxicons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { TecnicosListComponent } from './components/tecnicos/tecnicos-list/tecnicos-list.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './shared/material/CustomPaginatorConfiguration';
import { TecnicoCreateComponent } from './components/tecnicos/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnicos/tecnico-update/tecnico-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    TecnicosListComponent,
    TecnicoCreateComponent,
    TecnicoUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Modulo do Angular Material
    MaterialModule,
    // Requisições http
    HttpClientModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
  ],
  providers: [
    AuthInterceptorProvider,
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
