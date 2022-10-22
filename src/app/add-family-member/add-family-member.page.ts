import { Component, OnInit } from '@angular/core';
import { AddFamilyMemberService } from '../services/add-family-member.service';

@Component({
  selector: 'app-add-family-member',
  templateUrl: './add-family-member.page.html',
  styleUrls: ['./add-family-member.page.scss'],
})
export class AddFamilyMemberPage implements OnInit {

  emailId;
  formdata;
  value: string="father";

  constructor(private addFamilyMemberService: AddFamilyMemberService) { }

  ngOnInit() {
  }


  selectedRelationShip(event) {
    this.value = event.detail.value;
  }

  save() {
    this.addFamilyMemberService
    .requestTrackerDataAcess(this.emailId, this.value.toLowerCase())
    .subscribe();
  }

  cancel() {

  }

}
