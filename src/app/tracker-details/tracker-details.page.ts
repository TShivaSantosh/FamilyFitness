import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tracker-details',
  templateUrl: './tracker-details.page.html',
  styleUrls: ['./tracker-details.page.scss'],
})
export class TrackerDetailsPage implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
   const trackerId = this.route.snapshot.paramMap.get('trackerid');
  }

}
