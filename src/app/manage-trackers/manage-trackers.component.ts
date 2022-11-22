import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
  @Input() userId?: string;
  trackers: ManageTrackers[];
  constructor(private router: Router,
    private route:ActivatedRoute,
    private manageTrackerService: ManageTrackersService,
    private cd: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.refreshManageTrackers();
    this.listenforRefresh();
  }

  refreshManageTrackers() {
    this.manageTrackerService.manageTrackers(this.userId)
    .subscribe((data) => {
      this.trackers = data;
      this.cd.markForCheck();
    });
  }

  goToTrackerDetails(trackerId: number) {
    this.router.navigate([`${trackerId}/trackerdetails`], {relativeTo: this.route})
  }

  listenforRefresh() {
    this.manageTrackerService.refreshManageTrackers$
    .subscribe(() => {
      this.refreshManageTrackers();
    });
  }

  refreshTrackers() {
    this.manageTrackerService.refreshAvailableTrackersData$.next(true);
  }

}
