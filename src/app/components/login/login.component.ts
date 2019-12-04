import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpClient } from 'selenium-webdriver/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


	public user: User;
	public status: string;
	public identity;
	public token;
	public _http: HttpClient;
	input;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private apiService: ApiService
	) {
		this.user = new User("", "", "", "", "", "", "", "");


	}

	ngOnInit() {
		this.input = {
			username: '',
			password: ''
		};
	}

	login() {
		this.apiService.login(this.input).subscribe(
			response => {
				console.log(response);

				if (response.key) {

					this.token = response.key;
					localStorage.setItem('token', this.token);
					this._router.navigate(['/home']);
				}

			},
			error => {
				var errorMessage = <any>error;
				if (errorMessage != null) {
					this.status = 'error';
				}
			})
	}

}


