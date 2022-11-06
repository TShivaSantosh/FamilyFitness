import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddFamilyMemberService } from '../services/add-family-member.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private router: Router, private addFamilyMemberService: AddFamilyMemberService) {}

  addFamilyMemeber() {
    this.router.navigate(['/app/myfamily/addfamilymember'])
  }

  getFamilyMembers() {
    this.addFamilyMemberService.refreshFamilyMembers$.next(true);
  }

}
