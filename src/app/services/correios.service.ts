import { Injectable } from '@angular/core';
import { Endereco } from '../models/endereco.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorreiosService {

  constructor(
    private http:HttpClient
  ) { }

  pegaEndereco(cep:string):Observable<Endereco>{
    return this.http.get<Endereco>(`${environment.correiosWS}/${cep}/json`)
  }
}
