import { Component, OnInit } from '@angular/core';
import { AvatarService } from '../services/avatar.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CorreiosService } from '../services/correios.service';
import { FirebaseService } from '../services/firebase.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Pessoa } from '../models/pessoa.model';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  profile: any = null;
  userPersonalData!:Pessoa;
  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private avatarService: AvatarService,
    private firebaseService:FirebaseService,
    private auth:Auth
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
