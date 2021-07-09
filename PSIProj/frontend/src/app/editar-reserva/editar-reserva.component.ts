import { Component, OnInit } from '@angular/core';
import { AreaPessoalService } from '../area-pessoal.service';
import { Reserva } from 'src/reserva';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { Location } from '@angular/common'; 
import { DatePipe } from '@angular/common'; 
import { TipoDeQuarto } from 'src/tipo-de-quarto'; 
import { TipoDeQuartoService } from "../tipo-de-quarto.service";

@Component({
  selector: 'app-editar-reserva',
  templateUrl: './editar-reserva.component.html',
  styleUrls: ['./editar-reserva.component.css']
})
export class EditarReservaComponent implements OnInit {

  disponivel = true;
  reserva: Reserva = {
        _id: "",
        tipoDeQuarto: "",
        custo: 0,
        dataCheckIn: "",
        dataCheckOut: "",
        hotel: "",
        numeroCartao: "",
        dataValidade: "",
        cvv: "",
        quartoId: "",
        cliente: ""
  }; 
  errorMessage = "";
  dataHoje = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  esteAno = new Date(this.dataHoje).getFullYear();
  reservas: Reserva[];
  custo = 0;
  custoOG = 0;
  clienteID = "";
  tipoDeQuarto: TipoDeQuarto = {
    _id: "",
    tipo:"",
    nQuarto: 0,
    servicos: [],
    precoEpocaAlta: 0,
    precoEpocaBaixa: 0
  };  	  

  constructor( private datepipe: DatePipe,
	       private route: ActivatedRoute,
               private location: Location,
               private tipoDeQuartoService: TipoDeQuartoService,
	       private aPService: AreaPessoalService) { }

  ngOnInit(): void {
        (<HTMLInputElement>document.getElementById("data")).disabled = false; 
	this.getReservas();
        this.route.queryParams.subscribe(params => {                                                                                    this.clienteID = params.cliente;                                                                                    });   
  }

  mostraCartao() {
      if (this.disponivel) {
      	(<HTMLInputElement>document.getElementById("data")).disabled = true;
      	(<HTMLInputElement>document.getElementById("dataF")).disabled = true;
      	const date1 = (<HTMLInputElement>document.getElementById("data")).value;
     	const date2 = (<HTMLInputElement>document.getElementById("dataF")).value;
     	const dateIn = new Date(date1);                                                                                        	const dateOut = new Date(date2);  
      	if( dateIn.getTime() < new Date(this.datepipe.transform(new Date(), 'yyyy-MM-dd')).getTime()){
            	alert("Data de Check-in inválida: Não pode fazer check-in no passado");
      	}else if(dateIn.getTime() < dateOut.getTime()){
       		(<HTMLInputElement>document.getElementById("dadosCartao")).setAttribute("style", "display:block");
                (<HTMLInputElement>document.getElementById("b")).setAttribute("style", "display:none");
                if (this.custoOG < this.custo) {
			if ((<HTMLInputElement>document.getElementById("numCartao")).disabled == true)
			(<HTMLInputElement>document.getElementById("q1")).setAttribute("style", "display:block");
		}
   		
		else if (this.custoOG > this.custo && this.custo != 0) {
 			(<HTMLInputElement>document.getElementById("q2")).setAttribute("style", "display:block");
		}
     	 }else{
                alert("Data de Inicio não é uma data anterior à data de fim ");
      	}
      }
  }

  esconde() {
	(<HTMLInputElement>document.getElementById("q1")).setAttribute("style", "visibility:hidden");
  }

  enable() {
        (<HTMLInputElement>document.getElementById("q1")).setAttribute("style", "display:none");
        (<HTMLInputElement>document.getElementById("numCartao")).disabled = false;
 	(<HTMLInputElement>document.getElementById("numCartao")).value = "";
        (<HTMLInputElement>document.getElementById("dataValidade")).disabled = false;
        (<HTMLInputElement>document.getElementById("dataValidade")).value = "";
	(<HTMLInputElement>document.getElementById("codigoCVV")).disabled = false;
        (<HTMLInputElement>document.getElementById("codigoCVV")).value = "";
  }

  getReservas(){
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
    	this.aPService.getReservas().subscribe(reservasList => {
      		this.reservas = reservasList as Reserva[];
        	for (var i = 0; i < this.reservas.length; i++) {
 			if (this.reservas[i]._id == id){
				this.reserva = this.reservas[i];
                                this.custoOG = this.reserva.custo;
			}
		}
        this.reservas.splice(this.reservas.indexOf(this.reserva), 1);
        this.getTipoDeQuarto();
        (<HTMLInputElement>document.getElementById("data")).value = this.datepipe.transform(new Date(this.reserva.dataCheckIn), 'yyyy-MM-dd');
	(<HTMLInputElement>document.getElementById("dataF")).value = this.datepipe.transform(new Date(this.reserva.dataCheckOut), 'yyyy-MM-dd');
        (<HTMLInputElement>document.getElementById("numCartao")).value = this.reserva.numeroCartao;
        (<HTMLInputElement>document.getElementById("dataValidade")).value = this.datepipe.transform(new Date(this.reserva.dataValidade), 'yyyy-MM-dd');
	 (<HTMLInputElement>document.getElementById("codigoCVV")).value = this.reserva.cvv;
	});
    }
  }

  getTipoDeQuarto() {
    if (this.reserva.quartoId) {
      this.tipoDeQuartoService.getTipoDeQuarto(this.reserva.quartoId).subscribe(tipoDeQuarto => {
        this.tipoDeQuarto = tipoDeQuarto;
      });
    }
  }
  

  goBack() {
 	this.location.back();
  } 

  updateReserva() {
   	if ((<HTMLInputElement>document.getElementById("numCartao")).disabled == false) {
		const dateCC = new Date((<HTMLInputElement>document.getElementById("dataValidade")).value);
		const numCartao = (<HTMLInputElement>document.getElementById("numCartao")).value;
		const cvv = (<HTMLInputElement>document.getElementById("codigoCVV")).value; 
                if (numCartao.length != 16) {
			alert("Número de Cartão Inválido: tem de ter 16 digitos");
			return;
		}
		if (dateCC.toString() == "Invalid Date" || dateCC.getTime() < new Date(this.datepipe.transform(new Date(), 'yyyy-MM-dd')).getTime() ) {
                        alert("Data do cartão inválida");
                        return;                                                                                                         }
		if (cvv.length != 3 && cvv.length != 4) {
                        alert("CódigoCVV Inválido: necessita de ter 3 ou 4 digitos");
                        return;                                                                                                         }
		
	}
	this.reserva.dataCheckIn = (<HTMLInputElement>document.getElementById("data")).value;
	this.reserva.dataCheckOut = (<HTMLInputElement>document.getElementById("dataF")).value;
	this.reserva.numeroCartao = (<HTMLInputElement>document.getElementById("numCartao")).value;	
	this.reserva.dataValidade = (<HTMLInputElement>document.getElementById("dataValidade")).value;
	this.reserva.cvv = (<HTMLInputElement>document.getElementById("codigoCVV")).value;
        if (this.custo != 0)
		this.reserva.custo = this.custo;
        this.aPService.updateReserva(this.reserva).subscribe(result => {
                this.errorMessage = result.message;
        });
	this.location.back();
  }

  filtroDatas(){
    let dataI = (<HTMLInputElement>document.getElementById("data")).value;
    let dataF = (<HTMLInputElement>document.getElementById("dataF")).value;
    var j = 0;
    var available = this.tipoDeQuarto.nQuarto;
    for(var g = 0; g < this.reservas.length; g++){
        if(this.reservas[g].tipoDeQuarto == this.tipoDeQuarto.tipo && this.reservas[g].hotel == this.reserva.hotel) {
          if(new Date(this.reservas[g].dataCheckIn) < new Date(dataF) &&
                new Date(this.reservas[g].dataCheckOut) > new Date(dataI)){
                available--;
          }
        }
    }
    if(available > 0){
        this.disponivel = true;
        this.calculaCusto();
    } else {  
        let nDias = 1+Math.floor((new Date(dataF).getTime() - new Date(dataI).getTime()) / (1000 * 60 * 60 * 24));
        let dia = new Date(dataI);
        let estahDisponivel = true;
        for (var abc = 0; abc < nDias; abc++) {
                let disponivel = this.tipoDeQuarto.nQuarto;
                for(var def = 0; def < this.reservas.length; def++){
                        if(this.reservas[def].tipoDeQuarto == this.tipoDeQuarto.tipo && this.reservas[def].hotel == this.reserva.hotel){
                                if(new Date(this.reservas[def].dataCheckIn) <= dia &&
                                        new Date(this.reservas[def].dataCheckOut) > dia){
                                        disponivel--;
                                }
                        }
                }
                if (disponivel <= 0)
                        estahDisponivel = false;
                 dia.setDate( dia.getDate() + 1 );
        }                                                                                                                       if (estahDisponivel) {             
		this.disponivel = true;                                                                                                this.calculaCusto();
        } else {
   	  	alert("Quartos lotados para as datas selecionadas");
		this.disponivel = false;
 	}
    }
  }
  
  calculaCusto() {

        var dataEpocaAltaInicio = new Date(this.esteAno, 5, 1);
        var dataEpocaAltaFim = new Date(this.esteAno, 8, 29);
        let d1 = new Date((<HTMLInputElement>document.getElementById("data")).value);
        let d2 = new Date((<HTMLInputElement>document.getElementById("dataF")).value);
        if (d1.toString() != "Invalid Date" && d2.toString() != "Invalid Date") {
                let nNoites = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
                if( nNoites >= 0 && d1.getTime() >= dataEpocaAltaInicio.getTime() && d2.getTime() <= dataEpocaAltaFim.getTime() ) {
                        this.custo = this.tipoDeQuarto.precoEpocaAlta * nNoites;
                } else if (nNoites >= 0 && (d1 < dataEpocaAltaInicio && d2 <= dataEpocaAltaInicio) || (d1 >= dataEpocaAltaFim && d2 > dataEpocaAltaFim)){
                        this.custo = this.tipoDeQuarto.precoEpocaBaixa * nNoites;
                } else if(nNoites >= 0) {
			this.custo = 0;
                        let nDias = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
                        let dia = new Date(d1.toString());
                        for (var abc = 0; abc < nDias; abc++) {
                                if (dia >= new Date(this.esteAno,5, 1) && dia < new Date(this.esteAno, 8, 29))
                                        this.custo += this.tipoDeQuarto.precoEpocaAlta;
                                else
                                        this.custo += this.tipoDeQuarto.precoEpocaBaixa;
                                dia.setDate( dia.getDate() + 1 );
                        }
		}
		else {
                        this.custo = 0;
                }
        }
        (<HTMLInputElement>document.getElementById("custo")).innerHTML = "Custo: " + this.custo + "€";
  } 
}
