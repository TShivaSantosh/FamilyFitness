import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvailableTrackers } from '../model/available-trackers.model';
import { AppSettings } from '../app.settings';
import { Health } from '@awesome-cordova-plugins/health/ngx';
import * as moment from 'moment';
import { TrackerData } from '../model/tracker-data.model';
import { finalize, map, mergeMap, take } from 'rxjs/operators';
import { ManageTrackers } from '../model/manage-trackers.model';
import { ManageTrackersService } from './manage-tracker.service';
@Injectable({
  providedIn: 'root'
})
export class AvailableTrackersService {

  constructor(private httpClient: HttpClient,
     private health: Health,
     private manageTrackerService: ManageTrackersService) { }

  availableTrackers(): Observable<AvailableTrackers[]> {
    return this.httpClient.get(`${AppSettings.localhost}/familyfitness/availabletrackers`).pipe(map((resp) => resp['trackers'])) as Observable<AvailableTrackers[]>;
  }

  async fetchData(tracker: AvailableTrackers) {
    await this.health.requestAuthorization([{read: ['steps', 'height', 'weight', 'nutrition.calories', 'activity']}])
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
    /*const sleepData = await this.health.query({
      startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
      dataType: 'activity'
    });
    console.log('sleep data' + JSON.stringify(sleepData));*/
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
    }),
    take(1),
    finalize(() => {
      this.manageTrackerService.refreshManageTrackers$.next(true);
    }))
    .subscribe((resp) =>{
      console.log('---success---');
    })
  }
}
