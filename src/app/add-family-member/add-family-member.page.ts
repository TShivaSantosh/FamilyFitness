import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-family-member',
  templateUrl: './add-family-member.page.html',
  styleUrls: ['./add-family-member.page.scss'],
})
export class AddFamilyMemberPage implements OnInit {

  emailId;
  formdata;

  constructor() { }

  ngOnInit() {
  }

  onClickSubmit(data) {
    this.emailId = data.emailId;
  }

  presentPicker() {

  }

}
