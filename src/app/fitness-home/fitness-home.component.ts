import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fitnesshome',
  templateUrl: './fitness-home.component.html',
  styleUrls: ['./fitness-home.component.scss'],
})
export class FitnessHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goToLinkedTrackers() {
    this.router.navigate(['app/myfamily/shiva/linkedtrackers'])
  }

}
