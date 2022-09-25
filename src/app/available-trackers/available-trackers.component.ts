import { Component, OnInit } from '@angular/core';
import { Health } from '@awesome-cordova-plugins/health/ngx';
import { Observable } from 'rxjs';
import { AvailableTrackers } from '../model/available-trackers.model';
import { TrackerData } from '../model/tracker-data.model';
import { AvailableTrackersService } from '../services/available-trackers.service';
import { ManageTrackersService } from '../services/manage-tracker.service';
import { get } from 'lodash' 
import * as moment from 'moment';
import { Key } from 'protractor';
import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-available-trackers',
  templateUrl: './available-trackers.component.html',
  styleUrls: ['./available-trackers.component.scss'],
})
export class AvailableTrackersComponent implements OnInit {

  isAppleHealthAvailable = false;
  trackers$: Observable<AvailableTrackers[]>;

  constructor(private health: Health,
    private availableTrackersService: AvailableTrackersService,
    private manageTrackerService: ManageTrackersService) { }

  async ngOnInit() {
    //this.isAppleHealthAvailable = await this.health.isAvailable();
    this.trackers$ = this.availableTrackersService.availableTrackers();
  }

  async linkAppleHealth(tracker: AvailableTrackers) {
    const authorization = await this.health.requestAuthorization([{read: ['steps', 'height', 'weight', 'nutrition.calories', 'activity']}])
    const stepData = await this.health.queryAggregated({
      startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
      dataType: 'steps',
      bucket: 'day'
    });
    console.log('steps data' + JSON.stringify(stepData));
    const nutritionData = await this.health.queryAggregated({
      startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
      dataType: 'nutrition.calories',
      bucket: 'day'
    });
    console.log('food data' + JSON.stringify(nutritionData));
    const sleepData = await this.health.queryAggregated({
      startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
      dataType: 'activity',
      bucket: 'day'
    });
    console.log('sleep data' + JSON.stringify(sleepData));
    const payload: Map<string, TrackerData> = new Map<string, TrackerData>();
    stepData.forEach((step: any , key) => {
      const date = moment(step['startDate']).format('DD-MM-YYYY');
      payload.set(`${key}`, { date: date, steps: step['value'], sleepInSeconds: 0, food: 0 });
    });
    /*sleepData.forEach((sleep: any , key) => {
      const steps = payload.get(`${key}`)["steps"] || 0
      payload.set(`${key}`, { date: sleep['startDate'], steps: steps, sleepInSeconds: sleep['value'], food: 0 });
    });*/
    nutritionData.forEach((nutrition: any , key) => {
      const date = moment(nutrition['startDate']).format('DD-MM-YYYY');
      const steps = payload.get(`${key}`)["steps"] || 0
      const sleepInSeconds = payload.get(`${key}`)["sleepInSeconds"] || 0
      payload.set(`${key}`, { date: date, steps: steps, sleepInSeconds: sleepInSeconds, food: nutrition['value'] });
    });

    let payloadArray:TrackerData[] = new Array() ;
    payload.forEach((value:TrackerData, key) => {
      payloadArray.push(value);
    });
    this.manageTrackerService.linkTracker(tracker)
    .pipe(mergeMap(() => {
      return this.manageTrackerService.submitTrackerData(payloadArray, tracker.trackerId)
    }))
    .subscribe((resp) =>{
      console.log('---success---')
    })
    
  }

}
