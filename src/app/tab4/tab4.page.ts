import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddFamilyMemberService } from '../services/add-family-member.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {


  constructor(private addFamilyMembersService: AddFamilyMemberService) { }

  ngOnInit() {

  }

}
