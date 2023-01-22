import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Auth, user } from '@angular/fire/auth';
import { FirebaseService } from '../services/firebase.service';
import { Pessoa } from '../models/pessoa.model';
import { CorreiosService } from '../services/correios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Endereco } from '../models/endereco.model';
import { AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AvatarService } from '../services/avatar.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  profile: any = null;
  userPersonalData!:Pessoa
  editaForm!:FormGroup
  validaEmail = true;

  constructor(
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService:AuthService,
    private auth:Auth,
    private firebaseService:FirebaseService,
    private correiosService:CorreiosService,
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
     });
  }

  ngOnInit(): void {
    this.editaForm = new FormGroup({
      nome: new FormControl('',[Validators.required/*,Validators.pattern(/^[a-zA-Z]/),Validators.minLength(6),Validators.maxLength(60)*/]),

      email: new FormControl('',[Validators.required/*,Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i)*/]),
      cpf: new FormControl('',[Validators.required/*,Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)*/]),
      endereco: new FormGroup({
        cep: new FormControl('',[Validators.required]),
        uf: new FormControl('',[Validators.required]),
        localidade: new FormControl('',[Validators.required]),
        bairro: new FormControl('',[Validators.required]),
        logradouro: new FormControl('',[Validators.required]),
        numero: new FormControl('',[Validators.required, Validators.maxLength(5), Validators.minLength(1)])
      })
    })

    this.firebaseService.encontrarPorId(this.auth.currentUser!.uid).subscribe(res=>{
      this.userPersonalData = res
      this.carregaForm();
    })




  }


  verificaEmail(){}
  editar(){
    const newData = this.editaForm.getRawValue() as Pessoa;
    this.userPersonalData.nome = newData.nome;
    this.userPersonalData.endereco = newData.endereco;
    this.userPersonalData.cpf = newData.cpf;

    this.firebaseService.atualizar(this.userPersonalData)
  }













  carregaEndereco(){
    const cep = this.editaForm.get('endereco')?.get('cep')?.value;
    this.correiosService.pegaEndereco(cep).subscribe({
      next:(end:Endereco)=>{
        console.log(end)
        this.editaForm.get('endereco')?.patchValue({
          cep:end.cep,
          uf: end.uf,
          localidade: end.localidade,
          bairro: end.bairro,
          logradouro: end.logradouro
        })
      }
    })
  }

  carregaForm(){
    console.info('\n\n\n\n',this.userPersonalData)
    this.editaForm.patchValue({
      nome: this.userPersonalData.nome,


      cpf: this.userPersonalData?.cpf,
      endereco: this.userPersonalData?.endereco,
    })
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    console.log(image);

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
