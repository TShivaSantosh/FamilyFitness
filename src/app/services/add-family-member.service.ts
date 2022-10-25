import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UserRegistration } from '../model/user-registration.model';
import { UserRegistrationService } from './user-registration.service';
import { get } from 'lodash';
import { MemberNotification } from '../model/member-notification.model';
@Injectable({
  providedIn: 'root'
})
export class AddFamilyMemberService {

  constructor(private userRegistrationService: UserRegistrationService, private httpClient: HttpClient) { }

  requestTrackerDataAcess(gmaiLId: string, relationship: string) {
    return this.userRegistrationService.userId$
      .pipe(
        mergeMap((userObject: UserRegistration) => {
          return from(this.httpClient.post('http://localhost:8080/familyfitness/trackerdata/request', {
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
          return from(this.httpClient.get(`http://localhost:8080/familyfitness/trackerdata/notifications`, {
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
        return from(this.httpClient.post('http://localhost:8080/familyfitness/trackerdata/accept', {
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
        return from(this.httpClient.get(`http://localhost:8080/familyfitness/trackerdata/familymembers`, {
          headers: {
            "user_id": get(userObject, 'userId', '1')
          }
        })
        )
      })) as Observable<MemberNotification[]>
  }
}


