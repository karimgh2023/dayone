import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortDirection } from '@angular/material/sort';
import { ExpensesSortColumn } from '../../../../shared/directives/sortable.directive';
import { expenses, expensesList } from './expensesTableData';

interface SearchResult {
  expensesData: expensesList[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: ExpensesSortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(expensesData: expensesList[], column: ExpensesSortColumn, direction: string): expensesList[] {
  if (direction === '' || column === '') {
    return expensesData;
  } else {
    return [...expensesData].sort((a:any, b:any) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(expenses: expensesList, term: string, pipe: PipeTransform) {
  return expenses.title.toLowerCase().includes(term.toLowerCase())
    || expenses.employee.toLowerCase().includes(term.toLowerCase())
    || expenses.purchaseFrom.toLowerCase().includes(term.toLowerCase())
    || expenses.date.toLowerCase().includes(term.toLowerCase())
    || expenses.amount.toLowerCase().includes(term.toLowerCase())
    || expenses.paidBy.toLowerCase().includes(term.toLowerCase())
    || expenses.ApprovalStatus.toLowerCase().includes(term.toLowerCase())
}

@Injectable({providedIn: 'root'})
export class expensesService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _expensesData$ = new BehaviorSubject<expensesList[]>([]);
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
      this._expensesData$.next(result.expensesData);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get expensesData$() { return this._expensesData$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: ExpensesSortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let expensesData = sort(expenses, sortColumn, sortDirection);

    // 2. filter
    expensesData = expensesData.filter(expenses => matches(expenses, searchTerm, this.pipe));
    const total = expensesData.length;

    // 3. paginate
    expensesData = expensesData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({expensesData, total});
  }
}
