import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Pessoa } from '../models/pessoa.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFormGroup!:FormGroup
  usuarioNaoEncontrado = false;

  @ViewChild('loginFormGroupDirective') loginFormGroupDirective!:FormGroupDirective


  constructor(
    private router:Router,
    private authService:AuthService,
    private alertController:AlertController
  ) { }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      'email': new FormControl('',[Validators.required]),
      'senha': new FormControl('',[Validators.required])
    })
  }

  login(){
    const usuario = this.loginFormGroup.getRawValue() as Pessoa;

    this.authService.login(usuario).then(res=>{
      if(res){
        this.router.navigateByUrl('home/tabs/tab3')
      }
    }).catch(()=>{
      this.usuarioNaoEncontrado = true
      this.alerta();
    })
  }

async alerta(){
  const alert = await this.alertController.create({
    header:'Houve um erro ao realizar o login',
    message: 'Usuário e/ou senha não encontrados',
    buttons:['OK']

  })
  return await alert.present()
}


  cadastre(){
    this.router.navigateByUrl('registro',{replaceUrl:true})
  }

  get email(){return this.loginFormGroup.get('email')?.getRawValue}
  get senha(){return this.loginFormGroup.get('senha')?.getRawValue}
}
