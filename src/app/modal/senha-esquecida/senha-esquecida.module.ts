import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SenhaEsquecidaComponent } from './senha-esquecida.component';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SenhaEsquecidaComponent],
  exports:[SenhaEsquecidaComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[AuthService]
})
export class SenhaEsquecidaModule { }
