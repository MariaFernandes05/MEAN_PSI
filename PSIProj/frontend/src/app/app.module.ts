import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadeiaDeHoteisComponent } from './cadeia-de-hoteis/cadeia-de-hoteis.component';
import { HotelComponent } from './hotel/hotel.component';
import { TiposDeQuartoComponent } from './tipos-de-quarto/tipos-de-quarto.component';
import { TipoDeQuartoComponent } from './tipo-de-quarto/tipo-de-quarto.component';
import { ReservaComponent } from './reserva/reserva.component';
import { DatePipe } from '@angular/common';
import { PopupComponent } from './popup/popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AreaPessoalComponent } from './area-pessoal/area-pessoal.component';
import { EditarReservaComponent } from './editar-reserva/editar-reserva.component';
import { LoginComponent } from './login/login.component';
import { ClienteComponent } from './cliente/cliente.component'; 


@NgModule({
  declarations: [
    AppComponent,
    CadeiaDeHoteisComponent,
    HotelComponent,
    TiposDeQuartoComponent,
    TipoDeQuartoComponent,
    ReservaComponent,
    PopupComponent,
    AreaPessoalComponent,
    EditarReservaComponent,
    LoginComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientJsonpModule,
    ReactiveFormsModule, 
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ PopupComponent ]
})
export class AppModule { }
