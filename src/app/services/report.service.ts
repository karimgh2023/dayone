import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { 
  Report, 
  ReportCreationRequest, 
  StandardReportEntryUpdateRequest, 
  SpecificReportEntryUpdateRequest,
  StandardReportEntry,
  SpecificReportEntry,
  Protocol,
  SpecificControlCriteria
} from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = `${environment.apiUrl}/rapports`;
  private protocolsUrl = `${environment.apiUrl}/protocols`;
  private useMockData = true; // Set to false to use real API

  // Mock data for testing when API fails
  private MOCK_REPORTS: Report[] = [
    {
      id: 1,
      type: 'Maintenance',
      protocol: {
        id: 1,
        name: 'Standard Maintenance Protocol',
        protocolType: 'Homologation',
        createdBy: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          role: 'ADMIN',
          department: { id: 1, name: 'Maintenance' }
        }
      },
      createdBy: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'ADMIN',
        department: { id: 1, name: 'Maintenance' }
      },
      reportUsers: [],
      reportEntries: [],
      createdAt: new Date().toISOString(),
      isCompleted: false,
      designation: 'Centrifugal Pump',
      manufacturer: 'PumpCo'
    },
    {
      id: 2,
      type: 'Inspection',
      protocol: {
        id: 2,
        name: 'Monthly Inspection Protocol',
        protocolType: 'Requalification',
        createdBy: {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          role: 'INSPECTOR',
          department: { id: 2, name: 'Quality Control' }
        }
      },
      createdBy: {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        role: 'INSPECTOR',
        department: { id: 2, name: 'Quality Control' }
      },
      reportUsers: [],
      reportEntries: [],
      createdAt: new Date().toISOString(),
      isCompleted: true,
      designation: 'AC Motor',
      manufacturer: 'MotorTech'
    },
    {
      id: 3,
      type: 'Repair',
      protocol: {
        id: 3,
        name: 'Emergency Repair Protocol',
        protocolType: 'Homologation',
        createdBy: {
          id: 3,
          firstName: 'Mike',
          lastName: 'Johnson',
          email: 'mike.johnson@example.com',
          role: 'TECHNICIAN',
          department: { id: 3, name: 'Repairs' }
        }
      },
      createdBy: {
        id: 3,
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@example.com',
        role: 'TECHNICIAN',
        department: { id: 3, name: 'Repairs' }
      },
      reportUsers: [],
      reportEntries: [],
      createdAt: new Date().toISOString(),
      isCompleted: false,
      designation: 'Conveyor Belt',
      manufacturer: 'ConveyorSystems'
    },
    {
      id: 4,
      type: 'Replacement',
      protocol: {
        id: 4,
        name: 'Component Replacement Protocol',
        protocolType: 'Requalification',
        createdBy: {
          id: 4,
          firstName: 'Sarah',
          lastName: 'Williams',
          email: 'sarah.williams@example.com',
          role: 'MANAGER',
          department: { id: 4, name: 'Operations' }
        }
      },
      createdBy: {
        id: 4,
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.williams@example.com',
        role: 'MANAGER',
        department: { id: 4, name: 'Operations' }
      },
      reportUsers: [],
      reportEntries: [],
      createdAt: new Date().toISOString(),
      isCompleted: true,
      designation: 'Water Pump',
      manufacturer: 'FluidTech'
    }
  ];

  // Mock protocols for testing
  private MOCK_PROTOCOLS: Protocol[] = [
    {
      id: 1,
      name: 'Standard Maintenance Protocol',
      protocolType: 'Homologation',
      createdBy: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'ADMIN',
        department: { id: 1, name: 'Maintenance' }
      }
    },
    {
      id: 2,
      name: 'Monthly Inspection Protocol',
      protocolType: 'Requalification',
      createdBy: {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        role: 'INSPECTOR',
        department: { id: 2, name: 'Quality Control' }
      }
    },
    {
      id: 3,
      name: 'Emergency Repair Protocol',
      protocolType: 'Homologation',
      createdBy: {
        id: 3,
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@example.com',
        role: 'TECHNICIAN',
        department: { id: 3, name: 'Repairs' }
      }
    },
    {
      id: 4,
      name: 'Component Replacement Protocol',
      protocolType: 'Requalification',
      createdBy: {
        id: 4,
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.williams@example.com',
        role: 'MANAGER',
        department: { id: 4, name: 'Operations' }
      }
    }
  ];

  constructor(private http: HttpClient) { }

  // Get all reports
  getAllReports(): Observable<Report[]> {
    // Use mock data for testing if useMockData is true
    if (this.useMockData) {
      console.log('Using mock data (useMockData=true)');
      return of(this.MOCK_REPORTS);
    }
    
    console.log(`Fetching reports from ${this.apiUrl}`);
    return this.http.get<Report[]>(this.apiUrl)
      .pipe(
        tap(reports => {
          if (reports && reports.length > 0) {
            console.log('Fetched reports:', reports.length);
          } else {
            console.log('No reports returned from API');
          }
        }),
        catchError((error) => {
          console.error('Error fetching reports:', error);
          
          // Return mock data if the API fails
          console.log('Returning mock data as fallback');
          return of(this.MOCK_REPORTS);
        })
      );
  }

  // Get report by ID
  getReportById(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(report => console.log(`Fetched report id=${id}`)),
        catchError(this.handleError<Report>(`getReportById id=${id}`))
      );
  }

  // Create a new report
  createReport(reportData: ReportCreationRequest): Observable<Report> {
    return this.http.post<Report>(this.apiUrl, reportData)
      .pipe(
        tap(newReport => console.log(`Created report id=${newReport.id}`)),
        catchError(this.handleError<Report>('createReport'))
      );
  }

  // Update a report
  updateReport(id: number, reportData: Partial<Report>): Observable<Report> {
    return this.http.put<Report>(`${this.apiUrl}/${id}`, reportData)
      .pipe(
        tap(_ => console.log(`Updated report id=${id}`)),
        catchError(this.handleError<Report>(`updateReport id=${id}`))
      );
  }

  // Delete a report
  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(_ => console.log(`Deleted report id=${id}`)),
        catchError(this.handleError<void>(`deleteReport id=${id}`))
      );
  }

  // Get reports by user ID
  getReportsByUserId(userId: number): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/user/${userId}`)
      .pipe(
        tap(reports => console.log(`Fetched reports for user id=${userId}`)),
        catchError(this.handleError<Report[]>(`getReportsByUserId userId=${userId}`, []))
      );
  }

  // Get reports by protocol ID
  getReportsByProtocolId(protocolId: number): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/protocol/${protocolId}`)
      .pipe(
        tap(reports => console.log(`Fetched reports for protocol id=${protocolId}`)),
        catchError(this.handleError<Report[]>(`getReportsByProtocolId protocolId=${protocolId}`, []))
      );
  }

  // Update standard report entry
  updateStandardReportEntry(reportId: number, entryId: number, data: StandardReportEntryUpdateRequest): Observable<StandardReportEntry> {
    return this.http.put<StandardReportEntry>(`${this.apiUrl}/${reportId}/standard-entries/${entryId}`, data)
      .pipe(
        tap(_ => console.log(`Updated standard entry id=${entryId} for report id=${reportId}`)),
        catchError(this.handleError<StandardReportEntry>(`updateStandardReportEntry reportId=${reportId}, entryId=${entryId}`))
      );
  }

  // Update specific report entry
  updateSpecificReportEntry(reportId: number, entryId: number, data: SpecificReportEntryUpdateRequest): Observable<SpecificReportEntry> {
    return this.http.put<SpecificReportEntry>(`${this.apiUrl}/${reportId}/specific-entries/${entryId}`, data)
      .pipe(
        tap(_ => console.log(`Updated specific entry id=${entryId} for report id=${reportId}`)),
        catchError(this.handleError<SpecificReportEntry>(`updateSpecificReportEntry reportId=${reportId}, entryId=${entryId}`))
      );
  }

  // Mark report as completed
  markReportAsCompleted(reportId: number): Observable<Report> {
    return this.http.patch<Report>(`${this.apiUrl}/${reportId}/complete`, {})
      .pipe(
        tap(_ => console.log(`Marked report id=${reportId} as completed`)),
        catchError(this.handleError<Report>(`markReportAsCompleted id=${reportId}`))
      );
  }

  // Get maintenance form for a report
  getMaintenanceForm(reportId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${reportId}/maintenance-form`)
      .pipe(
        tap(_ => console.log(`Fetched maintenance form for report id=${reportId}`)),
        catchError(this.handleError<any>(`getMaintenanceForm reportId=${reportId}`))
      );
  }

  // Update maintenance form for a report
  updateMaintenanceForm(reportId: number, formData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${reportId}/maintenance-form`, formData)
      .pipe(
        tap(_ => console.log(`Updated maintenance form for report id=${reportId}`)),
        catchError(this.handleError<any>(`updateMaintenanceForm reportId=${reportId}`))
      );
  }

  // Protocol Management Methods
  
  // Get all protocols
  getAllProtocols(): Observable<Protocol[]> {
    // Use mock data for testing if useMockData is true
    if (this.useMockData) {
      console.log('Using mock protocols data (useMockData=true)');
      return of(this.MOCK_PROTOCOLS);
    }
    
    console.log(`Fetching protocols from ${this.protocolsUrl}`);
    return this.http.get<Protocol[]>(this.protocolsUrl)
      .pipe(
        tap(protocols => {
          if (protocols && protocols.length > 0) {
            console.log('Fetched protocols:', protocols.length);
          } else {
            console.log('No protocols returned from API');
          }
        }),
        catchError((error) => {
          console.error('Error fetching protocols:', error);
          
          // Return mock data if the API fails
          console.log('Returning mock protocols data as fallback');
          return of(this.MOCK_PROTOCOLS);
        })
      );
  }

  // Get protocol by ID
  getProtocolById(id: number): Observable<Protocol> {
    if (this.useMockData) {
      const protocol = this.MOCK_PROTOCOLS.find(p => p.id === id);
      return of(protocol as Protocol);
    }
    
    return this.http.get<Protocol>(`${this.protocolsUrl}/${id}`)
      .pipe(
        tap(protocol => console.log(`Fetched protocol id=${id}`)),
        catchError(this.handleError<Protocol>(`getProtocolById id=${id}`))
      );
  }

  // Create a new protocol
  createProtocol(protocolData: Partial<Protocol>): Observable<Protocol> {
    if (this.useMockData) {
      // Create a new protocol with mock ID and user data
      const newProtocol: Protocol = {
        id: Math.max(...this.MOCK_PROTOCOLS.map(p => p.id), 0) + 1,
        name: protocolData.name ?? '',
        protocolType: protocolData.protocolType ?? 'Homologation',
        createdBy: {
          id: 1,
          firstName: 'Current',
          lastName: 'User',
          email: 'current.user@example.com',
          role: 'ADMIN',
          department: { id: 1, name: 'IT' }
        }
      };
      this.MOCK_PROTOCOLS.push(newProtocol);
      return of(newProtocol);
    }
    
    return this.http.post<Protocol>(this.protocolsUrl, protocolData)
      .pipe(
        tap(newProtocol => console.log(`Created protocol id=${newProtocol.id}`)),
        catchError(this.handleError<Protocol>('createProtocol'))
      );
  }

  // Update a protocol
  updateProtocol(protocolData: Protocol): Observable<Protocol> {
    if (this.useMockData) {
      const index = this.MOCK_PROTOCOLS.findIndex(p => p.id === protocolData.id);
      if (index !== -1) {
        this.MOCK_PROTOCOLS[index] = { ...this.MOCK_PROTOCOLS[index], ...protocolData };
        return of(this.MOCK_PROTOCOLS[index]);
      }
      return throwError(() => new Error(`Protocol with id=${protocolData.id} not found`));
    }
    
    return this.http.put<Protocol>(`${this.protocolsUrl}/${protocolData.id}`, protocolData)
      .pipe(
        tap(_ => console.log(`Updated protocol id=${protocolData.id}`)),
        catchError(this.handleError<Protocol>(`updateProtocol id=${protocolData.id}`))
      );
  }

  // Delete a protocol
  deleteProtocol(id: number): Observable<void> {
    if (this.useMockData) {
      const index = this.MOCK_PROTOCOLS.findIndex(p => p.id === id);
      if (index !== -1) {
        this.MOCK_PROTOCOLS.splice(index, 1);
        return of(void 0);
      }
      return throwError(() => new Error(`Protocol with id=${id} not found`));
    }
    
    return this.http.delete<void>(`${this.protocolsUrl}/${id}`)
      .pipe(
        tap(_ => console.log(`Deleted protocol id=${id}`)),
        catchError(this.handleError<void>(`deleteProtocol id=${id}`))
      );
  }

  // Get all criteria for a protocol
  getProtocolCriteria(protocolId: number): Observable<SpecificControlCriteria[]> {
    if (this.useMockData) {
      // Mock criteria data
      const mockCriteria: SpecificControlCriteria[] = [
        {
          id: 1,
          description: 'Check machine alignment',
          protocol: this.MOCK_PROTOCOLS.find(p => p.id === protocolId) || this.MOCK_PROTOCOLS[0]
        },
        {
          id: 2,
          description: 'Verify electrical connections',
          protocol: this.MOCK_PROTOCOLS.find(p => p.id === protocolId) || this.MOCK_PROTOCOLS[0]
        },
        {
          id: 3,
          description: 'Test emergency stop functionality',
          protocol: this.MOCK_PROTOCOLS.find(p => p.id === protocolId) || this.MOCK_PROTOCOLS[0]
        }
      ];
      return of(mockCriteria);
    }
    
    return this.http.get<SpecificControlCriteria[]>(`${this.protocolsUrl}/${protocolId}/criteria`)
      .pipe(
        tap(criteria => console.log(`Fetched criteria for protocol id=${protocolId}`)),
        catchError(this.handleError<SpecificControlCriteria[]>(`getProtocolCriteria protocolId=${protocolId}`, []))
      );
  }

  // Add a criteria to a protocol
  addCriteriaToProtocol(protocolId: number, criteriaData: Partial<SpecificControlCriteria>): Observable<SpecificControlCriteria> {
    if (this.useMockData) {
      // Create a mock criteria
      const newCriteria: SpecificControlCriteria = {
        id: Math.floor(Math.random() * 1000) + 100,
        description: criteriaData.description || '',
        protocol: this.MOCK_PROTOCOLS.find(p => p.id === protocolId) || this.MOCK_PROTOCOLS[0]
      };
      return of(newCriteria);
    }
    
    return this.http.post<SpecificControlCriteria>(`${this.protocolsUrl}/${protocolId}/criteria`, criteriaData)
      .pipe(
        tap(criteria => console.log(`Added criteria id=${criteria.id} to protocol id=${protocolId}`)),
        catchError(this.handleError<SpecificControlCriteria>(`addCriteriaToProtocol protocolId=${protocolId}`))
      );
  }

  // Delete a criteria
  deleteCriteria(protocolId: number, criteriaId: number): Observable<void> {
    if (this.useMockData) {
      return of(void 0);
    }
    
    return this.http.delete<void>(`${this.protocolsUrl}/${protocolId}/criteria/${criteriaId}`)
      .pipe(
        tap(_ => console.log(`Deleted criteria id=${criteriaId} from protocol id=${protocolId}`)),
        catchError(this.handleError<void>(`deleteCriteria criteriaId=${criteriaId}, protocolId=${protocolId}`))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          console.error(`${operation} failed: Not authorized`);
        } else if (error.status === 401) {
          console.error(`${operation} failed: Not authenticated`);
        } else {
          console.error(`${operation} failed: ${error.message}`);
        }
      } else {
        console.error(`${operation} failed: ${error.message}`);
      }

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
} 