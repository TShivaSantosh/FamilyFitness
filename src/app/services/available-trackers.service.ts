import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvailableTrackers } from '../model/available-trackers.model';
import {map} from 'rxjs/operators';
import { AppSettings } from '../app.settings';
@Injectable({
  providedIn: 'root'
})
export class AvailableTrackersService {

  constructor(private httpClient: HttpClient) { }

  availableTrackers(): Observable<AvailableTrackers[]> {
    return this.httpClient.get(`${AppSettings.localhost}/familyfitness/availabletrackers`).pipe(map((resp) => resp['trackers'])) as Observable<AvailableTrackers[]>;
  }
}
