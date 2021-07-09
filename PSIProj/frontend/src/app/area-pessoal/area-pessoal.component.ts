import { Component, OnInit } from '@angular/core';
import { AreaPessoalService } from '../area-pessoal.service';
import { Reserva } from 'src/reserva';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { LoginService } from '../login.service';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";

@Component({
  selector: 'app-area-pessoal',
  templateUrl: './area-pessoal.component.html',
  styleUrls: ['./area-pessoal.component.css']
})
export class AreaPessoalComponent implements OnInit {
  
  clienteID = "";
  reservas: Reserva[]; 
  reservasFiltradas: Reserva[];
  minimo = 0;
  maximo = 0;
  dataHoje = new Date();
  reservasPassadas: Reserva[];
  reservasFuturas: Reserva[];

constructor(
	private aPService: AreaPessoalService,
	private location: Location,
	private datepipe: DatePipe,
	private route: ActivatedRoute,
        private loginService: LoginService,
	private router: Router 
) { }

ngOnInit(): void {
	this.route.queryParams.subscribe(params => {
            this.clienteID = params.cliente;

	});
	
	setTimeout(() => {
  		console.log(); this.getReservas();
	}, 500);
	
	//this.getReservas();
	//console.log(this.reservas);
}

goBack() {
    this.location.back();
}

onEdit(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

getReservas() {
 	this.loginService.getReservas(this.clienteID).subscribe(reservasList => {
      		this.reservas = reservasList as Reserva[];
		this.reservasFiltradas = reservasList as Reserva[];
		this.reservasPassadas = [];
		this.reservasFuturas = [];

		let i = 0;
		for(i = 0; i < this.reservas.length; i++){
			let custo = this.reservas[i].custo;
			//console.log(this.reservas[i].numCartao);
			if (this.minimo == 0){
         			this.minimo = custo > 0 ? custo : -3;
        		}
        		if(this.minimo > custo){ 
          			this.minimo = custo;
        		}
			if (this.maximo < custo){
        			this.maximo = custo;
        		}

			if( this.dataHoje >= new Date(this.reservas[i].dataCheckIn) ){
				this.reservasPassadas.push(this.reservas[i]);
			}else{
				this.reservasFuturas.push(this.reservas[i]);
			}
		}	

		(<HTMLInputElement>document.getElementById("min")).value = this.minimo.toString();
        	(<HTMLInputElement>document.getElementById("max")).value = this.maximo.toString();	
    	});	
  }
 
  editar(id: string) {
    let navigationExtras: NavigationExtras = {
            queryParams: {
                cliente: this.clienteID,
            }
    }
    this.router.navigate(['editarReserva/'+id], navigationExtras);
	
  }

  aplicarFiltro(){	
	let min = (<HTMLInputElement>document.getElementById("min")).value;
	let max = (<HTMLInputElement>document.getElementById("max")).value;
	let valorMin = parseInt(min);
	let valorMax = parseInt(max);	

        //US5
	
	var resPas = document.getElementById("passadas").children;
        var resFut = document.getElementById("futuras").children;
	var valPas;	
	var valFut;

        var i = 0;
        for (i = 0; i < 2; i++){
		var j = 0;
                if(i==0){
			for(j=0; j<resPas.length; j++){
				valPas = parseInt(resPas[j].children[0].children[2].children[1].innerHTML);
				
				if( valPas > valorMax || valPas < valorMin ){
                        		resPas[j].setAttribute("style", "visibility:hidden");
                        		resPas[j].setAttribute("style", "display:none");
                		}else if( valPas >= valorMin && valPas <= valorMax ){
                        		resPas[j].setAttribute("style", "display:block");
                        		resPas[j].setAttribute("style", "visibility:visible");
                		}else{
                        		//mensagem de erro?
                		}		
			}
		}else if(i==1){
                        for(j=0; j<resFut.length; j++){
                        	valFut = parseInt(resFut[j].children[0].children[2].children[1].innerHTML);
                        	
				 if( valFut > valorMax || valFut < valorMin ){
                                        resFut[j].setAttribute("style", "visibility:hidden");
                                        resFut[j].setAttribute("style", "display:none");
                                }else if( valFut >= valorMin && valFut <= valorMax ){
                                        resFut[j].setAttribute("style", "display:block");
                                        resFut[j].setAttribute("style", "visibility:visible");
                                }else{
                                        //mensagem de erro?
                                }
				
			}
		}
        }
	
	
  }
   
  filtroDatas(){
	let dataI = new Date((<HTMLInputElement>document.getElementById("dataI")).value);
   	let dataF = new Date((<HTMLInputElement>document.getElementById("dataF")).value);

	//US5
	var resPas = document.getElementById("passadas").children;
        var resFut = document.getElementById("futuras").children;
        var dataCheckIn;
        var dataCheckOut;

	if( dataI.toString() != "Invalid Date" && dataF.toString() != "Invalid Date" ){
		var i = 0;
		var j = 0;
                for (i = 0; i < 2; i++){
			if(i==0){
                      		for(j=0; j<resPas.length; j++){
                                	dataCheckIn = new Date(resPas[j].children[0].children[3].children[1].innerHTML);
					dataCheckOut = new Date(resPas[j].children[0].children[4].children[1].innerHTML);
					
					 if( dataI <= dataCheckIn && dataF >= dataCheckIn ){
                                		resPas[j].setAttribute("style", "display:block");
                                		resPas[j].setAttribute("style", "visibility:visible");
                        		}else{
                                		resPas[j].setAttribute("style", "visibility:hidden");
                                		resPas[j].setAttribute("style", "display:none");
                        		}
                        	}	

			}else if(i==1){
                                for(j=0; j<resFut.length; j++){
                                        dataCheckIn = new Date(resFut[j].children[0].children[3].children[1].innerHTML);
					dataCheckOut = new Date(resFut[j].children[0].children[4].children[1].innerHTML);

                                         if( dataI <= dataCheckIn && dataF >= dataCheckIn ){
                                                resFut[j].setAttribute("style", "display:block");
                                                resFut[j].setAttribute("style", "visibility:visible");
                                        }else{
                                                resFut[j].setAttribute("style", "visibility:hidden");
                                                resFut[j].setAttribute("style", "display:none");
                                        }

				}
			}
		}
	}
  }


}
