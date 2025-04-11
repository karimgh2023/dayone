import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {
  // Example method that returns an Observable
  getLeaves(): Observable<{ id: string; check: boolean; x: boolean; name: string; src: string; type: string; from: string; to: string; days: string; reason: string; applied: string; status: string; bg: string; }[]> {
    // Replace with actual data fetching logic
    return of([]);
  }
}