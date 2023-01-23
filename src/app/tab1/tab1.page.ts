import { Component, OnInit } from '@angular/core';
import { AvatarService } from '../services/avatar.service';

import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FirebaseService } from '../services/firebase.service';

import { Pessoa } from '../models/pessoa.model';
import { Auth } from '@angular/fire/auth';
import { Aluno } from '../models/aluno.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  profile: any = null;
  userPersonalData!:Pessoa;

  aluno!:Aluno;
  alunoForm!:FormGroup;


  constructor(
    private avatarService: AvatarService,
    private firebaseService:FirebaseService,
    private auth:Auth,
    private router:Router
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
     });

     this.firebaseService.encontrarPorId(this.auth.currentUser!.uid).subscribe(res=>{
      this.userPersonalData = res
    })
  }

  ngOnInit(): void {
    this.firebaseService.encontrarPorId(this.auth.currentUser!.uid).subscribe(res=>{
      this.userPersonalData = res
    })

    this.alunoForm = new FormGroup({
      nome:new FormControl('',[Validators.required]),
      observacoes: new FormControl('')
    })
  }
  cadastraAluno(){
    let aluno = this.alunoForm.getRawValue() as Aluno;
    let id;
    if(!this.userPersonalData.alunos) this.userPersonalData.alunos = [];

    if(this.userPersonalData.alunos.length == 0){
      id = 1;
    }else{
      id = this.userPersonalData.alunos.length;
    }
    aluno.id = id;

    this.userPersonalData.alunos.push(aluno)
    this.firebaseService.atualizar(this.userPersonalData).then(()=>{
      this.router.navigateByUrl('home/tabs/tab2');
    })

  }










}
