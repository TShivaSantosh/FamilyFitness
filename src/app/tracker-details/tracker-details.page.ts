import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { finalize, map } from 'rxjs/operators';
import { AvailableTrackers } from '../model/available-trackers.model';
import { TrackerData } from '../model/tracker-data.model';
import { AvailableTrackersService } from '../services/available-trackers.service';
import { ManageTrackersService } from '../services/manage-tracker.service';

@Component({
  selector: 'app-tracker-details',
  templateUrl: './tracker-details.page.html',
  styleUrls: ['./tracker-details.page.scss'],
})
export class TrackerDetailsPage implements OnInit {

  tracker: AvailableTrackers;
  trackersData: TrackerData[];
  isLoading = true;
  selectedTrackerData: TrackerData;
  selectedTrackerDate: string;
  userId: string;

  constructor(private route: ActivatedRoute,
    private manageTrackerService: ManageTrackersService,
    private availableTrackerService: AvailableTrackersService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    const trackerId = this.route.snapshot.paramMap.get('trackerid');
    this.userId = this.route.snapshot.paramMap.get('userid');
    this.availableTrackerService
      .availableTrackers()
      .subscribe((data) => {
        const filteredtrackerList = data.filter((tracker) => tracker.trackerId === +trackerId);
        if (filteredtrackerList.length) {
          this.tracker = filteredtrackerList[0];
        }
        this.cd.markForCheck();
      });
   this.manageTrackerService.getTrackerData(+trackerId, this.userId)
   .pipe(
     map((trackersData) => {
    trackersData.forEach(trackerData => {
      const date = moment(trackerData.date, 'DD-MM-YYYY')
      .format('dddd').substring(0,3);
      trackerData.date = date;
    });
    return trackersData
   }),
   finalize(() => {

   })
   )
   .subscribe((data) => {
     this.trackersData = data;
     this.isLoading = false;
     this.selectedTrackerDate = this.trackersData[0].date;
     this.selectedTrackerData = this.trackersData[0];
     this.cd.detectChanges();
     console.log('---data is--'+JSON.stringify(data));
   });
  }

  selectedDay(trackerData: TrackerData) {
    console.log('selected day'+ trackerData)
    this.selectedTrackerData = trackerData;
    this.selectedTrackerDate = trackerData.date;
    this.cd.detectChanges();
  }

  unlinkTracker() {
    this.manageTrackerService.unlinkTracker(this.tracker.trackerId, this.userId)
    .subscribe(() => {
      this.manageTrackerService.refreshManageTrackers$.next(true);
      window.history.back();
    });
    

  }


}
