import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modulo para requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Modulo para trabalhar com formulários
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';

@NgModule({
  declarations: [
    AppComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
