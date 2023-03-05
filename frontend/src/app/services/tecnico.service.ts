import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../config/api.config';
import { Tecnico } from '../models/Tecnico.model';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {
  
  constructor(private http: HttpClient) { }
  
  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${API.local}/tecnicos`);
  }

  tecnicoCreate(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${API.local}/tecnicos`, tecnico);
  }
  
}
