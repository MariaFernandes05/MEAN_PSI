import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HotelService } from "../hotel.service";
import { TipoDeQuartoService } from "../tipo-de-quarto.service";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { Hotel } from "src/hotel";
import { TipoDeQuarto } from "src/tipo-de-quarto";
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Reserva } from 'src/reserva';
import { AreaPessoalService } from '../area-pessoal.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  ngOnInit(): void {
    //document.getElementById("min").addEventListener("change", this.aplicarFiltro, false); 
    //document.getElementById("max").addEventListener("change", this.aplicarFiltro, false);
    //this.comparaDatas();
    this.route.queryParams.subscribe(params => {
            	if( params.cliente != undefined ){
			this.clienteID = params.cliente;
		}
		console.log(this.clienteID);
    });
    this.getHotel();
    this.getReservas();
  }
  
  dataHoje = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  esteAno = new Date(this.dataHoje).getFullYear();
  clienteID = "";
  hotel: Hotel = {
    _id:"",
    nome: "",
    morada:"",
    mail:"",
    coordenadas: "",
    telefone: "",
    ntotal: 0,
    quarto: [],
    descricao: "",
    servicos: [],
    imagens: []
}

  id = "";
  imagemRandom: string;  
  minimo = 0;
  maximo = 0;
  quartos: TipoDeQuarto[] = [];
  errorMessage = "";
  updateOrCreate = false;
  buttonLabel = "Update";
  hotelForm: FormGroup;
  data = new Date();
  epocaAlta = 0;

  reservas: Reserva[]; 
  //custoDeReserva: Number;
  custos: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private quartoService: TipoDeQuartoService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private datepipe: DatePipe,
    private aPService: AreaPessoalService) {

    this.hotelForm = this.formBuilder.group({
      nome: this.formBuilder.control(""),
      morada: this.formBuilder.control(""),
      mail: this.formBuilder.control(""),
      coordenadas: this.formBuilder.control(""),
      telefone: this.formBuilder.control(""),
      ntotal: this.formBuilder.control(""),
      quarto: this.formBuilder.array([]),
      descricao: this.formBuilder.control(""),
      servicos: this.formBuilder.control(""),
      imagens: this.formBuilder.control(""),
     })
  }


  goBack() {
    this.location.back();
  }

  onEdit(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  
  redirecionarReserva(quartoId){
    let navigationExtras: NavigationExtras = {
            queryParams: {
                hotel: this.hotel._id,
                quarto: quartoId,
                data: new Date((<HTMLInputElement>document.getElementById("data")).value),
                dataF: new Date((<HTMLInputElement>document.getElementById("dataF")).value),
		cliente: this.clienteID
            }
    }
    if (this.clienteID != "") {
    	this.router.navigate(['reserva'], navigationExtras);
    } else
	this.router.navigate(['login']);
  }

  tipoQuartoR(id) {
	let navigationExtras: NavigationExtras = {
            queryParams: {
                cliente: this.clienteID,
            }
    	}
	this.router.navigate(['tipoDeQuarto/'+id], navigationExtras);
  }

  getHotel() {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.hotelService.getHotel(this.id).subscribe(hotel => {
        this.hotel = hotel;
        this.getTiposDeQuartos(hotel.quarto);
        for(var i = 0; i < hotel.imagens.length; i++)
          this.hotel.imagens[i]= 'http://appserver.alunos.di.fc.ul.pt:3069/assets/'+hotel.imagens[i].substring(14, hotel.imagens[i].length);
        });
    }
  }

  getTiposDeQuartos(ids){    
    var i = 0;
    for(i = 0; i< ids.length; i++) {
        this.quartoService.getTipoDeQuarto( ids[i]).subscribe(q => {
        this.quartos.push(q);
        if (this.minimo == 0){
          this.minimo = q.precoEpocaAlta < q.precoEpocaBaixa ? q.precoEpocaAlta : q.precoEpocaBaixa;
        }
        if(this.minimo > q.precoEpocaAlta){ 
          this.minimo = q.precoEpocaAlta;
        }
        if(this.minimo > q.precoEpocaBaixa){
          this.minimo = q.precoEpocaBaixa;
        }
        if (this.maximo < q.precoEpocaAlta){
          this.maximo = q.precoEpocaAlta;
        }
        if (this.maximo < q.precoEpocaBaixa){
          this.maximo = q.precoEpocaBaixa;
        }
        (<HTMLInputElement>document.getElementById("min")).value = this.minimo.toString();
        (<HTMLInputElement>document.getElementById("max")).value = this.maximo.toString();
      }); 
    }
  }

  aplicarFiltro() {
    let min = (<HTMLInputElement>document.getElementById("min")).value;
    let max = (<HTMLInputElement>document.getElementById("max")).value;
    let valorMin = parseInt(min);
    let valorMax = parseInt(max);
    var c = document.getElementById("lista").children;
    var i = 0;
    for (i = 0; i < c.length; i++){
	    var visivel1 = false;
	    var visivel2 = false;
	    var v1 = parseInt(c[i].children[2].children[0].children[1].innerHTML);
	    if (v1 >= valorMin && v1 <= valorMax) {
		    visivel1 = true;
	    }
	    var v2 = parseInt(c[i].children[2].children[1].children[1].innerHTML); 
	    if (v2 >= valorMin && v2 <= valorMax) {
		    visivel2 = true;
	    }
	    if (!visivel1 && !visivel2) {  
		    c[i].setAttribute("style", "visibility:hidden");
		    c[i].setAttribute("style", "display:none"); 
	    }
      else {
        c[i].setAttribute("style", "display:block");
        c[i].setAttribute("style", "visibility:visible");
      }
    } 
  }

  getReservas(){
    this.aPService.getReservas().subscribe(reservasList => {
      this.reservas = reservasList as Reserva[];
    });	
  }


  filtroDatas(){
    let dataI = (<HTMLInputElement>document.getElementById("data")).value;
    let dataF = (<HTMLInputElement>document.getElementById("dataF")).value;

    var tipoDeQuartosAvailable = [] as TipoDeQuarto[];
    var j = 0;
    for (var i = 0; i< this.quartos.length; i++) {
      var quartoHotel = this.quartos[i];
      var available =0;
      available = quartoHotel.nQuarto;
      for(var g = 0; g < this.reservas.length; g++){
          /*console.log('reserva:'  +this.reservas[g].tipoDeQuarto );
          console.log('quartoHotel' + quartoHotel.tipo);*/
        //console.log("HOTEEEEEEEEEEEEL: "+ this.hotel.nome + "   " + this.reservas[g].hotel);
        if(this.reservas[g].tipoDeQuarto == quartoHotel.tipo && this.reservas[g].hotel == this.hotel.nome){ 
          if(new Date(this.reservas[g].dataCheckIn) < new Date(dataF) && 
  		new Date(this.reservas[g].dataCheckOut) > new Date(dataI)){
                available--;              
          } 
        }
      }
      if(available > 0){
        tipoDeQuartosAvailable[j] = this.quartos[i] as TipoDeQuarto;
        j++;
      }
      else {
     	let nDias = 1+Math.floor((new Date(dataF).getTime() - new Date(dataI).getTime()) / (1000 * 60 * 60 * 24)); 	
      	let dia = new Date(dataI);
        let estahDisponivel = true;   
	for (var abc = 0; abc < nDias; abc++) {
                let disponivel = quartoHotel.nQuarto;
      		for(var def = 0; def < this.reservas.length; def++){ 
        		if(this.reservas[def].tipoDeQuarto == quartoHotel.tipo && this.reservas[def].hotel == this.hotel.nome){
         	 		if(new Date(this.reservas[def].dataCheckIn) <= dia &&
                			new Date(this.reservas[def].dataCheckOut) > dia){
               	 			disponivel--;
          			}
       		 	}		
      		}
  		if (disponivel <= 0)
			estahDisponivel = false;
 		 dia.setDate( dia.getDate() + 1 );
	}
 	if (estahDisponivel) {
		tipoDeQuartosAvailable[j] = this.quartos[i] as TipoDeQuarto; 
		j++;
	}
      }
    }

    var c = document.getElementById("lista").children;
    var i = 0;
    for (i = 0; i < c.length; i++){
     var visivel1 = false;
      //console.log(c[i].children[1].children[0].children[0].innerHTML);
	    var v1 = c[i].children[1].children[0].children[0].innerHTML;
	    if (this.contemQuarto(tipoDeQuartosAvailable, v1)) {
        //console.log('AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
		    visivel1 = true;
	    }
	    if (!visivel1) {  
		    c[i].setAttribute("style", "visibility:hidden");
		    c[i].setAttribute("style", "display:none"); 
	    }
      else {
        c[i].setAttribute("style", "display:block");
        c[i].setAttribute("style", "visibility:visible");
      }
    }
    this.calcularCusto();
  }

  
  contemQuarto(quarto, valor){
    for(var i = 0; i < quarto.length; i++){
      if(quarto[i].tipo == valor){
        return true;
      }
    }
    return false;
  }

  calcularCusto(){
    //const oneDay = 24 * 60 * 60 * 1000; //hours*minutes*seconds*milliseconds
    let dataI = (<HTMLInputElement>document.getElementById("data")).value;
    let dataF = (<HTMLInputElement>document.getElementById("dataF")).value;
    const firstDate = new Date(dataI);
    const secondDate = new Date(dataF);
    /*const diffDays = Math.round(Math.abs((firstDate. - secondDate) / oneDay));*/

    var getDates = function(startDate, endDate) {
        var dates = [],
        currentDate = startDate,
        addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
          };
      while (currentDate <= endDate) {
       dates.push(currentDate);
       currentDate = addDays.call(currentDate, 1);
     }
      return dates;
    };

    var dates = getDates(firstDate, secondDate);
    var NumDias = dates.length-1;
    var j = 0
    let dataInvalida: boolean = false;
    for(var h=0; h < this.quartos.length;h++){
      if (NumDias > 0 && firstDate.toString() != "Invalid Date" && firstDate >= new Date(this.datepipe.transform(new Date(), 'yyyy/MM/dd'))) {
      	if(firstDate >= new Date(this.esteAno,5, 1) && secondDate <= new Date(this.esteAno, 8, 29)){
        	this.custos[j] = NumDias * this.quartos[h].precoEpocaAlta;
        	j++;
      	} else if( (firstDate < new Date(this.esteAno,5, 1) && secondDate <= new Date(this.esteAno, 5, 1)) || (firstDate >= new Date(this.esteAno, 8, 29) && secondDate > new Date(this.esteAno, 8, 29)) ) {
        	this.custos[j] = NumDias * this.quartos[h].precoEpocaBaixa;
        	j++;
      	} else { //caso em que o filtro apanha epocas diferentes na sua range
		this.custos[j] = 0;
 		let nDias = Math.floor((new Date(dataF).getTime() - new Date(dataI).getTime()) / (1000 * 60 * 60 * 24));
        	let dia = new Date(firstDate.toString());
		for (var abc = 0; abc < nDias; abc++) {
			if (dia >= new Date(this.esteAno,5, 1) && dia < new Date(this.esteAno, 8, 29))
				this.custos[j] += this.quartos[h].precoEpocaAlta;
			else 
				this.custos[j] += this.quartos[h].precoEpocaBaixa;
			dia.setDate( dia.getDate() + 1 );
		}
		j++;
	}
      } else {
                dataInvalida = true;
        	this.custos[j] = 0;
		j++;
	}
    }
    if (dataInvalida)
 	alert("Datas inválidas");
  }                                                                                                        
  
}
