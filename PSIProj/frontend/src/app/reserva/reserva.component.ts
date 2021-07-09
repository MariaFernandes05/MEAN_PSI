import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HotelService } from "../hotel.service";
import { TipoDeQuartoService } from "../tipo-de-quarto.service";
import { Hotel } from "src/hotel";
import { ActivatedRoute } from "@angular/router";
import { TipoDeQuarto } from 'src/tipo-de-quarto';
import { FormGroup, FormControl, FormArray, FormBuilder, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgForm }   from '@angular/forms';
import { DatePipe } from '@angular/common'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';  
import { PopupComponent } from '../popup/popup.component';
import { Reserva } from 'src/reserva';
import { AreaPessoalService } from '../area-pessoal.service'; 
import { LoginComponent } from '../login/login.component';
import { Cliente } from 'src/cliente';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
	
  ngOnInit(): void {
   this.route.queryParams.subscribe(params => {
            if (params.data != "Invalid Date") {
                this.dataString = new Date(params.data);
                this.dataI = this.datepipe.transform(this.dataString, 'yyyy-MM-dd');
            }     
            if (params.dataF != "Invalid Date") {
                this.dataString = new Date(params.dataF);  
                this.dataF = this.datepipe.transform(this.dataString, 'yyyy-MM-dd');
            }
	    this.clienteID = params.cliente;
            this.hotelID = params.hotel;
            this.tipoDeQuartoID = params.quarto;
        });
    this.getReservas();
    this.getHotel();
    this.getTipoDeQuarto();

  }
 
  clienteID: string;
  cliente: Cliente;
  quartos: TipoDeQuarto[] = [];
  hotelID: string;
  dataString: Date;
  dataI: string;
  dataF: string;
  tipoDeQuartoID: string;
  dataHoje = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  esteAno = new Date(this.dataHoje).getFullYear();   
  custo = 0;
  id = "";
  reservas: Reserva[];
  errorMessage = "";
  
  tipoDeQuarto: TipoDeQuarto ={
    _id: "",
    tipo:"",
    nQuarto: 0,
    servicos: [],
    precoEpocaAlta: 0,
    precoEpocaBaixa: 0
  }
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
  
  constructor(
    private location: Location,
    private hotelService: HotelService,
    private quartoService: TipoDeQuartoService,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private loginService: LoginService,
    private aPService: AreaPessoalService
  ) { }

  openDialog(f: NgForm) {
      const dateCC = new Date((<HTMLInputElement>document.getElementById("dataValidade")).value);
      const date1 = (<HTMLInputElement>document.getElementById("data")).value;
      const date2 = (<HTMLInputElement>document.getElementById("dataF")).value;
      const dateIn = new Date(date1);
      const dateOut = new Date(date2);
      const resTele = ((<HTMLInputElement>document.getElementById("telefone")).value).match("[+]{1}[0-9]{1,3} [0-9]{9}$");
      const resEmail = ((<HTMLInputElement>document.getElementById("email")).value).match("[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,}$");
      const resNif = ((<HTMLInputElement>document.getElementById("NIF")).value).length == 9;
      const resNome = ((<HTMLInputElement>document.getElementById("nome")).value).length == 0 ;     
      const resMorada = ((<HTMLInputElement>document.getElementById("morada")).value).length == 0;
     
  if( dateIn.getTime() < new Date(this.datepipe.transform(new Date(), 'yyyy-MM-dd')).getTime()){
	    alert("Data de Check-in inválida: Não pode fazer check-in no passado");
     }else if(dateIn.getTime() >= dateOut.getTime()){
     	    alert("Data de Inicio não é uma data anterior à data de fim");
     }else if( resTele == null ){
            alert("Telefone Inválido: formato incorreto");
     }else if( resEmail == null ){
            alert("Email Inválido: formato incorreto");
     }else if( !resNif ){
            alert("NIF Inválido: tem de ter 9 digitos");
     }else if(!f.valid){
            if( f.value.numCartao.length != 16 ){
			alert("Número de Cartão Inválido: tem de ter 16 digitos");
	    }else if( f.value.data == "" ){
			alert("Prazo de validade do cartão Inválido");
	    }else if( f.value.codigoCVV.length != 3 && f.value.codigoCVV.length != 4 ){
			alert("CódigoCVV Inválido: necessita de ter 3 ou 4 digitos");
	    }else{
			alert("Todos os campos devem estar preenchidos");
	    }
    }else if( resNome || resMorada ){
	alert("Todos os campos devem estar preenchidos");
    }else if( dateCC.getTime() < new Date(this.datepipe.transform(new Date(), 'yyyy-MM-dd')).getTime()){
	alert("Data fora de validade");
    }else if (f.valid) {   
	      this.dialog.open(PopupComponent, {
          width: '550px', 
          height: '1000px',
      		data: {data: (<HTMLInputElement>document.getElementById("data")).value,
                            dataF: (<HTMLInputElement>document.getElementById("dataF")).value,
		            tipoDeQuarto: (<HTMLInputElement>document.getElementById("quartos")).value,
		            Nome: (<HTMLInputElement>document.getElementById("nome")).value,
		            Morada: (<HTMLInputElement>document.getElementById("morada")).value,
		            Telefone: (<HTMLInputElement>document.getElementById("telefone")).value,
		            Email: (<HTMLInputElement>document.getElementById("email")).value,
		            NIF: (<HTMLInputElement>document.getElementById("NIF")).value,
		            NumCartao: (<HTMLInputElement>document.getElementById("numCartao")).value,
		            PrazoValidade: (<HTMLInputElement>document.getElementById("dataValidade")).value,
		            CodigoCVV: (<HTMLInputElement>document.getElementById("codigoCVV")).value,
                            hotel: this.hotel.nome,
                            custo: this.custo,
                            quartoId: this.tipoDeQuarto._id,
			    cliente: this.clienteID
		       }
    	});
    }
  }

  getReservas(){
    this.aPService.getReservas().subscribe(reservasList => {
      this.reservas = reservasList as Reserva[];
    });
  }

  goBack() {
    this.location.back();
  }

  getHotel() {
    if (this.hotelID) {
      this.hotelService.getHotel(this.hotelID).subscribe(hotel => {
        this.hotel = hotel;
        this.getTiposDeQuartos(hotel.quarto);
      });
    }
  }
 
  onSubmit(f: NgForm, id, botaoId) {
    const date1 = (<HTMLInputElement>document.getElementById("data")).value; 
    const date2 = (<HTMLInputElement>document.getElementById("dataF")).value;
    const dateIn = new Date(date1);
    const dateOut = new Date(date2);
    if(!f.valid){
	if(date1 == ""){
                alert("Data de Inicio Inválida");
        }else if(date2 == ""){
                alert("Data de Fim Inválida");
        }
	
	if(id == "terceiro"){
		const resTele = ((<HTMLInputElement>document.getElementById("telefone")).value).match("[+]{1}[0-9]{1,3} [0-9]{9}$");
		const resEmail = ((<HTMLInputElement>document.getElementById("email")).value).match("[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,}$");
		const resNif = ((<HTMLInputElement>document.getElementById("NIF")).value).length == 9;
		if( resTele == null ){
			alert("Telefone Inválido: formato incorreto");
		}else if( resEmail == null ){
			alert("Email Inválido: formato incorreto");
		}else if( !resNif ){
			alert("NIF Inválido: tem de ter 9 digitos");
		}else{
			alert("Todos os campos devem estar preenchidos");
		}
		
	}
    }

   if (f.valid) {
	if( dateIn.getTime() < new Date(this.datepipe.transform(new Date(), 'yyyy-MM-dd')).getTime()){
            alert("Data de Check-in inválida: Não pode fazer check-in no passado");
	}else if(dateIn.getTime() < dateOut.getTime()){ 
       		document.getElementById(id).setAttribute("style", "display:block");
       		document.getElementById(botaoId).setAttribute("style", "display:none");
	}else{	
		alert("Data de Inicio não é uma data anterior à data de fim ");
	}
    }
  } 

  calculaCusto(){
      
        var dataEpocaAltaInicio = new Date(this.esteAno, 5, 1);
    	var dataEpocaAltaFim = new Date(this.esteAno, 8, 29);
  	let d1 = new Date((<HTMLInputElement>document.getElementById("data")).value);
  	let d2 = new Date((<HTMLInputElement>document.getElementById("dataF")).value);
        let tipoQuarto: TipoDeQuarto;
    	let i = 0;
    	for (i = 0; i < this.quartos.length; i++) {
        if (this.quartos[i].tipo == (<HTMLInputElement>document.getElementById("quartos")).value)
              tipoQuarto = this.quartos[i];
    	}
        if (tipoQuarto == undefined) 
        	tipoQuarto = this.tipoDeQuarto;
  	if (d1.toString() != "Invalid Date" && d2.toString() != "Invalid Date") {
    	  	let nNoites = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    		if( nNoites >= 0 && d1.getTime() >= dataEpocaAltaInicio.getTime() && d2.getTime() <= dataEpocaAltaFim.getTime() ) {
      			this.custo = tipoQuarto.precoEpocaAlta * nNoites;
    		} else if (nNoites >= 0 && (d1 < dataEpocaAltaInicio && d2 <= dataEpocaAltaInicio) || (d1 >= dataEpocaAltaFim && d2 > dataEpocaAltaFim)){
                        this.custo = tipoQuarto.precoEpocaBaixa * nNoites;
    		} else if (nNoites >= 0) {
                        this.custo = 0;
                	let nDias = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
                	let dia = new Date(d1.toString());
                	for (var abc = 0; abc < nDias; abc++) {
                        	if (dia >= new Date(this.esteAno,5, 1) && dia < new Date(this.esteAno, 8, 29))
                                	this.custo += tipoQuarto.precoEpocaAlta;
                       	 	else
                                	this.custo += tipoQuarto.precoEpocaBaixa;
                        	dia.setDate( dia.getDate() + 1 );
                	}
		} 
		else {
                	this.custo = 0;	
		}			
  	}
  }

  getTipoDeQuarto() {
    if (this.tipoDeQuartoID) {
      this.quartoService.getTipoDeQuarto(this.tipoDeQuartoID).subscribe(tipoDeQuarto => {
        this.tipoDeQuarto = tipoDeQuarto;
        this.calculaCusto();
      });
    }
  }

  getTiposDeQuartos(ids){    
    var i = 0;
    for(i = 0; i< ids.length; i++) {
        this.quartoService.getTipoDeQuarto( ids[i]).subscribe(q => {
        this.quartos.push(q);
      })
    }
  }
  
  filtroDatas(){
    let dataI = (<HTMLInputElement>document.getElementById("data")).value;
    let dataF = (<HTMLInputElement>document.getElementById("dataF")).value;
    var tipoDeQuartosAvailable = [] as TipoDeQuarto[];
    var j = 0;
    for (var i = 0; i < this.quartos.length; i++) {
      var quartoHotel = this.quartos[i];
      var available = 0;
      available = quartoHotel.nQuarto;
      for(var g = 0; g < this.reservas.length; g++){
        if(this.reservas[g].tipoDeQuarto == quartoHotel.tipo && this.reservas[g].hotel == this.hotel.nome) {
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
        }                                                                                                                                                                       if (estahDisponivel) {                                                                                                                                                          tipoDeQuartosAvailable[j] = this.quartos[i] as TipoDeQuarto;
                j++;                                                     
        }     
      } 
    }
    let tipo = (<HTMLInputElement>document.getElementById("quartos")).value;
    if (!this.contemQuarto(tipoDeQuartosAvailable, tipo)) {
	alert("O tipo de quarto selecionado está lotado nas datas escolhidas");
        (<HTMLInputElement>document.getElementById("concluir")).disabled = true;
    }
    else { 
    	(<HTMLInputElement>document.getElementById("concluir")).disabled = false;
    }
    this.calculaCusto();
  }

  contemQuarto(quarto, valor){
    for(var i = 0; i < quarto.length; i++){
      if(quarto[i].tipo == valor){
        return true;
      }
    }
    return false;
  }
}
