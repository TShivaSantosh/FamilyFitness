import { Component, OnInit } from '@angular/core';
import { Health } from '@awesome-cordova-plugins/health/ngx';
import { from, Observable, zip } from 'rxjs';
import { AvailableTrackers } from '../model/available-trackers.model';
import { TrackerData } from '../model/tracker-data.model';
import { AvailableTrackersService } from '../services/available-trackers.service';
import { ManageTrackersService } from '../services/manage-tracker.service';
import * as moment from 'moment';
import { finalize, map, mergeMap, take } from 'rxjs/operators';
import { Device } from '@capacitor/device';
@Component({
  selector: 'app-available-trackers',
  templateUrl: './available-trackers.component.html',
  styleUrls: ['./available-trackers.component.scss'],
})
export class AvailableTrackersComponent implements OnInit {

  isAppleHealthAvailable = false;
  trackers$: Observable<AvailableTrackers[]>;
  savedTracker: AvailableTrackers;

  constructor(private availableTrackersService: AvailableTrackersService,
    private manageTrackersService: ManageTrackersService) { }

  async ngOnInit() {
    //this.isAppleHealthAvailable = await this.health.isAvailable();
    this.trackers$ = zip(this.availableTrackersService.availableTrackers(), from(Device.getInfo()))
    .pipe(
    map(([availableTrackers, device]) => {
      const trackers = availableTrackers.filter((tracker) => {
        if(device.platform == 'ios' && tracker.trackerId == 100) {
          return true
        } else if (device.platform == 'android' && tracker.trackerId == 101) {
          return true
        } else {
          return false
        }
      })
      this.savedTracker = trackers[0] || null;
      return trackers
    }));
    this.manageTrackersService.refreshAvailableTrackersData$.subscribe(() => {
      this.linkAppleHealth(this.savedTracker);
    })
  }

  async linkAppleHealth(tracker: AvailableTrackers) {
    await this.availableTrackersService.fetchData(tracker);
  }

}
