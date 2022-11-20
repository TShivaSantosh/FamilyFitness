import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MemberNotification } from '../model/member-notification.model';
import { AddFamilyMemberService } from '../services/add-family-member.service';

@Component({
  selector: 'app-fitnesshome',
  templateUrl: './fitness-home.component.html',
  styleUrls: ['./fitness-home.component.scss'],
})
export class FitnessHomeComponent implements OnInit {

  familyMembers: MemberNotification[]
  constructor(private router: Router, 
    private addFamilyMemberService: AddFamilyMemberService,
    private cd: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.getFamilyMembers();
    this.addFamilyMemberService.refreshFamilyMembers$
    .subscribe(() => {
      this.getFamilyMembers();
      this.cd.markForCheck();
    })
  }

  getFamilyMembers() {
    this
    .addFamilyMemberService
    .getFamilyMembers()
    .pipe(map((members: MemberNotification[]) => {
      return members.filter((member) => member.status === 1)
    })).subscribe((data) => {
      this.familyMembers = data;
    });
  }

  goToLinkedTrackers(member: MemberNotification) {
    this.router.navigate([`app/myfamily/shiva/linkedtrackers/${member.userId}`])
  }

}
