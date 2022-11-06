import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ManageTrackers } from '../model/manage-trackers.model';
import { ManageTrackersService } from '../services/manage-tracker.service';

@Component({
  selector: 'app-manage-trackers',
  templateUrl: './manage-trackers.component.html',
  styleUrls: ['./manage-trackers.component.scss'],
})
export class ManageTrackersComponent implements OnInit {

  @Input() showHeader: boolean = false;
  trackers$: Observable<ManageTrackers[]>;
  @Input() userId?: string;

  constructor(private router: Router,
    private route:ActivatedRoute,
    private manageTrackerService: ManageTrackersService
    ) { }

  ngOnInit() {
    this.trackers$ = this.manageTrackerService.manageTrackers(this.userId);
  }

  goToTrackerDetails(trackerId: number) {
    this.router.navigate([`${trackerId}/trackerdetails`], {relativeTo: this.route})
  }

}
