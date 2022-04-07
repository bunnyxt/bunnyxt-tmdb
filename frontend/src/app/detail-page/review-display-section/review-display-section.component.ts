import { Component, OnInit, Input } from '@angular/core';

type Review = {
  author: string;
  content: string;
  created_at: string;
  url: string;
  rating: number;
  avatar_path: string;
};

@Component({
  selector: 'app-review-display-section',
  templateUrl: './review-display-section.component.html',
  styleUrls: ['./review-display-section.component.css']
})
export class ReviewDisplaySectionComponent implements OnInit {
  @Input() reviews: Review[];

  constructor() { }

  ngOnInit(): void {
  }

}
