import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortDirection } from '@angular/material/sort';
import { AttendanceByUserSortColumn } from '../../../../../shared/directives/sortable.directive';
import { attendanceByUser, attendanceByUserType } from './attendenceByUserTableData';

interface SearchResult {
  attendanceByUserData: attendanceByUserType[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: AttendanceByUserSortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(attendanceByUserData: attendanceByUserType[], column: AttendanceByUserSortColumn, direction: string): attendanceByUserType[] {
  if (direction === '' || column === '') {
    return attendanceByUserData;
  } else {
    return [...attendanceByUserData].sort((a:any, b:any) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(attendanceByUser: attendanceByUserType, term: string, pipe: PipeTransform) {
  return attendanceByUser.Date.toLowerCase().includes(term.toLowerCase())
    || attendanceByUser.Day.toLowerCase().includes(term.toLowerCase())
    || attendanceByUser.Status.toLowerCase().includes(term.toLowerCase())
}

@Injectable({providedIn: 'root'})
export class AttendanceByUserService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _attendanceByUserData$ = new BehaviorSubject<attendanceByUserType[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._attendanceByUserData$.next(result.attendanceByUserData);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get attendanceByUserData$() { return this._attendanceByUserData$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: AttendanceByUserSortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let attendanceByUserData = sort(attendanceByUser, sortColumn, sortDirection);

    // 2. filter
    attendanceByUserData = attendanceByUserData.filter(attendanceByUser => matches(attendanceByUser, searchTerm, this.pipe));
    const total = attendanceByUserData.length;

    // 3. paginate
    attendanceByUserData = attendanceByUserData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({attendanceByUserData, total});
  }
}
