import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { Pessoa } from '../models/pessoa.model';
import { AvatarService } from '../services/avatar.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  profile: any = null;
  userPersonalData!:Pessoa


  constructor(
    private firebaseService:FirebaseService,
    private authService:AuthService,
    private auth:Auth,
    private avatarService:AvatarService

  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
     });
     this.firebaseService.encontrarPorId(this.auth.currentUser!.uid).subscribe({
      next:(res)=>{
        this.userPersonalData = res;
      }
     })
  }

  ngOnInit(): void {

  }

  editar(id:number){
    console.log(id)
    const aluno = this.userPersonalData.alunos.filter(alunos => alunos.id == id)[0];
    console.log(aluno)
  }

}
