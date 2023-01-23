import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { EditanotasModule } from '../modal/editanotas/editanotas.module';
import { SenhaEsquecidaModule } from '../modal/senha-esquecida/senha-esquecida.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    EditanotasModule,
    SenhaEsquecidaModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
