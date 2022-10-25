import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fitness-home-card',
  templateUrl: './fitness-home-card.component.html',
  styleUrls: ['./fitness-home-card.component.scss'],
})
export class FitnessHomeCardComponent implements OnInit {

  @Input() dependantName: string;
  @Input() dependantRelationship: string;
  @Input() dependantUrl: string;
  
  constructor() { }

  ngOnInit() {}

}
