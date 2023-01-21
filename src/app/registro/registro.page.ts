import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { CorreiosService } from '../services/correios.service';
import { Endereco } from '../models/endereco.model';
import { Pessoa } from '../models/pessoa.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  cadastroForm!:FormGroup
  validaUserName = true;
  validaEmail = true;

  @ViewChild('cadastroFormDirective') cadastroFormDirective!:FormGroupDirective

  constructor(
    private firebaseService:FirebaseService,
    private correiosService:CorreiosService
  ) { }

  ngOnInit() {
    this.cadastroForm = new FormGroup({
      'username': new FormControl('',[Validators.required]),
      'senha': new FormControl('',[Validators.required]),
      'nome': new FormControl('',[Validators.required/*,Validators.pattern(/^[a-zA-Z]/),Validators.minLength(6),Validators.maxLength(60)*/]),
    'email': new FormControl('',[Validators.required/*,Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i)*/]),
  'cpf': new FormControl('',[Validators.required/*,Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)*/]),
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
    this.firebaseService.registraUsuario(pessoa).then(
      res=>{
        if(res.user.uid){
          pessoa.uid = res.user.uid;

          this.firebaseService.cadastra(pessoa)
        }
      }
    );

  }
  verificaUsername(){}
  verificaEmail(){}

}
