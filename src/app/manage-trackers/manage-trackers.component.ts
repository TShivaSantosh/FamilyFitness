import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-trackers',
  templateUrl: './manage-trackers.component.html',
  styleUrls: ['./manage-trackers.component.scss'],
})
export class ManageTrackersComponent implements OnInit {

  @Input() showHeader: boolean = false;

  constructor(private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {}

  goToTrackerDetails() {
    this.router.navigate(['1/trackerdetails'], {relativeTo: this.route})
  }

}
