import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { from, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private googlePlus: GooglePlus,
    private router: Router,
    private userRegistrationService: UserRegistrationService) { }

  ngOnInit() { }

  signIn() {
    from(this.googlePlus.login({
      webClientId: '311298045704-2vb1jd9r93keel5a29kjbej3lf1f6rr1.apps.googleusercontent.com',
      offline: true
    }))
      .pipe(catchError(() => of({
        userId: '109454486174688318544',
        imageUrl: '',
        displayName: 'shiva',
        refreshToken: '',
        serverAuthCode: '',
        givenName: 'shiva',
        idToken: '',
        familyName: 'shiva',
        email: 'stangirala@castlighthealth.com'
      })),
        mergeMap((resp) => {
          console.log('--login response'+JSON.stringify(resp))
          if (resp != null) {
            return this.userRegistrationService.registerUser(resp)
          } else {
            return of(null);
          }
        })
      ).subscribe(() => this.router.navigate(['app']));
  }
}
