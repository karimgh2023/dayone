import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortDirection } from '@angular/material/sort';
import { employeeAttendanceSortColumn } from '../../../../shared/directives/sortable.directive';
import { employeeAttendance, employeeAttendanceList } from './employeeAttendanceTableData';

interface SearchResult {
  employeeAttendanceData: employeeAttendanceList[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: employeeAttendanceSortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(employeeAttendanceData: employeeAttendanceList[], column: employeeAttendanceSortColumn, direction: string): employeeAttendanceList[] {
  if (direction === '' || column === '') {
    return employeeAttendanceData;
  } else {
    return [...employeeAttendanceData].sort((a:any, b:any) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(employeeAttendance: employeeAttendanceList, term: string, pipe: PipeTransform) {
  return employeeAttendance.date.toLowerCase().includes(term.toLowerCase())
    || employeeAttendance.status.toLowerCase().includes(term.toLowerCase())
    || employeeAttendance.clockIn.toLowerCase().includes(term.toLowerCase())
    || employeeAttendance.clockOut.toLowerCase().includes(term.toLowerCase())
    || employeeAttendance.hours.toLowerCase().includes(term.toLowerCase())
}

@Injectable({providedIn: 'root'})
export class employeeAttendanceService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _employeeAttendanceData$ = new BehaviorSubject<employeeAttendanceList[]>([]);
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
      this._employeeAttendanceData$.next(result.employeeAttendanceData);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get employeeAttendanceData$() { return this._employeeAttendanceData$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: employeeAttendanceSortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let employeeAttendanceData = sort(employeeAttendance, sortColumn, sortDirection);

    // 2. filter
    employeeAttendanceData = employeeAttendanceData.filter(employeeAttendance => matches(employeeAttendance, searchTerm, this.pipe));
    const total = employeeAttendanceData.length;

    // 3. paginate
    employeeAttendanceData = employeeAttendanceData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({employeeAttendanceData, total});
  }
}
