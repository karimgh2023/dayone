import {Directive, EventEmitter, Input, Output} from '@angular/core';
import { attendanceByUserType } from '../../componets/dashbord/hrmdashboards/attendance/attendencebyuser/attendenceByUserTableData';
import { employeeList } from '../../componets/dashbord/hrmdashboards/employess/employee-list/employeeListTableData';
import { expensesList } from '../../componets/dashbord/hrmdashboards/expenses/expensesTableData';
import { noticeBoardList } from '../../componets/dashbord/hrmdashboards/notice-board/noticaBoardTableData';
import { employeeAttendanceList } from '../../componets/dashbord/employee-dashboard/attendance/employeeAttendanceTableData';

export type SortColumn = keyof noticeBoardList | '';
export type ExpensesSortColumn = keyof expensesList | '';
export type employeeSortColumn = keyof employeeList | '';
export type AttendanceByUserSortColumn = keyof attendanceByUserType | '';
export type employeeAttendanceSortColumn = keyof employeeAttendanceList | '';
// export type SortCountryColumn = keyof Country | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

