import { Component, OnInit, OnChanges, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';

type Movie = { id: number, title: string, poster_path: string };
type Tv = { id: number, name: string, poster_path: string };

@Component({
  selector: 'app-items-display-section',
  templateUrl: './items-display-section.component.html',
  styleUrls: ['./items-display-section.component.css']
})
export class ItemsDisplaySectionComponent implements OnInit, OnChanges, OnDestroy {
  @Input() items: Movie[] | Tv[];
  itemsGroups: Movie[][] | Tv[][];
  itemsPerGroup = 6;
  matcher: MediaQueryList;
  isMobile = false;

  constructor(
    private mediaMatcher: MediaMatcher,
    private breakpointObserver: BreakpointObserver,
  ) {
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.isMobile = true;
      this.itemsPerGroup = 1;
    }
    this.matcher = this.mediaMatcher.matchMedia('(max-width: 768px)');
    this.matcher.addListener(this.mediaChangeListener);
  }

  mediaChangeListener(event): void {
    if (event.matches) {
      this.isMobile = true;
      this.itemsPerGroup = 1;
    } else {
      this.isMobile = false;
      this.itemsPerGroup = 6;
    }
  }

  ngOnDestroy(): void {
    this.matcher.removeListener(this.mediaChangeListener);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      const itemsGroups = [];
      let itemsGroup = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.items.length; i++) {
        if (i % this.itemsPerGroup === 0 && itemsGroup.length > 0) {
          itemsGroups.push(itemsGroup);
          itemsGroup = [];
        }
        itemsGroup.push(this.items[i]);
      }
      if (itemsGroup.length > 0) {
        itemsGroups.push(itemsGroup);
      }
      this.itemsGroups = itemsGroups;
    }
  }

}
