import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface PersonAttendanceByUser {
    id: string;
    isActive: boolean;
    index: number;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class DataAttendanceByUserService {
    constructor() { }

    getMonth(term: string | any = null): Observable<PersonAttendanceByUser[]> {
        let items = getMockMonth();
        if (term) {
            items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }

    getYear(term: string | any = null): Observable<PersonAttendanceByUser[]> {
        let items = getMockYear();
        if (term) {
            items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }

    getEmpName(term: string | any = null): Observable<PersonAttendanceByUser[]> {
        let items = getMockEmpName();
        if (term) {
            items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }
}

function getMockMonth() {
    return [
        {
            'id': 'January',
            'index': 1,
            'isActive': true,
            'name': 'January',
        },
        {
            'id': 'February',
            'index': 2,
            'isActive': false,
            'name': 'February',
        },
        {
            'id': 'March',
            'index': 3,
            'isActive': false,
            'name': 'March',
        },
        {
            'id': 'April',
            'index': 4,
            'isActive': false,
            'name': 'April',
        },
        {
            'id': 'May',
            'index': 5,
            'isActive': false,
            'name': 'May',
        },
        {
            'id': 'June',
            'index': 6,
            'isActive': false,
            'name': 'June',
        },
        {
            'id': 'July',
            'index': 7,
            'isActive': false,
            'name': 'July',
        },
        {
            'id': 'August',
            'index': 8,
            'isActive': false,
            'name': 'August',
        },
        {
            'id': 'September',
            'index': 9,
            'isActive': false,
            'name': 'September',
        },
        {
            'id': 'October',
            'index': 10,
            'isActive': false,
            'name': 'October',
        },
        {
            'id': 'November',
            'index': 11,
            'isActive': false,
            'name': 'November',
        },
        {
            'id': 'December',
            'index': 12,
            'isActive': false,
            'name': 'December',
        },
    ]
}
function getMockYear() {
    return [
        {
            'id': '2010',
            'index': 1,
            'isActive': true,
            'name': '2010',
        },
        {
            'id': '2011',
            'index': 2,
            'isActive': false,
            'name': '2011',
        },
        {
            'id': '2012',
            'index': 3,
            'isActive': false,
            'name': '2012',
        },
        {
            'id': '2013',
            'index': 4,
            'isActive': false,
            'name': '2013',
        },
        {
            'id': '2014',
            'index': 5,
            'isActive': false,
            'name': '2014',
        },
        {
            'id': '2015',
            'index': 6,
            'isActive': false,
            'name': '2015',
        },
        {
            'id': '2016',
            'index': 7,
            'isActive': false,
            'name': '2016',
        },
        {
            'id': '2017',
            'index': 8,
            'isActive': false,
            'name': '2017',
        },
        {
            'id': '2018',
            'index': 9,
            'isActive': false,
            'name': '2018',
        },
        {
            'id': '2019',
            'index': 10,
            'isActive': false,
            'name': '2019',
        },
        {
            'id': '2020',
            'index': 11,
            'isActive': false,
            'name': '2020',
        },
        {
            'id': '2021',
            'index': 12,
            'isActive': false,
            'name': '2021',
        },
        {
            'id': '2022',
            'index': 12,
            'isActive': false,
            'name': '2022',
        },
        {
            'id': '2023',
            'index': 12,
            'isActive': false,
            'name': '2023',
        },
        {
            'id': '2024',
            'index': 12,
            'isActive': false,
            'name': '2024',
        },
    ]
}
function getMockEmpName() {
    return [
        {
            'id': '1',
            'index': 1,
            'isActive': true,
            'name': 'Faith Harris',
        },
        {
            'id': '2',
            'index': 2,
            'isActive': false,
            'name': 'Austin Bell',
        },
        {
            'id': '3',
            'index': 3,
            'isActive': false,
            'name': 'Maria Bower',
        },
        {
            'id': '4',
            'index': 4,
            'isActive': false,
            'name': 'Peter Hill',
        },
        {
            'id': '5',
            'index': 5,
            'isActive': false,
            'name': 'Victoria Lyman',
        },
        {
            'id': '6',
            'index': 6,
            'isActive': false,
            'name': 'Adam Quinn',
        },
        {
            'id': '7',
            'index': 7,
            'isActive': false,
            'name': 'Melanie Coleman',
        },
        {
            'id': '8',
            'index': 8,
            'isActive': false,
            'name': 'Max Wilson',
        },
        {
            'id': '9',
            'index': 9,
            'isActive': false,
            'name': 'Amelia Russell',
        },
        {
            'id': '10',
            'index': 10,
            'isActive': false,
            'name': 'Justin Metcalfe',
        },
        {
            'id': '11',
            'index': 11,
            'isActive': false,
            'name': 'Ryan Young',
        },
        {
            'id': '12',
            'index': 12,
            'isActive': false,
            'name': 'Jennifer Hardacre',
        },
        {
            'id': '13',
            'index': 13,
            'isActive': false,
            'name': 'Justin Parr',
        },
        {
            'id': '14',
            'index': 14,
            'isActive': false,
            'name': 'Julia Hodges',
        },
        {
            'id': '15',
            'index': 15,
            'isActive': false,
            'name': 'Michael Sutherland',
        },
    ]
}
