import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoDeQuarto } from 'src/tipo-de-quarto';

@Injectable({
  providedIn: 'root'
})
export class TipoDeQuartoService {

  baseUrl = 'http://appserver.alunos.di.fc.ul.pt:3019/route/';
  tiposDeQuartoUrl = this.baseUrl + 'tiposDeQuarto/';
  tipoDeQuartoUrl = this.baseUrl + 'tipoDeQuarto/';
  availableUrl = this.baseUrl+ "quartosinstance/count/available";
  
  constructor(private http: HttpClient) { }
  
  getTiposDeQuarto() {
    return this.http.get(this.tiposDeQuartoUrl);
  }

  getTipoDeQuarto(id) {
    const url = this.tipoDeQuartoUrl + id;
    return this.http.get<TipoDeQuarto>(url);
  }

  /*getQuartoInstanceAvailableCount(){
    return this.http.get(this.availableUrl);
  }*/

}
