import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormGroup, FormControl, FormArray, FormBuilder, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Location } from '@angular/common';
import { AreaPessoalService } from '../area-pessoal.service';
import { Reserva } from 'src/reserva';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

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
    
    clienteID = "";  
    errorMessage = "";
    form: FormGroup;
    codigoCVV = "";
    email = "";
    morada = "";
    NIF = "";
    nome = "";
    numCartao = "";
    prazoValidade = "";
    telefone = "";
    data = "";
    dataF = "";
    tipoDeQuarto = "";
    description = [];
    hotel = "";
    custo = 0;
    quartoId = "";

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<PopupComponent>,
        private location: Location,
        private aPService: AreaPessoalService,
        @Inject(MAT_DIALOG_DATA) data) {
      
        this.description = data;
        this.codigoCVV = data.CodigoCVV;
        this.email = data.Email; 
        this.morada = data.Morada; 
        this.NIF = data.NIF; 
        this.nome = data.Nome; 
        this.numCartao = data.NumCartao; 
        this.prazoValidade = data.PrazoValidade; 
        this.telefone = data.Telefone;
        this.data = data.data;
        this.dataF = data.dataF;
        this.tipoDeQuarto = data.tipoDeQuarto; 
        this.hotel = data.hotel;
        this.custo = data.custo;
        this.quartoId = data.quartoId;
        this.clienteID = data.cliente;
    }

    ngOnInit() {
        this.form = this.fb.group({
            description: [this.description, []],
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

    createReserva() {
    
    	this.reserva.hotel = this.hotel;
    	this.reserva.tipoDeQuarto = this.tipoDeQuarto;
    	this.reserva.custo = this.custo;
    	this.reserva.dataCheckIn = this.data;
        this.reserva.dataCheckOut = this.dataF;
        this.reserva.numeroCartao = this.numCartao;
        this.reserva.dataValidade = this.prazoValidade;
        this.reserva.cvv = this.codigoCVV;
        this.reserva.quartoId = this.quartoId;
        this.reserva.cliente = this.clienteID;
	this.aPService.createReserva(this.reserva).subscribe(result => {
        	this.errorMessage = result.message;
    	});     
 	this.dialogRef.close();                                                                                                                                                 this.location.back();
  }
}
