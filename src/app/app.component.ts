import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Alumnos';
  identity;

  constructor(private router: Router, private apiService: ApiService){

  }

  ngOnInit(){
    this.identity = this.apiService.getToken()
    console.log(this.identity);
    if(this.identity == null){
      this.router.navigate(['/login']);
    }else
      this.router.navigate(['/home']);
    // this.router.navigate(['/login']);
  }
}
