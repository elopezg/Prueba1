import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage {
  usuario: any[] = [];

  nombreUsuarioInput: string = '';
  resultadoContrasena: string = '';

  constructor() { }

  async ngOnInit() {
    // Obtener la lista de usuarios desde las preferencias
    const usuariosPreferences = await Preferences.get({ key: 'usuarios' });
    if (usuariosPreferences && usuariosPreferences.value) {
      this.usuario = JSON.parse(usuariosPreferences.value);
    }
  }

  buscarContrasena() {
    const usuarioEncontrado = this.usuario.find(nombreLogin => nombreLogin.nombreLogin === this.nombreUsuarioInput);

    if (usuarioEncontrado) {
      this.resultadoContrasena = 'Contraseña encontrada: ' + usuarioEncontrado.password;
    } else {
      this.resultadoContrasena = 'Nombre de usuario no encontrado';
    }
  }
}
