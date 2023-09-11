import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router // Importa el Router para la navegación
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  async ingresar() {
    var f = this.formularioLogin.value;
    var usuarioString = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      var usuario = JSON.parse(usuarioString);
      if (usuario.nombre == f.nombre && usuario.password == f.password) {
        const alert = await this.alertController.create({
          message: 'Has ingresado con éxito',
          buttons: ['Aceptar'],
        });
        await alert.present();
        console.log('Ingresado');
        localStorage.setItem('ingresado', 'true');

        // Navega a la página de registro
        this.router.navigate(['/lector']);
      } else {
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Tienes que llenar todos los datos',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    } else {
      // Manejo de caso cuando no se encuentra el valor en localStorage
    }
  }
}
