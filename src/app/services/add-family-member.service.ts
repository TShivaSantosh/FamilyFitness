import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UserRegistration } from '../model/user-registration.model';
import { UserRegistrationService } from './user-registration.service';
import { get } from 'lodash';
import { MemberNotification } from '../model/member-notification.model';
import { AppSettings } from '../app.settings';
@Injectable({
  providedIn: 'root'
})
export class AddFamilyMemberService {

  refreshFamilyMembers$ = new Subject<Boolean>();

  constructor(private userRegistrationService: UserRegistrationService, private httpClient: HttpClient) { }

  requestTrackerDataAcess(gmaiLId: string, relationship: string) {
    return this.userRegistrationService.userId$
      .pipe(
        mergeMap((userObject: UserRegistration) => {
          return from(this.httpClient.post(`${AppSettings.localhost}/familyfitness/trackerdata/request`, {
            "dependantEmail": "shivasantosh01@gmail.com",
            "relationship": "Brother"
          }, {
            observe: 'response',
            headers: {
              "user_id": get(userObject, 'userId', '1')
            }
          }
          ))
        }
        ))
  }

  pendingRequests(): Observable<MemberNotification[]> {
    return this.userRegistrationService.userId$
      .pipe(
        mergeMap((userObject: UserRegistration) => {
          return from(this.httpClient.get(`${AppSettings.localhost}/familyfitness/trackerdata/notifications`, {
            headers: {
              "user_id": get(userObject, 'userId', '1')
            }
          }
          ))
        })) as Observable<MemberNotification[]>
  }

  acceptRequest(status: number, depedantId: string) {
    return this.userRegistrationService.userId$
    .pipe(
      mergeMap((userObject: UserRegistration) => {
        return from(this.httpClient.post(`${AppSettings.localhost}/familyfitness/trackerdata/accept`, {
          "status": status,
          "userId": depedantId
        }, {
          observe: 'response',
          headers: {
            "user_id": get(userObject, 'userId', '1')
          }
        }
        ))
      }
      ))
  }

  getFamilyMembers() {
    return this.userRegistrationService.userId$
    .pipe(
      mergeMap((userObject: UserRegistration) => {
        return from(this.httpClient.get(`${AppSettings.localhost}/familyfitness/trackerdata/familymembers`, {
          headers: {
            "user_id": get(userObject, 'userId', '1')
          }
        })
        )
      })) as Observable<MemberNotification[]>
  }
}


