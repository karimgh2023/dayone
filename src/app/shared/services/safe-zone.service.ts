import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SafeZoneService {
  constructor(private zone: NgZone) {}

  run(fn: () => void): void {
    this.zone.run(() => fn());
  }
}
