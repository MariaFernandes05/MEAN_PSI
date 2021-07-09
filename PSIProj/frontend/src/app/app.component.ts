import { Component} from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = "frontend";
 
  constructor(private router: Router) { 
  	router.events.subscribe(val => {
		if (val instanceof NavigationEnd) {
			if (val.url.split("cliente=", 2).length > 1)
				(<HTMLInputElement>document.getElementById("log")).innerHTML = "Logout"
		}
	});
  }

  log() {
        let client = this.router.url.split("cliente=", 2)[1];
        if (client != undefined) {
		let navigationExtras: NavigationExtras = {
            		queryParams: {
                		cliente: client,
            		}
        	}
        	this.router.navigate(['areaPessoal'], navigationExtras);	
	}
	else {
		this.router.navigate(['login']);
	}
  }
 
  inicio() {
        let client = this.router.url.split("cliente=", 2)[1];  
 	let navigationExtras: NavigationExtras = {
            queryParams: {
                cliente: client,
            }
    	}
    	this.router.navigate(['cadeiaDeHoteis'], navigationExtras);
  }
}
