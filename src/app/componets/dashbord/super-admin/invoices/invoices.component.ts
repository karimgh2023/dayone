import { NgSelectModule } from '@ng-select/ng-select';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { RouterModule } from '@angular/router';

interface PeriodicElement {
  id: number;
  companyName: string;
  package: string;
  invoiceId : string;
  amount: string;
  invoiceDate: string;
  payDate: string;
  nextPayDate: string;
  statusText: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, companyName: 'Abcd Pvt Ltd', package: 'Basic', invoiceId:'#INV-0478', amount: '$19.00', invoiceDate: '12-01-2021', payDate: '14-02-2021', nextPayDate: '14-03-2021', statusText: 'Paid', status: 'success' },
  {id: 2, companyName: 'Croport Pvt Ltd', package: 'Premium', invoiceId:'#INV-1245', amount: '$39.00', invoiceDate: '21-01-2021', payDate: '15-02-2021', nextPayDate: '15-03-2021', statusText: 'UnPaid', status: 'danger' },
  {id: 3, companyName: 'frecho Pvt Ltd', package: 'Advanced', invoiceId:'#INV-5280', amount: '$69.00', invoiceDate: '21-02-2021', payDate: '28-02-2021', nextPayDate: '28-03-2021', statusText: 'Paid', status: 'success' },
  {id: 4, companyName: 'kolit Pvt Ltd', package: 'Enterprise', invoiceId:'#INV-2876', amount: '$19.00', invoiceDate: '05-02-2021', payDate: '10-02-2021', nextPayDate: '10-03-2021', statusText: 'Paid', status: 'success' },
  {id: 5, companyName: 'Movck Pvt Ltd', package: 'Basic', invoiceId:'#INV-1986', amount: '$139.00', invoiceDate: '05-12-2020', payDate: '10-12-2020', nextPayDate: '10-01-2021', statusText: 'UnPaid', status: 'danger' },
  {id: 6, companyName: 'Loki Pvt Ltd', package: 'Premium', invoiceId:'#INV-2689', amount: '$39.00', invoiceDate: '11-11-2020', payDate: '20-11-2020', nextPayDate: '20-12-2020', statusText: 'Paid', status: 'success' },
  {id: 7, companyName: 'Kloki Pvt Ltd', package: 'Advanced', invoiceId:'#INV-0298', amount: '$69.00', invoiceDate: '12-10-2020', payDate: '18-10-2020', nextPayDate: '18-11-2020', statusText: 'Paid', status: 'success' },
  {id: 8, companyName: 'Gomalik Pvt Ltd', package: 'Enterprise', invoiceId:'#INV-7618', amount: '$139.00', invoiceDate: '12-07-2020', payDate: '22-07-2020', nextPayDate: '22-08-2020', statusText: 'Paid', status: 'success' },
  {id: 9, companyName: 'Mooke Pvt Ltd', package: 'Basic', invoiceId:'#INV-4920', amount: '$39.00', invoiceDate: '22-06-2020', payDate: '25-06-2020', nextPayDate: '25-07-2020', statusText: 'UnPaid', status: 'danger' },
  {id: 10, companyName: 'Kloki Pvt Ltd', package: 'Premium', invoiceId:'#INV-2109', amount: '$69.00', invoiceDate: '15-04-2020', payDate: '28-04-2020', nextPayDate: '28-05-2020', statusText: 'Paid', status: 'success' },
];

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [SharedModule,MaterialModuleModule,NgSelectModule,RouterModule,NgbModule],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'CompanyName', 'Package', 'InvoiceId', 'Amount', 'InvoiceDate', 'PayDate', 'NextPayDate', 'Status', 'Action'];
  dataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); }

  ngOnInit(): void {
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
  removeData(item: number) {
    this.dataSource.data.map((el,ind) =>{
      if(el.id == item){
        this.dataSource.data.splice(ind, 1)
        this.dataSource._updateChangeSubscription();
      }
    })    
  }

}
