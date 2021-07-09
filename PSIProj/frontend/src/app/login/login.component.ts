import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Cliente } from "src/cliente";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
    
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  clientes: Cliente[];
  cliente: Cliente = {
	_id:"",
	username:"",
	password:""
  };
  errorMessage = "";	

  constructor(
	private loginService: LoginService,
        private router: Router,
	private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
	this.getClientes();
  }

  getClientes(){
	this.loginService.getClientes().subscribe(clientesList => {
		this.clientes = clientesList as Cliente[];
		var i = 0;
		for(i = 0; i<this.clientes.length; i++){
                	if( this.cliente.username == this.clientes[i].username ){
                       		this.cliente._id = this.clientes[i]._id;
                        
				this.redirecionar();
                	}
		}
	});
  }
 
  redirecionar(){
    let navigationExtras: NavigationExtras = {
            queryParams: {
                cliente: this.cliente._id,
            }
    }
	
    this.router.navigate(['cadeiaDeHoteis'], navigationExtras);

 }

  validarInfo(){
	var username = (<HTMLInputElement>document.getElementById("username")).value;
	var password = (<HTMLInputElement>document.getElementById("password")).value;
	if( username != "" && password != ""){
		var i = 0;
		for(i = 0; i<this.clientes.length; i++){
			if( this.clientes[i].password == password && this.clientes[i].username == username ){
				this.cliente = this.clientes[i];
			}
			else if (this.clientes[i].username == username && this.clientes[i].password != password){
				alert("Credenciais Inválidas"); 
				return ;
			}
		}
		if(this.cliente.username != ""){ 
			this.redirecionar();
		}else{
			this.registar(username, password);
		}
	
	}else{
		alert("Credenciais Inválidas");
	}
  }

  registar(username: string, password: string){
	
	this.cliente.username = username;
	this.cliente.password = password;
	
	this.loginService.criarClient(this.cliente).subscribe( result => {
		this.errorMessage = result.message;
		this.getClientes();	
	});	
		
	this.redirecionar();
   }

}
