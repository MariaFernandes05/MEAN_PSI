import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva } from 'src/reserva';

@Injectable({
  providedIn: 'root'
})
export class AreaPessoalService {

  baseUrl = 'http://appserver.alunos.di.fc.ul.pt:3019/route/';
  reservasUrl = this.baseUrl + 'reservas/';
  reservaUrl = this.baseUrl + 'reserva/';
  createUrl = this.reservaUrl + "create/";
  updateUrl = this.reservaUrl + "update/";

  constructor(private http: HttpClient) { }

  getReservas(){ 
    return this.http.get(this.reservasUrl);
  }

  getReserva(id: string) {
    const url = this.reservaUrl + id;
    return this.http.get<Reserva>(url);
  }
  
  createReserva(reserva: Reserva) {
    return this.http.post<{ message: string }>(this.createUrl, reserva);
  }

  updateReserva(reserva: Reserva) {
    return this.http.post<{ message: string }>(this.updateUrl, reserva);
  }
}
