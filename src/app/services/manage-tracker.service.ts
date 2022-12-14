import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import { catchError, map, mergeMap, take, tap } from 'rxjs/operators';
import { ManageTrackers } from '../model/manage-trackers.model';
import { UserRegistration } from '../model/user-registration.model';
import { UserRegistrationService } from './user-registration.service';
import { get } from 'lodash';
import { TrackerData } from '../model/tracker-data.model';
import { AvailableTrackers } from '../model/available-trackers.model';
import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class ManageTrackersService {

  refreshManageTrackers$ = new Subject<Boolean>();
  refreshAvailableTrackersData$ = new Subject<Boolean>();

  constructor(private httpClient: HttpClient,
    private userRegistrationService: UserRegistrationService) { }

  manageTrackers(userId?: string): Observable<ManageTrackers[]> {
    return this.userRegistrationService.userId$
      .pipe(
        mergeMap((userObject: UserRegistration) => {
          const user_id =  userId || get(userObject, 'userId', '1')
          return from(
            this.httpClient
              .get(`${AppSettings.localhost}/familyfitness/managetrackers`,
                {
                  headers: {
                    user_id  
                  }
                }
              )
          )
        }),
        map((resp) => resp['trackers']),
        take(1)
      ) as Observable<ManageTrackers[]>; 
  }

  submitTrackerData(trackersData: TrackerData[], trackerId: number) {
    return this.userRegistrationService.userId$.pipe(
      mergeMap((userObject: UserRegistration) => {
        return from(this.httpClient.post(`${AppSettings.localhost}/familyfitness/managetrackers/${trackerId}/trackerdata`,
          trackersData, {
          headers: {
            "user_id": get(userObject, 'userId', '1')
          }
        }
        ))
      }),
      tap((response) => console.log(response)),
      catchError((error) => {
        return of(null)
      })
    );
  }

  getTrackerData(trackerId: number, userId?: string) {
    return this.userRegistrationService.userId$.pipe(
      mergeMap((userObject: UserRegistration) => {
        const user_id = userId ?? get(userObject, 'userId', '1')
        return from(this.httpClient.get(`${AppSettings.localhost}/familyfitness/managetrackers/${trackerId}/trackerdata`,
          {
          headers: {
            user_id
          }
        }
        ))
      }),
      tap((response) => console.log(response)),
      take(1),
      catchError((error) => {
        return of(null)
      })
    );
  }

  linkTracker(trackerDetails: AvailableTrackers) {
    return this.userRegistrationService.userId$.pipe(
      mergeMap((userObject: UserRegistration) => {
        return from(this.httpClient.post(`${AppSettings.localhost}/familyfitness/linktracker`,
        trackerDetails, {
          headers: {
            "user_id": get(userObject, 'userId', '1')
          }
        }
        ))
      }),
      catchError((error) => {
        return of(null)
      }))
  }

  unlinkTracker(trackerId: number, userId?: string) {
    return this.userRegistrationService.userId$.pipe(
      mergeMap((userObject: UserRegistration) => {
        const user_id = userId ?? get(userObject, 'userId', '1')
        return from(this.httpClient.post(`${AppSettings.localhost}/familyfitness/${trackerId}/unlink`,
        null, {
          headers: {
            "user_id": user_id
          }
        }
        ))
      }),
      catchError((error) => {
        return of(null)
      }))
  }
}
