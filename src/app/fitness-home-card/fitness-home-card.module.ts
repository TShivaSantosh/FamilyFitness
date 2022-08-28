import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FitnessHomeCardComponent } from './fitness-home-card.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [FitnessHomeCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FitnessHomeCardComponent]
})
export class FitnessHomeCardModule { }
