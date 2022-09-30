import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { finalize, map } from 'rxjs/operators';
import { TrackerData } from '../model/tracker-data.model';
import { ManageTrackersService } from '../services/manage-tracker.service';

@Component({
  selector: 'app-tracker-details',
  templateUrl: './tracker-details.page.html',
  styleUrls: ['./tracker-details.page.scss'],
})
export class TrackerDetailsPage implements OnInit {

  trackersData: TrackerData[];
  isLoading = true;
  selectedTrackerData: TrackerData;
  selectedTrackerDate: String;
  constructor(private route: ActivatedRoute,
    private manageTrackerService: ManageTrackersService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
   const trackerId = this.route.snapshot.paramMap.get('trackerid');
   this.manageTrackerService.getTrackerData(+trackerId)
   .pipe(
     map((trackersData: TrackerData[]) => {
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


}
