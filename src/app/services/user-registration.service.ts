import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserRegistration } from '../model/user-registration.model';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  userId$: BehaviorSubject<UserRegistration> = new BehaviorSubject<UserRegistration>(null);

  constructor(private http: HttpClient) { }

  registerUser(userObject: UserRegistration): Observable<UserRegistration> {
    return this.http.post('http://localhost:8080/familyfitness/user/registration', {
      "userId": userObject.userId,
      "emailId": userObject.email,
      "userName": userObject.displayName,
      "imageUrl": userObject.imageUrl
    }, {observe: 'response'})
      .pipe(
        catchError(() => null),
        tap((resp) => {
          if (resp['status'] === 200) {
            this.userId$.next(userObject);
          } else {
            this.userId$.next(null);
          }
        })
      ) as Observable<UserRegistration>;
  }
}
