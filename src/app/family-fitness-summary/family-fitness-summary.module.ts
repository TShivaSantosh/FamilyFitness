import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilyFitnessSummaryPageRoutingModule } from './family-fitness-summary-routing.module';

import { FamilyFitnessSummaryPage } from './family-fitness-summary.page';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgChartsModule,
    FamilyFitnessSummaryPageRoutingModule
  ],
  declarations: [FamilyFitnessSummaryPage],
  exports: [FamilyFitnessSummaryPage]
})
export class FamilyFitnessSummaryPageModule {}
