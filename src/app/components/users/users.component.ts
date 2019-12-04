import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  users: User[];
  user: User;
  carreras: any[];
  status;

  constructor(
    private apiService: ApiService
  ) {
    this.user = new User("", "", "", "", "", "", "", "");
  }

  ngOnInit() {
    this.apiService.getUsers().subscribe(response => {
      console.log(response);
      this.users = response;
      this.edit = 'false';
      this.getCarreras();
      this.status = '';
    })


  }

  async renameCarreras() {
    await console.log(this.carreras);
    console.log(this.users);
    this.users.forEach(async user => {
      console.log(parseInt(user.carrera));
      let index = this.carreras.findIndex(i => i.id === user.carrera);
      user.carrera = await this.carreras[index].nombre_carrera;
    })
  }

  getCarreras() {
    this.apiService.getCarreras().subscribe(async response => {

      this.carreras = await response;
      console.log(response);
      this.renameCarreras();
    })

  }

  setCarrera(id) {
    this.user.carrera = id;
  }

  edit = 'false';
  item
  editUser(id) {
    this.edit = 'true';
    this.item = this.users.find(i => i.id === id);
    let index = this.users.findIndex(i => i.id === id);
    this.user = this.users[index];
  }

  editNow() {
    this.apiService.updateUser(this.item.id, this.user).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    },
    error => {
      this.status = 'error';
    })
  }

  deleteUser(id) {

    let item = this.users.find(i => i.id === id);
    let index = this.users.findIndex(i => i.id === id);
    this.user = this.users[index];
    this.user.carrera = '2';
    this.user.erase = 'true';

    this.apiService.deleteUser(item.id, this.user).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    })
  }

  busqueda: string;
  usersAux: User[];
  buscar() {
    if (this.busqueda == '') {
      this.ngOnInit();
    } else {
      console.log(this.busqueda);
      let nombresMin = this.users.filter(users => {
        return users.nombre.toLowerCase().includes(this.busqueda);
      })
      let nombresMay = this.users.filter(users => {
        return users.nombre.toUpperCase().includes(this.busqueda);
      })

      let edadesMin = this.users.filter(users => {
        return users.edad.toLowerCase().includes(this.busqueda);
      })
      let edadesMay = this.users.filter(users => {
        return users.edad.toUpperCase().includes(this.busqueda);
      })

      let carrerasMin = this.users.filter(users => {
        return users.carrera.toLowerCase().includes(this.busqueda);
      })
      let carrerasMay = this.users.filter(users => {
        return users.carrera.toUpperCase().includes(this.busqueda);
      })

      this.usersAux = this.users;
      this.users = nombresMin.concat(edadesMin).concat(carrerasMin)
      .concat(nombresMay).concat(carrerasMay).concat(edadesMay);
    }

  }


}
