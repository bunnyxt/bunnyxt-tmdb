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
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit {
  @Input() review: Review;

  constructor() { }

  ngOnInit(): void {
  }

  formatCreatedAtStr(createdAt: string): string {
    const createdAtDate = new Date(createdAt);
    const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][createdAtDate.getMonth()];
    const day = createdAtDate.getDay();
    const year = createdAtDate.getFullYear();
    let hour = createdAtDate.getHours();
    let ampm = 'AM';
    if (hour > 12) {
      hour -= 12;
      ampm = 'PM';
    }
    const minute = createdAtDate.getMinutes();
    const second = createdAtDate.getSeconds();
    return `${monthName} ${day}, ${year}, ${hour}:${minute}:${second} ${ampm}`;
  }

}
