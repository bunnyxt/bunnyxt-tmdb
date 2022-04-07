import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  initMylist(): void {
    this.storeMylist([]);
  }

  getMylist(): any {
    let mylistStr = localStorage.getItem('mylist');
    if (!mylistStr) {
      this.initMylist();
      mylistStr = '[]';
    }
    return JSON.parse(mylistStr);
  }

  storeMylist(mylist): void {
    localStorage.setItem('mylist', JSON.stringify(mylist));
  }

  addItemToMylist(newItem): void {
    const mylist = this.getMylist();
    const newMylist = [newItem, ...mylist.filter(item => !(item.id === newItem.id && item.title === newItem.title))];
    this.storeMylist(newMylist);
  }

  removeItemFromMylist(itemToBeRemoved): void {
    const mylist = this.getMylist();
    const newMylist = mylist.filter(item => !(item.id === itemToBeRemoved.id && item.title === itemToBeRemoved.title));
    this.storeMylist(newMylist);
  }

  queryItemInMylist(itemToQuery): number {
    const mylist = this.getMylist();
    return mylist.findIndex(item => item.id === itemToQuery.id && item.title === itemToQuery.title);
  }

  initContinueWatching(): void {
    this.storeContinueWatching([]);
  }

  getContinueWatching(): any {
    let continueWatchingStr = localStorage.getItem('continueWatching');
    if (!continueWatchingStr) {
      this.initContinueWatching();
      continueWatchingStr = '[]';
    }
    return JSON.parse(continueWatchingStr);
  }

  storeContinueWatching(continueWatching): void {
    localStorage.setItem('continueWatching', JSON.stringify(continueWatching));
  }

  addItemToContinueWatching(newItem): void {
    const continueWatching = this.getContinueWatching();
    const newContinueWatching = [newItem, ...continueWatching.filter(item => !(item.id === newItem.id && item.title === newItem.title))];
    this.storeContinueWatching(newContinueWatching.slice(0, 24));
  }

  removeItemFromContinueWatching(itemToBeRemoved): void {
    const continueWatching = this.getContinueWatching();
    const newContinueWatching = continueWatching.filter(item => !(item.id === itemToBeRemoved.id && item.title === itemToBeRemoved.title));
    this.storeContinueWatching(newContinueWatching);
  }

  queryItemInContinueWatching(itemToQuery): number {
    const continueWatching = this.getContinueWatching();
    return continueWatching.findIndex(item => item.id === itemToQuery.id && item.title === itemToQuery.title);
  }
}
