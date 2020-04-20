import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortDirection } from '@/sortable.directive';
import { UserdataService } from './userdata.service';
import { UserData } from '@/_models/userData';

interface SearchResult {
  userDataList: UserData[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(userDataList: UserData[], column: string, direction: string): UserData[] {
  if (direction === '') {
    return userDataList;
  } else {
    return [...userDataList].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(userData: UserData, term: string, pipe: PipeTransform) {
  return userData.user_id.toLowerCase().includes(term)
    || pipe.transform(userData.total_volume).includes(term)
    || pipe.transform(userData.price_per_unit).includes(term);
}


@Injectable({ providedIn: 'root' })
export class BuyService {
  public _loading$ = new BehaviorSubject<boolean>(true);
  public _search$ = new Subject<void>();
  public _userDataList$ = new BehaviorSubject<UserData[]>([]);
  public _total$ = new BehaviorSubject<number>(0);
  public userDataList: UserData[] = [];

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, private userDataService: UserdataService) {
   
  }

  initSearch(){
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._userDataList$.next(result.userDataList);
      this._total$.next(result.total);
    });
    this._search$.next();
  }

 

  get userDataList$() { return this._userDataList$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    console.log("search function called !!")
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    console.log(this.userDataList)

    // 1. sort
    let userDataList = sort(this.userDataList, sortColumn, sortDirection);

    // 2. filter
    userDataList = userDataList.filter(UserData => matches(UserData, searchTerm, this.pipe));
    const total = userDataList.length;

    // 3. paginate
    userDataList = userDataList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ userDataList, total });
  }
}