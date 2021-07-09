import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadeiaDeHoteisComponent} from './cadeia-de-hoteis/cadeia-de-hoteis.component';
import { TiposDeQuartoComponent } from './tipos-de-quarto/tipos-de-quarto.component';
import { HotelComponent } from './hotel/hotel.component';
import { TipoDeQuartoComponent } from './tipo-de-quarto/tipo-de-quarto.component';
import { ReservaComponent } from './reserva/reserva.component';
import { AreaPessoalComponent } from './area-pessoal/area-pessoal.component';
import { EditarReservaComponent } from './editar-reserva/editar-reserva.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [ 
  { path: "cadeiaDeHoteis", component: CadeiaDeHoteisComponent },
  { path: "tiposDeQuarto", component: TiposDeQuartoComponent },
  { path: '', redirectTo:'cadeiaDeHoteis', pathMatch:'full'},
  { path: "hotel/:id", component: HotelComponent },
  { path: "tipoDeQuarto/:id", component: TipoDeQuartoComponent },
  { path: "reserva", component: ReservaComponent},
  { path: "areaPessoal", component: AreaPessoalComponent },
  { path: "editarReserva/:id", component: EditarReservaComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
