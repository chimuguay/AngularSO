import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
	providedIn: 'root'
})
export class ApiService {

	token;
	baseUrl: string;
	public id;

	constructor(public _http: HttpClient) {
		this.baseUrl = "ec2-100-24-59-152.compute-1.amazonaws.com/api/v1/";
	}


	login(user): Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.baseUrl + 'rest-auth/login/', user, { headers: headers });
	}

	create(user: User): Observable<any> {
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token ' + this.token);
		console.log(params);
		return this._http.post(this.baseUrl + 'alumno_lista/', params, { headers: headers });
	}


	getUsers(): Observable<any> {
		this.token = localStorage.getItem('token');
		this.getToken();
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token ' + this.token);
		console.log(this.token);

		return this._http.get(this.baseUrl + 'alumno_lista/', { headers: headers });
	}

	getUser(id): Observable<any> {
		//let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.getToken());
		return this._http.get(this.baseUrl + 'user/' + this.id);
	}

	updateUser(id, user: User): Observable<any> {
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token ' + this.token);
		return this._http.put(this.baseUrl + 'alumno_detalles/' + id, params, { headers: headers });
	}


	deleteUser(id, user: User): Observable<any> {
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token ' + this.token);
		return this._http.put(this.baseUrl + 'alumno_detalles/' + id, params, { headers: headers });
	}

	getCarreras(): Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token ' + this.token);
		return this._http.get(this.baseUrl + 'carrera_lista/', { headers: headers });
	}


	getToken() {
		let token = localStorage.getItem('token');
		if (token != "undefined")
			this.token = token;
		else
			this.token = null
		return this.token;
	}
}
