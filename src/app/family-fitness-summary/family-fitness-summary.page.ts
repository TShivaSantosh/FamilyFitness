
import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { finalize, map, mergeMap, take, tap, zipAll } from 'rxjs/operators';
import { ManageTrackers } from '../model/manage-trackers.model';
import { MemberNotification } from '../model/member-notification.model';
import { TrackerData } from '../model/tracker-data.model';
import { AddFamilyMemberService } from '../services/add-family-member.service';
import { ManageTrackersService } from '../services/manage-tracker.service';

@Component({
  selector: 'app-family-fitness-summary',
  templateUrl: './family-fitness-summary.page.html',
  styleUrls: ['./family-fitness-summary.page.scss'],
})
export class FamilyFitnessSummaryPage implements OnInit {

  noOfFamilyMembers = 0;
  members:MemberNotification[] = []
  membersTrackers = []
  membersTrackersData = []
  aggregateMembersStepsData = {}

  constructor(private addFamilyMemberService: AddFamilyMemberService,
    private manageTrackerService: ManageTrackersService) { }

  ngOnInit() {
    this.addFamilyMemberService.getFamilyMembers()
      .pipe(
        map((members: MemberNotification[]) => {
          return members.filter((member) => member.status === 1)
        }),
        mergeMap((members: MemberNotification[]) => {
          this.members = members;
          this.noOfFamilyMembers = members.length;
          if (this.noOfFamilyMembers) {
            const arrayOfMemberTrackers = [];
            for (let i = 0; i < this.noOfFamilyMembers; i++) {
              const member = members[i];
              arrayOfMemberTrackers.push(this.manageTrackerService.manageTrackers(member.userId))
            }
            return forkJoin(arrayOfMemberTrackers)
          } 
          return of([])
        }),
        finalize(() => {
          this.fetchMembersTrackersData();
        }),
        take(1)
        ).subscribe((data: any[]) => {
          this.membersTrackers = data;
        });
  }

  async fetchMembersTrackersData() {    
    for (let i = 0; i < this.members.length; i++) {
      const memberId = this.members[i].userId
      const memberTrackers = this.membersTrackers[i]
      const memberTrackersData = []
      for (let j = 0; j < memberTrackers.length; j++) {
        const tracker = memberTrackers[j] as ManageTrackers
        const trackerData = await this.manageTrackerService.getTrackerData(tracker.trackerId, memberId).toPromise();
        memberTrackersData.push(trackerData);
      }
      this.membersTrackersData.push(memberTrackersData)
    }
    console.log('membersTrackerData'+ JSON.stringify(this.membersTrackersData))
    this.aggregateSteps();
  }

  async aggregateSteps() {
    for (let i = 0; i < this.members.length; i++) {
      const member = this.members[i];
      const membertrackersData = this.membersTrackersData[i]
      let steps = 0
      for (let j = 0; j < membertrackersData.length; j++) {
        const trackerData: TrackerData[] = membertrackersData[j]
        for(let k=0 ;k <trackerData.length; k++) {
          steps += trackerData[k].steps
        }
      }
      this.aggregateMembersStepsData[`${member.userName}`] = steps 
    }
    console.log('aggregated steps'+ JSON.stringify(this.aggregateMembersStepsData))
  }

}
