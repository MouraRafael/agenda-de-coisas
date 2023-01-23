import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { Pessoa } from '../models/pessoa.model';
import { AvatarService } from '../services/avatar.service';
import { ModalController } from '@ionic/angular';
import { EditanotasComponent } from '../modal/editanotas/editanotas.component';


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
    private avatarService:AvatarService,
    private modalCtrl:ModalController

  ) {


  }

  ngOnInit(): void {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
     });
    this.buscar()
  }

  async editar(id:number){

    const aluno = this.userPersonalData.alunos.filter(alunos => alunos.id == id)[0];

    const modal = await this.modalCtrl.create({
      component:EditanotasComponent,
      componentProps:{
        'aluno':aluno,
        'pessoa': this.userPersonalData
      }
    })
    modal.onWillDismiss().then(
      event=>{
        if(event.role === 'cancel'){
          this.buscar();
        }
      }
    )

    return await modal.present();
  }

  async buscar(){
    await this.firebaseService.encontrarPorId(this.auth.currentUser!.uid).subscribe({
      next:(res)=>{
        this.userPersonalData = res;

      }
     })
  }

}
