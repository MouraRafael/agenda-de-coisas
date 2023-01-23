import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { CorreiosService } from '../services/correios.service';
import { Endereco } from '../models/endereco.model';
import { Pessoa } from '../models/pessoa.model';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  cadastroForm!:FormGroup
  validaUserName = true;
  validaEmail = true;
  statusSenha = false;


  @ViewChild('cadastroFormDirective') cadastroFormDirective!:FormGroupDirective

  constructor(
    private auth:AuthService,
    private firebaseService:FirebaseService,
    private correiosService:CorreiosService,
    private router:Router,
    private alertController:AlertController
  ) { }

  ngOnInit() {
    this.cadastroForm = new FormGroup({
      'nome': new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z]/),Validators.minLength(6),Validators.maxLength(60)]),
      'senha': new FormControl('',[Validators.required/*,Validators.pattern(/(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/)*/]),
      'confsenha': new FormControl('',[Validators.required]),
      'email': new FormControl('',[Validators.required,Validators.email]),
      'cpf': new FormControl('',[Validators.required,Validators.pattern(/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/)]),
      'endereco': new FormGroup({
        'cep': new FormControl('',[Validators.required]),
        'uf': new FormControl('',[Validators.required]),
        'localidade': new FormControl('',[Validators.required]),
        'bairro': new FormControl('',[Validators.required]),
        'logradouro': new FormControl('',[Validators.required]),
        'numero': new FormControl('',[Validators.required, Validators.maxLength(5), Validators.minLength(1)])
      })
    })
  }
  carregaEndereco(){
    const cep = this.cadastroForm.get('endereco')?.get('cep')?.value;
    this.correiosService.pegaEndereco(cep).subscribe({
      next:(end:Endereco)=>{
        console.log(end)
        this.cadastroForm.get('endereco')?.patchValue({
          cep:end.cep,
          uf: end.uf,
          localidade: end.localidade,
          bairro: end.bairro,
          logradouro: end.logradouro
        })
      }
    })
  }



  registra(){
    const pessoa = this.cadastroForm.getRawValue() as Pessoa;
    this.auth.registraUsuario(pessoa).then(
      res=>{
        if(res.user.uid){
          pessoa.id = res.user.uid;
          pessoa.alunos = []
          this.firebaseService.cadastra(pessoa);
          this.router.navigateByUrl('login')
        }
      }
    ).catch((err)=>{
      console.error(`Erro ao registrar: ${err}`)
      this.alerta();
    });

  }

  async alerta(){
    const alert = await this.alertController.create({
      header:'Erro ao cadastrar',
      message: 'e-mail já cadastrado',
      buttons:['OK']

    })
    return await alert.present()
  }


  verificaSenha(){
    this.statusSenha = (this.senha?.getRawValue() == this.confsenha?.getRawValue()) ? true : false;
    console.log(this.statusSenha)
  }



  get senha(){return this.cadastroForm.get('senha')}
  get confsenha(){return this.cadastroForm.get('confsenha')}


}
