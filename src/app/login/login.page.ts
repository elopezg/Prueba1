import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController, private router: Router, public storage : StorageService) { 
    this.formularioLogin = this.fb.group({
      'nombreLogin': new FormControl("", Validators.required), // Cambio de 'nombre' a 'nombreLogin'
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async ingresar() {
    if (this.formularioLogin.valid) {
      const f = this.formularioLogin.value;

      // Obtén la lista de usuarios registrados desde el localStorage
      const usuariosJSON = await Preferences.get({ key: 'usuarios'});
      const usuarios: { nombre: string, password: string} [] = usuariosJSON && usuariosJSON.value ? JSON.parse(usuariosJSON.value) : [];
      // Busca al usuario por su nombre de usuario
      const user = usuarios.find((u: any) => u.usuario === f.nombre && u.password === f.password);

        if (user) {
          // Compara el nombre de usuario y la contraseña ingresados
          await Preferences.set({ key: 'nombreUsuario', value: user.nombre});
          await Preferences.set({ key: 'nombreLogin', value: JSON.stringify(usuarios)});
          console.log("Sesión iniciada");
          this.router.navigate(['/home']);
          }else{
            const alert = await this.alertController.create({
              header: 'Datos incorrectos',
              message: 'Los datos que se ingresaron no son correctos.',
              buttons: ['Aceptar']
            });

            await alert.present();
          } 

      }else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos correctamente.',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
  }
}