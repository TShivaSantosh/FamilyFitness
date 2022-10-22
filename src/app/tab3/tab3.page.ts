import { Component, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { MemberNotification } from '../model/member-notification.model';
import { AddFamilyMemberService } from '../services/add-family-member.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  notifications: MemberNotification[];
  constructor(private addFamilyMemberService: AddFamilyMemberService) { }

  ngOnInit() {
    this.fetchNotifications()
      .subscribe((notifications) => {
        this.notifications = notifications;
      });
  }

  fetchNotifications() {
    return this.addFamilyMemberService
      .pendingRequests()
      .pipe(map((notifications: MemberNotification[]) => {
        return notifications.filter((notification) => notification.status === 2)
      }))
  }

  acceptRequest(depedantId: string) {
    this.addFamilyMemberService.acceptRequest(1, depedantId)
      .pipe(mergeMap(() => {
        return this.fetchNotifications()
      })).subscribe((notifications) => {
        this.notifications = notifications;
      });
  }

  rejectRequest(depedantId: string) {
    this.addFamilyMemberService.acceptRequest(0, depedantId)
      .pipe(mergeMap(() => {
        return this.fetchNotifications()
      })).subscribe((notifications) => {
        this.notifications = notifications;
      });;
  }

}
