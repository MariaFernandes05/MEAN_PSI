import { Component, OnInit } from '@angular/core';
import {TipoDeQuartoService} from '../tipo-de-quarto.service';
import {TipoDeQuarto} from 'src/tipo-de-quarto';

@Component({
  selector: 'app-tipos-de-quarto',
  templateUrl: './tipos-de-quarto.component.html',
  styleUrls: ['./tipos-de-quarto.component.css']
})
export class TiposDeQuartoComponent implements OnInit {

  constructor(private tipoQuartoService: TipoDeQuartoService) { }

  tiposQuartos: TipoDeQuarto[] = [];

  ngOnInit(): void {
  }
}
