import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Hotel } from 'src/hotel'; 
import { HotelComponent } from '../hotel/hotel.component';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router"; 

@Component({
  selector: 'app-cadeia-de-hoteis',
  templateUrl: './cadeia-de-hoteis.component.html',
  styleUrls: ['./cadeia-de-hoteis.component.css']
})
export class CadeiaDeHoteisComponent implements OnInit {

  cadeiaDeHoteis: Hotel[] = [];
  imagem: string[]=[]; 
  clienteID = "";

  constructor(private route: ActivatedRoute, private hotelService: HotelService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.showCadeiasDeHotel();
    this.route.queryParams.subscribe(params => {
            this.clienteID = params.cliente;
        
    });
    if (this.clienteID != undefined) {
    	
    }
  }

  showCadeiasDeHotel(){
    this.hotelService.getHoteis().subscribe(hotelList => {
      this.cadeiaDeHoteis = hotelList as Hotel[];
      this.getRandomImage();
    });
  }

  boas(hotel: Hotel) {
    let navigationExtras: NavigationExtras = {
            queryParams: {
                cliente: this.clienteID,
            }
    }
    this.router.navigate(['hotel/'+hotel._id], navigationExtras);
  }

  getRandomImage() {
    for(var i = 0; i< this.cadeiaDeHoteis.length; i++){
      var num = Math.floor( Math.random() * this.cadeiaDeHoteis[i].imagens.length);
      this.imagem[i] = 'http://appserver.alunos.di.fc.ul.pt:3069/assets/'+this.cadeiaDeHoteis[i].imagens[num].substring(14, this.cadeiaDeHoteis[i].imagens[num].length);
      //this.http.get<File>('http://appserver.alunos.di.fc.ul.pt:3069/assets/'+this.cadeiaDeHoteis[i].imagens[num].substring(14, this.cadeiaDeHoteis[i].imagens[num].length), { responseType: 'json' }).subscribe(value => this.imagem.push(value));
    }
  }; 
}
