import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from 'src/cliente';
import { Reserva } from 'src/reserva';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  baseUrl = 'http://appserver.alunos.di.fc.ul.pt:3019/route/';
  clientesUrl = this.baseUrl + 'clientes/';
  clienteUrl = this.baseUrl + 'cliente/';  
  clienteCreateUrl = this.clienteUrl +  'create/'; 

  constructor(private http: HttpClient) { }

  getClientes(){
	return this.http.get(this.clientesUrl);
  }

  getCliente(id: string){
	const url = this.clienteUrl + id;
	return this.http.get<Cliente>(url); 	
  }

  getReservas(id: string) {
    const url = this.clienteUrl + id + "/reservas";
    return this.http.get<Reserva[]>(url);
  }

  criarClient(cliente: Cliente){
	return this.http.post<{ message: string }>(this.clienteCreateUrl, cliente);
  }

}
