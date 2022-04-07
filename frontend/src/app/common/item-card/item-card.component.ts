import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';

type Movie = { id: number, title: string, poster_path: string };
type Tv = { id: number, name: string, poster_path: string };

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit, OnDestroy {
  @Input() item: Movie | Tv;
  category: 'movie' | 'tv';
  matcher: MediaQueryList;
  isMobile = false;

  showInfo: boolean;

  constructor(
    private mediaMatcher: MediaMatcher,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.showInfo = false;
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.isMobile = true;
    }
    this.matcher = this.mediaMatcher.matchMedia('(max-width: 768px)');
    this.matcher.addListener(this.mediaChangeListener);
  }

  mediaChangeListener(event): void {
    if (event.matches) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  ngOnDestroy(): void {
    this.matcher.removeListener(this.mediaChangeListener);
  }


  ngOnInit(): void {
    if (this.item.hasOwnProperty('title')) {
      this.category = 'movie';
    } else {
      this.category = 'tv';
    }
  }

  onMouseEnter(): void {
    this.showInfo = true;
  }

  onMouseLeave(): void {
    this.showInfo = false;
  }

}
