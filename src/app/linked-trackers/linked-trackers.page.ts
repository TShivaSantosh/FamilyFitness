import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-linked-trackers',
  templateUrl: './linked-trackers.page.html',
  styleUrls: ['./linked-trackers.page.scss'],
})
export class LinkedTrackersPage implements OnInit {

  userId: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
  }

}
