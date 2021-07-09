import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Cliente } from 'src/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {
  
 cliente: Cliente = {
        _id:"",
        username:"",
        password:""
  };

  private clienteSource: BehaviorSubject<Cliente> = new BehaviorSubject(cliente); 
  public cliente1 = this.clienteSource.asObservable();

  public setCliente(clienteSet: Cliente) {
	this.clienteSource.next(clienteSet);
  }
}
