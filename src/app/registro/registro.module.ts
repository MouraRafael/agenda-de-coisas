import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';
import { HttpClientModule } from '@angular/common/http';
import { CorreiosService } from '../services/correios.service';
import { FirebaseService } from '../services/firebase.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistroPageRoutingModule,
    HttpClientModule
  ],
  declarations: [RegistroPage],
  providers:[CorreiosService,FirebaseService]
})
export class RegistroPageModule {}
