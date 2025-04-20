import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Report, StandardReportEntry, SpecificReportEntry } from '../models/report.model';

export interface ReportState {
  currentReport: Report | null;
  standardEntries: StandardReportEntry[];
  specificEntries: SpecificReportEntry[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ReportStateService {
  private initialState: ReportState = {
    currentReport: null,
    standardEntries: [],
    specificEntries: [],
    loading: false,
    error: null
  };

  private state = new BehaviorSubject<ReportState>(this.initialState);

  // Expose state as observables
  readonly state$ = this.state.asObservable();
  
  // Computed state properties
  readonly currentReport$ = new BehaviorSubject<Report | null>(null);
  readonly standardEntries$ = new BehaviorSubject<StandardReportEntry[]>([]);
  readonly specificEntries$ = new BehaviorSubject<SpecificReportEntry[]>([]);
  readonly loading$ = new BehaviorSubject<boolean>(false);
  readonly error$ = new BehaviorSubject<string | null>(null);

  constructor() {
    // Subscribe to state changes and update computed properties
    this.state$.subscribe(state => {
      this.currentReport$.next(state.currentReport);
      this.standardEntries$.next(state.standardEntries);
      this.specificEntries$.next(state.specificEntries);
      this.loading$.next(state.loading);
      this.error$.next(state.error);
    });
  }

  // State update methods
  setCurrentReport(report: Report | null): void {
    this.updateState({ currentReport: report });
  }

  setStandardEntries(entries: StandardReportEntry[]): void {
    this.updateState({ standardEntries: entries });
  }

  setSpecificEntries(entries: SpecificReportEntry[]): void {
    this.updateState({ specificEntries: entries });
  }

  updateStandardEntry(entryId: number, updates: Partial<StandardReportEntry>): void {
    const currentEntries = [...this.state.value.standardEntries];
    const index = currentEntries.findIndex(entry => entry.id === entryId);
    
    if (index !== -1) {
      currentEntries[index] = { ...currentEntries[index], ...updates };
      this.updateState({ standardEntries: currentEntries });
    }
  }

  updateSpecificEntry(entryId: number, updates: Partial<SpecificReportEntry>): void {
    const currentEntries = [...this.state.value.specificEntries];
    const index = currentEntries.findIndex(entry => entry.id === entryId);
    
    if (index !== -1) {
      currentEntries[index] = { ...currentEntries[index], ...updates };
      this.updateState({ specificEntries: currentEntries });
    }
  }

  setLoading(loading: boolean): void {
    this.updateState({ loading });
  }

  setError(error: string | null): void {
    this.updateState({ error });
  }

  // Utility method to update state partially
  private updateState(stateChanges: Partial<ReportState>): void {
    this.state.next({
      ...this.state.value,
      ...stateChanges
    });
  }

  // Reset state to initial values
  resetState(): void {
    this.state.next(this.initialState);
  }
} 