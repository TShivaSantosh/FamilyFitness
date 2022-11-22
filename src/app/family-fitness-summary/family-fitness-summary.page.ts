
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { forkJoin, of, zip } from 'rxjs';
import { finalize, map, mergeMap, take, tap, zipAll } from 'rxjs/operators';
import { ManageTrackers } from '../model/manage-trackers.model';
import { MemberNotification } from '../model/member-notification.model';
import { TrackerData } from '../model/tracker-data.model';
import { AddFamilyMemberService } from '../services/add-family-member.service';
import { ManageTrackersService } from '../services/manage-tracker.service';
import { UserRegistrationService } from '../services/user-registration.service';

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
  public chart: any;
  chartData = []
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }
  labels =  ['This Week Steps Summary'];
  chartReady = false
  colors = ['red', 'green', 'blue', 'yellow', 'purple', 'violet', 'orange'];
  constructor(private addFamilyMemberService: AddFamilyMemberService,
    private manageTrackerService: ManageTrackersService,
    private userRegistrationService: UserRegistrationService,
    private cd: ChangeDetectorRef) {
     }

  ngOnInit() {
    this.fetchFamilyMembers();
  }

  fetchFamilyMembers() {
    this.noOfFamilyMembers = 0;
    this.members = []
    this.membersTrackers = []
    this.membersTrackersData = []
    this.aggregateMembersStepsData = {}
    this.chartData = []
    this.addFamilyMemberService.getFamilyMembers()
    .pipe(
      map((members: MemberNotification[]) => {
        return members.filter((member) => member.status === 1)
      }),
      mergeMap((members: MemberNotification[]) => {
        return zip(this.userRegistrationService.userId$, of(members))
      }),
      map(([user, members]) => {
        const userMember = {
          status: 1,
          relationship: 'self',
          userName: user.displayName,
          userId: user.userId,
          imageUrl: user.imageUrl
        }
        const modifiedMembers =  []
        members.forEach(element => {
          modifiedMembers.push(element)
        });
        modifiedMembers.push(userMember)
        return modifiedMembers
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
      })
      ).subscribe((data: any[]) => {
        this.membersTrackers = data;
        this.fetchMembersTrackersData();
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
    this.createChart()
  }

  createChart(){
    const members = Object.keys(this.aggregateMembersStepsData) 
    const data = Object.values(this.aggregateMembersStepsData)
    const dataSet = [];
    for (let i = 0; i < this.members.length; i++) {
      const name = members[i]
      const value = data[i]
      dataSet.push({
        label: `${name}`,
        data: [value]
      })
    }
    this.chartData = dataSet
    this.chartReady = true
    this.cd.detectChanges()
  }

  refreshFitnessReport() {
    this.fetchFamilyMembers();
  }

}
