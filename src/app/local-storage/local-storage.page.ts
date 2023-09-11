import { Component } from '@angular/core';

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.page.html',
  styleUrls: ['./local-storage.page.scss'],
})
export class LocalStoragePage {
  usuario: string;
  password: string;

  constructor() {
    this.usuario = '';
    this.password = '';
  }

  buscarUsuario() {
    // Obtén el usuario del almacenamiento local
    const usuarioString = localStorage.getItem('usuario');

    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);

      // Verifica si el usuario ingresado coincide con el almacenado
      if (this.usuario === usuario.nombre) {
        this.password = usuario.password;
      } else {
        this.password = 'Usuario no encontrado';
      }
    } else {
      this.password = 'Usuario no encontrado';
    }
  }
}
