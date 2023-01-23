import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-senha-esquecida',
  templateUrl: './senha-esquecida.component.html',
  styleUrls: ['./senha-esquecida.component.scss'],
})
export class SenhaEsquecidaComponent implements OnInit {
  senhaEsquecidaForm!:FormGroup
  constructor(
    private modalCtrl:ModalController,
    private authService:AuthService,
    private alertController:AlertController

  ) { }

  ngOnInit() {
    this.senhaEsquecidaForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email])
    })
  }

  recuperarEmail(){

    this.authService.esqueciSenha(this.email).catch((err)=>{


        console.error(err)
        this.alerta('e-mail incorreto ou não localizado')

    })
  }
  async alerta(mensagem:string){
    const alert = await this.alertController.create({
      header:'Dados Invállidos para recuperação de senha',
      message: `Houve um erro ao realizar ao tentar recuperar sua senha:<br><br> ${mensagem}`,
      buttons:['OK']

    })
    return await alert.present()
  }

  fechar(){

    this.modalCtrl.dismiss(null,'cancel')
  }
  get email(){return this.senhaEsquecidaForm.get('email')!.getRawValue()}
}
