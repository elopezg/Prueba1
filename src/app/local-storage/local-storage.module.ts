import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalStoragePageRoutingModule } from './local-storage-routing.module';

import { LocalStoragePage } from './local-storage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalStoragePageRoutingModule
  ],
  declarations: [LocalStoragePage]
})
export class LocalStoragePageModule {}
