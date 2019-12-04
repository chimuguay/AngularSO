import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';
import { HttpClient } from 'selenium-webdriver/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	public title: string;
	public user: User;
	public status: string;
	public identity;
	public token;
	public _http: HttpClient;
	public carreras;



	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private apiService: ApiService
	) {
		this.user = new User("", "", "", "", "", "", "", "false");


	}

	ngOnInit() {
		this.apiService.getCarreras().subscribe(response => {
			console.log(response);
			this.carreras = response;
			this.status = '';
		})
	}



	setCarrera(carrera) {
		this.user.carrera = carrera;
	}
	createUser() {
		this.apiService.create(this.user).subscribe(
			response => {
				console.log(response);
				this.status = 'success'

			},
			error => {
				console.log(<any>error);
				this.status = 'error'
			}
		);
	}




}
