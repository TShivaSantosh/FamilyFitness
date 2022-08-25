import { Component, OnInit } from '@angular/core';
import { Health } from '@awesome-cordova-plugins/health/ngx';

@Component({
  selector: 'app-available-trackers',
  templateUrl: './available-trackers.component.html',
  styleUrls: ['./available-trackers.component.scss'],
})
export class AvailableTrackersComponent implements OnInit {

  isAppleHealthAvailable = false;

  constructor(private health: Health) { }

  async ngOnInit() {
    this.isAppleHealthAvailable = await this.health.isAvailable();
  }

  async linkAppleHealth() {
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
  }

}
