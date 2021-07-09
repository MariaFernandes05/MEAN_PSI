import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel } from 'src/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  baseUrl = 'http://appserver.alunos.di.fc.ul.pt:3019/route/';
  hoteisUrl = this.baseUrl + 'cadeiaDeHoteis/';
  hotelUrl = this.baseUrl + 'hotel/';

  constructor(private http: HttpClient) { }
  
  getHoteis() {
    return this.http.get(this.hoteisUrl);
  }

  getHotel(id: string) {
    const url = this.hotelUrl + id;
    return this.http.get<Hotel>(url);
  }
}

