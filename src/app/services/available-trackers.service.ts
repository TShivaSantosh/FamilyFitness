import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvailableTrackers } from '../model/available-trackers.model';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AvailableTrackersService {

  constructor(private httpClient: HttpClient) { }

  availableTrackers(): Observable<AvailableTrackers[]> {
    return this.httpClient.get('http://localhost:8080/familyfitness/availabletrackers').pipe(map((resp) => resp['trackers'])) as Observable<AvailableTrackers[]>;
  }
}
