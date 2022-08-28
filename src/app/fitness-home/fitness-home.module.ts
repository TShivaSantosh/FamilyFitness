import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FitnessHomeComponent } from './fitness-home.component';
import { FitnessHomeCardModule } from '../fitness-home-card/fitness-home-card.module';


@NgModule({
  declarations: [FitnessHomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    FitnessHomeCardModule
  ],
  exports: [FitnessHomeComponent]
})
export class FitnessHomeModule { }
