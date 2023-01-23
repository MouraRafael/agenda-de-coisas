import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EditanotasComponent } from './editanotas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';



@NgModule({
  declarations: [EditanotasComponent],
  exports:[EditanotasComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[FirebaseService,AuthService]
})
export class EditanotasModule { }
