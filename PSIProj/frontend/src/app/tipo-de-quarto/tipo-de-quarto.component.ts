import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { Location } from "@angular/common";

import {TipoDeQuartoService} from '../tipo-de-quarto.service';
import {TipoDeQuarto} from 'src/tipo-de-quarto';
import { Reserva } from 'src/reserva';

@Component({
  selector: 'app-tipo-de-quarto',
  templateUrl: './tipo-de-quarto.component.html',
  styleUrls: ['./tipo-de-quarto.component.css']
})
export class TipoDeQuartoComponent implements OnInit {
  
  

  constructor(
    private route: ActivatedRoute,
    private tipoDeQuartoService: TipoDeQuartoService,
    private formBuilder: FormBuilder,
    private location: Location) {

    this.tipoDeQuartoForm = this.formBuilder.group({
      tipo: this.formBuilder.control(""),
      nquartos: this.formBuilder.control(""),
      servicos: this.formBuilder.array([]),
      precoEpocaAlta: this.formBuilder.control(""),
      precoEpocaBaixa: this.formBuilder.control("")
     })
  }


  ngOnInit(): void {
    this.getTipoDeQuarto();
  }

  clienteID = "";
  tipoDeQuarto: TipoDeQuarto ={
    _id: "",
    tipo:"",
    nQuarto: 0,
    servicos: [],
    precoEpocaAlta: 0,
    precoEpocaBaixa: 0
  }

  errorMessage = "";
  updateOrCreate = false;
  buttonLabel = "Update";
  tipoDeQuartoForm: FormGroup;
  
  getTipoDeQuarto() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.tipoDeQuartoService.getTipoDeQuarto(id).subscribe(tipoDeQuarto => {
        this.tipoDeQuarto = tipoDeQuarto;
      });
    }
  }

  goBack() {
    this.location.back();
  }

  /*getQuartoInstanceAvailableCount() {
    this.tipoDeQuartoService.getQuartoInstanceAvailableCount().subscribe(count => {
      this.availableCount = count as number;
    });
  }*/

  //Vai buscar reservas todas
  


}
