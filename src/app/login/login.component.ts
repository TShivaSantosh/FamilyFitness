import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private googlePlus: GooglePlus,
    private router: Router) { }

  ngOnInit() {}

  signIn() {
    this.googlePlus.login({ webClientId: '311298045704-2vb1jd9r93keel5a29kjbej3lf1f6rr1.apps.googleusercontent.com', offline:true })
    .then((resp) => {
      console.log('response'+ JSON.stringify(resp));
      this.router.navigate(['app']);
    })
    .catch((error) => {
      console.log('error'+ error);
      this.router.navigate(['app']);
    });
  }

}
