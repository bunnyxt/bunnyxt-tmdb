import { Component, OnInit, Input } from '@angular/core';

type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

@Component({
  selector: 'app-cast-display-section',
  templateUrl: './cast-display-section.component.html',
  styleUrls: ['./cast-display-section.component.css']
})
export class CastDisplaySectionComponent implements OnInit {
  @Input() casts: Cast[];

  constructor() { }

  ngOnInit(): void {
  }

}
