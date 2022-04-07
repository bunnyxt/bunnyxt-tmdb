import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';

import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit, OnDestroy {
  mylist: [];
  matcher: MediaQueryList;
  isMobile = false;

  constructor(
    private storageService: StorageService,
    private mediaMatcher: MediaMatcher,
    private breakpointObserver: BreakpointObserver
  ) {
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
    this.mylist = this.storageService.getMylist();
  }

}
