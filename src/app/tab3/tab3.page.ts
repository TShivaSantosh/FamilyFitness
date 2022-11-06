import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { finalize, map, mergeMap } from 'rxjs/operators';
import { MemberNotification } from '../model/member-notification.model';
import { AddFamilyMemberService } from '../services/add-family-member.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  notifications: MemberNotification[];
  constructor(private addFamilyMemberService: AddFamilyMemberService,
    private cd: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    return this.addFamilyMemberService
      .pendingRequests()
      .pipe(map((notifications: MemberNotification[]) => {
        return notifications.filter((notification) => notification.status === 2)
      })).subscribe((notifications) => {
        this.notifications = notifications;
        this.cd.markForCheck();
      });
  }

  acceptRequest(depedantId: string) {
    this.addFamilyMemberService.acceptRequest(1, depedantId)
      .pipe(finalize(() => {
        return this.fetchNotifications()
      })).subscribe();
  }

  rejectRequest(depedantId: string) {
    this.addFamilyMemberService.acceptRequest(0, depedantId)
      .pipe(finalize(() => {
        return this.fetchNotifications()
      })).subscribe();
  }

  getPendingNotifications() {
    this.fetchNotifications()
  }

}
