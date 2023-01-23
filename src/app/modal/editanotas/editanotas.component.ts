import { Component, OnInit, Input } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Aluno } from 'src/app/models/aluno.model';
import { Pessoa } from 'src/app/models/pessoa.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-editanotas',
  templateUrl: './editanotas.component.html',
  styleUrls: ['./editanotas.component.scss'],
})
export class EditanotasComponent implements OnInit {
  @Input() aluno!:Aluno
  @Input() userId!:string
  alunoForm!:FormGroup


  constructor(
    private modalCtrl:ModalController,
    private auth:Auth,
    private firebaseService:FirebaseService
  ) { }

  ngOnInit() {
    this.alunoForm = new FormGroup({
      notaA: new FormControl(this.aluno.notaA,[Validators.min(0),Validators.max(10.0)]),
      notaB: new FormControl(this.aluno.notaB,[Validators.min(0),Validators.max(10.0)]),
      notaC: new FormControl(this.aluno.notaC,[Validators.min(0),Validators.max(10.0)]),
      notaD: new FormControl(this.aluno.notaD,[Validators.min(0),Validators.max(10.0)]),
      observacoes: new FormControl(this.aluno.observacoes,[Validators.min(0),Validators.max(10.0)])
    })
  }

  fechar(){
    this.modalCtrl.dismiss(null,'cancel')
  }


  editar(){
    const alunoEdita = this.alunoForm.getRawValue() as Aluno;
    this.aluno.notaA = alunoEdita.notaA
    this.aluno.notaB = alunoEdita.notaB
    this.aluno.notaC = alunoEdita.notaC
    this.aluno.notaD = alunoEdita.notaD


    this.firebaseService.encontrarPorId(this.userId).subscribe(res=>{
      const pessoa = res;
      //console.log(pessoa.alunos)
      pessoa.alunos = pessoa.alunos.filter(aluno => aluno.id !== this.aluno.id)
      //console.log(pessoa.alunos)
      pessoa.alunos.push(this.aluno)
      //console.log(pessoa.alunos)
      this.firebaseService.atualizar(pessoa).then(()=>{

      })

    })

  }
}
