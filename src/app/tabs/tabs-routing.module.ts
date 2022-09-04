import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'mytrackers',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'mytrackers/:trackerid/trackerdetails',
        loadChildren: () => import('../tracker-details/tracker-details-routing.module').then(m => m.TrackerDetailsPageRoutingModule)
      },
      {
        path: 'myfamily',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'myfamily/addfamilymember',
        loadChildren: () => import('../add-family-member/add-family-member.module').then(m => m.AddFamilyMemberPageModule)
      },
      {
        path: 'myfamily/:name/linkedtrackers',
        loadChildren: () => import('../linked-trackers/linked-trackers.module').then(m => m.LinkedTrackersPageModule)
      },
      {
        path: 'myfamily/:name/linkedtrackers/:trackerid/trackerdetails',
        loadChildren: () => import('../tracker-details/tracker-details-routing.module').then(m => m.TrackerDetailsPageRoutingModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/app/mytrackers',
        pathMatch: 'full'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
