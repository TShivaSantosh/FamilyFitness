import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFamilyMemberPageRoutingModule } from './add-family-member-routing.module';

import { AddFamilyMemberPage } from './add-family-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddFamilyMemberPageRoutingModule
  ],
  declarations: [AddFamilyMemberPage]
})
export class AddFamilyMemberPageModule {}
