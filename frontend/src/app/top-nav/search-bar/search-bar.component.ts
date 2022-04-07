import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import {ApiService} from '../../api/api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  model: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(query => this.apiService.searchForSearchBar(query).pipe()),
    )

  reset(): void {
    setTimeout(() => {
      this.model = '';
    }, 0);
  }

}
