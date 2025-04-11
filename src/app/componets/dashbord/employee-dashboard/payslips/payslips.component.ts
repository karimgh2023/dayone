import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';

interface PeriodicElement {
  id: string;
  Month: string;
  Year: number;
  NetSalary: string;
  generatedDate: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: '#10422', Month: 'April', Year: 2020, NetSalary: '$28,000', generatedDate: '01-05-2020'},
  { id: '#10391', Month: 'August', Year: 2020, NetSalary: '$28,000', generatedDate: '01-09-2020' },
  { id: '#10321', Month: 'December', Year: 2020, NetSalary: '$28,000', generatedDate: '01-01-2021' },
  { id: '#11986', Month: 'December', Year: 2019, NetSalary: '$24,000', generatedDate: '01-01-2020' },
  { id: '#10398', Month: 'February', Year: 2020, NetSalary: '$24,000', generatedDate: '01-03-2020' },
  { id: '#10029', Month: 'January', Year: 2021, NetSalary: '$32,000', generatedDate: '01-02-2021' },
  { id: '#10092', Month: 'January', Year: 2020, NetSalary: '$24,000', generatedDate: '01-02-2020' },
  { id: '#11073', Month: 'July', Year: 2020, NetSalary: '$28,000', generatedDate: '02-08-2020' },
  { id: '#10839', Month: 'June', Year: 2020, NetSalary: '$28,000', generatedDate: '02-07-2020' },
  { id: '#10029', Month: 'March', Year: 2020, NetSalary: '$24,000', generatedDate: '01-04-2020' },
  { id: '#10289', Month: 'May', Year: 2021, NetSalary: '$32,000', generatedDate: '01-06-2020' },
  { id: '#10598', Month: 'November', Year: 2020, NetSalary: '$24,000', generatedDate: '01-12-2020' },
  { id: '#10029', Month: 'November', Year: 2019, NetSalary: '$28,000', generatedDate: '01-12-2019' },
  { id: '#10438', Month: 'October', Year: 2020, NetSalary: '$28,000', generatedDate: '01-11-2020' },
  { id: '#10837', Month: 'September', Year: 2020, NetSalary: '$24,000', generatedDate: '01-10-2020' },
];

@Component({
  selector: 'app-payslips',
  standalone: true,
  imports: [MaterialModuleModule,SharedModule,FormsModule,CommonModule,ReactiveFormsModule,NgSelectModule,RouterModule],
  templateUrl: './payslips.component.html',
  styleUrls: ['./payslips.component.scss']
})
export class PayslipsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Month', 'Year', 'NetSalary', 'generatedDate'];
  dataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {}

}