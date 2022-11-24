import { Component, OnInit } from '@angular/core';
import { AddFamilyMemberService } from '../services/add-family-member.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-add-family-member',
  templateUrl: './add-family-member.page.html',
  styleUrls: ['./add-family-member.page.scss'],
})
export class AddFamilyMemberPage implements OnInit {

  emailId;
  formdata;
  value: string="father";

  constructor(private addFamilyMemberService: AddFamilyMemberService,
    public alertController: AlertController) { }

  ngOnInit() {
  }


  selectedRelationShip(event) {
    this.value = event.detail.value;
  }

  save() {
    this.addFamilyMemberService
    .requestTrackerDataAcess(this.emailId, this.value.toLowerCase())
    .subscribe(() => {
      this.presentAlert()
    });
  }

  presentAlert() {
    this.alertController.create({
      header: 'Add Family Member',
      message: 'Request has been sent to family member.',
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  cancel() {

  }

}
