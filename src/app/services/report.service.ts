import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { 
  Report, 
  ReportCreationRequest, 
  StandardReportEntryUpdateRequest, 
  SpecificReportEntryUpdateRequest,
  StandardReportEntry,
  SpecificReportEntry,
  Protocol,
  SpecificControlCriteria,
  Department,
  StandardControlCriteria
} from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = `${environment.apiUrl}/rapports`;
  private protocolsUrl = `${environment.apiUrl}/protocols`;
  private useMockData = true; // Set to false to use real API
  private useRealProtocolsData = true; // Use real data for protocols

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
        catchError(error => {
          console.error(`[Auth Interceptor] ${error.status === 403 ? 'Forbidden - access denied' : 'Error'}`);
          console.error(`deleteReport id=${id} failed: ${error.status === 403 ? 'Not authorized' : error.message}`);
          return throwError(() => error);
        })
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
    console.log(`Fetching protocols from ${this.protocolsUrl}`);
    
    // Always try the real API first, regardless of useMockData setting
    return this.http.get<Protocol[]>(this.protocolsUrl)
      .pipe(
        tap(protocols => {
          if (protocols && protocols.length > 0) {
            console.log('Fetched protocols from API:', protocols.length);
          } else {
            console.log('No protocols returned from API');
          }
        }),
        catchError((error) => {
          console.error('Error fetching protocols:', error);
          
          // Handle different error types
          if (error.status === 403) {
            console.error('Access forbidden to protocols API. Backend security is blocking access.');
            console.error('Make sure SecurityConfig.java has .requestMatchers("/api/protocols/**").permitAll()');
          } else if (error.status === 404) {
            console.error('Protocols endpoint not found. Check the controller mapping in ProtocolController.java.');
          } else if (error.name === 'SyntaxError' || error.message?.includes('JWT')) {
            console.error('JWT token error. Token may be malformed or corrupted.');
            console.error('Try clearing local storage and logging in again.');
          }
          
          // Return mock data as fallback
          console.log('Returning mock protocols data as fallback');
          return of(this.MOCK_PROTOCOLS);
        })
      );
  }

  // Get protocol by ID
  getProtocolById(id: number): Observable<Protocol> {
    if (this.useMockData) {
      const protocol = this.MOCK_PROTOCOLS.find(p => p.id === id);
      if (!protocol) {
        return throwError(() => new Error(`Protocol with ID ${id} not found`));
      }
      return of(protocol as Protocol).pipe(delay(300));
    }
    
    return this.http.get<Protocol>(`${this.protocolsUrl}/${id}`)
      .pipe(
        tap(protocol => console.log(`Fetched protocol id=${id}`)),
        catchError(error => {
          console.error(`Error fetching protocol id=${id}:`, error);
          return throwError(() => new Error(`Failed to load protocol: ${error.message || 'Unknown error'}`));
        })
      );
  }

  // Create a new protocol
  createProtocol(protocolData: Partial<Protocol>): Observable<Protocol> {
    if (this.useMockData) {
      // Validate required fields
      if (!protocolData.name || !protocolData.protocolType) {
        return throwError(() => new Error('Protocol name and type are required'));
      }
      
      // Create a new protocol with mock ID and user data
      const newProtocol: Protocol = {
        id: Math.max(...this.MOCK_PROTOCOLS.map(p => p.id), 0) + 1,
        name: protocolData.name,
        protocolType: protocolData.protocolType,
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
      return of(newProtocol).pipe(delay(500));
    }
    
    return this.http.post<Protocol>(this.protocolsUrl, protocolData)
      .pipe(
        tap(newProtocol => console.log(`Created protocol id=${newProtocol.id}`)),
        catchError(error => {
          console.error('Error creating protocol:', error);
          let errorMsg = 'Failed to create protocol';
          if (error.status === 400) {
            errorMsg = error.error || 'Invalid protocol data';
          } else if (error.status === 403 || error.status === 401) {
            errorMsg = 'You are not authorized to create protocols';
          }
          return throwError(() => new Error(errorMsg));
        })
      );
  }

  // Update a protocol
  updateProtocol(protocolData: Protocol): Observable<Protocol> {
    if (!protocolData.id) {
      return throwError(() => new Error('Protocol ID is required for updates'));
    }
    
    if (this.useMockData) {
      const index = this.MOCK_PROTOCOLS.findIndex(p => p.id === protocolData.id);
      if (index === -1) {
        return throwError(() => new Error(`Protocol with id=${protocolData.id} not found`));
      }
      
      // Update the protocol in our mock data
      this.MOCK_PROTOCOLS[index] = { ...this.MOCK_PROTOCOLS[index], ...protocolData };
      return of(this.MOCK_PROTOCOLS[index]).pipe(delay(500));
    }
    
    return this.http.put<Protocol>(`${this.protocolsUrl}/${protocolData.id}`, protocolData)
      .pipe(
        tap(_ => console.log(`Updated protocol id=${protocolData.id}`)),
        catchError(error => {
          console.error(`Error updating protocol id=${protocolData.id}:`, error);
          let errorMsg = 'Failed to update protocol';
          if (error.status === 400) {
            errorMsg = error.error || 'Invalid protocol data';
          } else if (error.status === 404) {
            errorMsg = 'Protocol not found';
          } else if (error.status === 403 || error.status === 401) {
            errorMsg = 'You are not authorized to update this protocol';
          }
          return throwError(() => new Error(errorMsg));
        })
      );
  }

  // Delete a protocol
  deleteProtocol(id: number): Observable<void> {
    if (this.useMockData) {
      const index = this.MOCK_PROTOCOLS.findIndex(p => p.id === id);
      if (index === -1) {
        return throwError(() => new Error(`Protocol with id=${id} not found`));
      }
      
      // Check if any reports are using this protocol
      const reportsUsingProtocol = this.MOCK_REPORTS.filter(r => r.protocol.id === id);
      if (reportsUsingProtocol.length > 0) {
        return throwError(() => new Error(`Cannot delete protocol with id=${id} because it is used by ${reportsUsingProtocol.length} reports`));
      }
      
      this.MOCK_PROTOCOLS.splice(index, 1);
      return of(void 0).pipe(delay(500));
    }
    
    return this.http.delete<void>(`${this.protocolsUrl}/${id}`)
      .pipe(
        tap(_ => console.log(`Deleted protocol id=${id}`)),
        catchError(error => {
          console.error(`Error deleting protocol id=${id}:`, error);
          let errorMsg = 'Failed to delete protocol';
          if (error.status === 404) {
            errorMsg = 'Protocol not found';
          } else if (error.status === 403 || error.status === 401) {
            errorMsg = 'You are not authorized to delete this protocol';
          } else if (error.status === 400) {
            errorMsg = error.error || 'Cannot delete protocol that is in use';
          }
          return throwError(() => new Error(errorMsg));
        })
      );
  }

  // Get all criteria for a protocol
  getProtocolCriteria(protocolId: number): Observable<SpecificControlCriteria[]> {
    if (this.useMockData) {
      // Simulate API call with delay
      console.log(`Mock: Getting specific criteria for protocol ${protocolId}`);
      const mockCriteria: SpecificControlCriteria[] = [
        {
          id: 101,
          description: 'Check for leaks in hydraulic system',
          protocol: this.MOCK_PROTOCOLS.find(p => p.id === protocolId) || this.MOCK_PROTOCOLS[0],
          checkResponsible: [
            { id: 1, name: 'Maintenance' }, 
            { id: 5, name: 'Safety' }
          ],
          implementationResponsible: [
            { id: 3, name: 'Production' }
          ]
        },
        {
          id: 102,
          description: 'Verify emergency stop functionality',
          protocol: this.MOCK_PROTOCOLS.find(p => p.id === protocolId) || this.MOCK_PROTOCOLS[0],
          checkResponsible: [
            { id: 2, name: 'Quality Control' }
          ],
          implementationResponsible: [
            { id: 1, name: 'Maintenance' },
            { id: 4, name: 'Engineering' }
          ]
        }
      ];
      
      return of(mockCriteria).pipe(delay(500));
    }

    return this.http.get<SpecificControlCriteria[]>(`${this.protocolsUrl}/${protocolId}/specific-criteria`)
      .pipe(
        tap(criteria => console.log(`Fetched specific criteria for protocol id=${protocolId}:`, criteria.length)),
        catchError(this.handleError<SpecificControlCriteria[]>('getProtocolCriteria', []))
      );
  }

  // Add a criteria to a protocol
  addCriteriaToProtocol(protocolId: number, criteriaData: Partial<SpecificControlCriteria>): Observable<SpecificControlCriteria> {
    if (this.useMockData) {
      // Simulate API call with delay
      console.log(`Mock: Adding criteria to protocol ${protocolId}`, criteriaData);
      return of({
        id: Math.floor(Math.random() * 1000),
        description: criteriaData.description || 'New Criteria',
        protocol: this.MOCK_PROTOCOLS.find(p => p.id === protocolId) || this.MOCK_PROTOCOLS[0]
      } as SpecificControlCriteria).pipe(delay(500));
    }

    return this.http.post<SpecificControlCriteria>(`${this.protocolsUrl}/${protocolId}/criteria`, criteriaData)
      .pipe(
        tap((newCriteria) => console.log(`Added criteria to protocol ${protocolId}:`, newCriteria)),
        catchError(this.handleError<SpecificControlCriteria>('addCriteriaToProtocol'))
      );
  }

  // Delete a criteria
  deleteCriteria(protocolId: number, criteriaId: number): Observable<void> {
    if (this.useMockData) {
      return of(void 0).pipe(delay(500));
    }
    
    return this.http.delete<void>(`${this.protocolsUrl}/${protocolId}/criteria/${criteriaId}`)
      .pipe(
        tap(_ => console.log(`Deleted criteria id=${criteriaId} from protocol id=${protocolId}`)),
        catchError(error => {
          console.error(`Error deleting criteria id=${criteriaId} from protocol id=${protocolId}:`, error);
          let errorMsg = 'Failed to delete criteria';
          if (error.status === 404) {
            errorMsg = 'Criteria or protocol not found';
          } else if (error.status === 403 || error.status === 401) {
            errorMsg = 'You are not authorized to delete this criteria';
          }
          return throwError(() => new Error(errorMsg));
        })
      );
  }

  // Update a report entry status
  updateReportEntryStatus(reportId: number, entryId: number, isStandard: boolean, status: string): Observable<any> {
    const entryType = isStandard ? 'standard' : 'specific';
    const updateData = isStandard ? 
      { value: status, conformity: status === 'Implemented' } as StandardReportEntryUpdateRequest : 
      { value: status, conformity: status === 'Homologated' } as SpecificReportEntryUpdateRequest;
    
    return isStandard ? 
      this.updateStandardReportEntry(reportId, entryId, updateData) : 
      this.updateSpecificReportEntry(reportId, entryId, updateData);
  }

  // Update a report status
  updateReportStatus(reportId: number, status: string): Observable<Report> {
    return this.http.patch<Report>(`${this.apiUrl}/${reportId}/status`, { status })
      .pipe(
        tap(_ => console.log(`Updated report id=${reportId} status to ${status}`)),
        catchError(this.handleError<Report>(`updateReportStatus id=${reportId}`))
      );
  }

  // Get all departments
  getAllDepartments(): Observable<Department[]> {
    if (this.useMockData) {
      const mockDepartments: Department[] = [
        { id: 1, name: 'Maintenance' },
        { id: 2, name: 'Quality Control' },
        { id: 3, name: 'Production' },
        { id: 4, name: 'Engineering' },
        { id: 5, name: 'Safety' }
      ];
      
      return of(mockDepartments).pipe(delay(500));
    }

    return this.http.get<Department[]>(`${environment.apiUrl}/departments`)
      .pipe(
        tap(departments => console.log('Fetched departments:', departments.length)),
        catchError(this.handleError<Department[]>('getAllDepartments', []))
      );
  }
  
  // Add standard criteria to a protocol
  addStandardCriteria(protocolId: number, criteriaData: any): Observable<StandardControlCriteria> {
    if (this.useMockData) {
      // Simulate API call with delay
      console.log(`Mock: Adding standard criteria to protocol ${protocolId}`, criteriaData);
      const mockCriteria: StandardControlCriteria = {
        id: Math.floor(Math.random() * 1000),
        description: criteriaData.description || 'New Standard Criteria',
        checkResponsible: { id: criteriaData.checkDepartmentId, name: this.getMockDepartmentName(criteriaData.checkDepartmentId) },
        implementationResponsible: { id: criteriaData.implementationDepartmentId, name: this.getMockDepartmentName(criteriaData.implementationDepartmentId) }
      };
      
      return of(mockCriteria).pipe(delay(500));
    }

    return this.http.post<StandardControlCriteria>(`${this.protocolsUrl}/${protocolId}/standard-criteria`, criteriaData)
      .pipe(
        tap((newCriteria) => console.log(`Added standard criteria to protocol ${protocolId}:`, newCriteria)),
        catchError(this.handleError<StandardControlCriteria>('addStandardCriteria'))
      );
  }
  
  // Add specific criteria to a protocol
  addSpecificCriteria(protocolId: number, criteriaData: any): Observable<SpecificControlCriteria> {
    if (this.useMockData) {
      // Simulate API call with delay
      console.log(`Mock: Adding specific criteria to protocol ${protocolId}`, criteriaData);
      
      const checkResponsible = criteriaData.checkDepartmentIds.map((id: number) => ({
        id: id,
        name: this.getMockDepartmentName(id)
      }));
      
      const implementationResponsible = criteriaData.implementationDepartmentIds.map((id: number) => ({
        id: id,
        name: this.getMockDepartmentName(id)
      }));
      
      const mockCriteria: SpecificControlCriteria = {
        id: Math.floor(Math.random() * 1000),
        description: criteriaData.description || 'New Specific Criteria',
        protocol: this.MOCK_PROTOCOLS.find(p => p.id === protocolId) || this.MOCK_PROTOCOLS[0],
        checkResponsible: checkResponsible,
        implementationResponsible: implementationResponsible
      };
      
      return of(mockCriteria).pipe(delay(500));
    }

    return this.http.post<SpecificControlCriteria>(`${this.protocolsUrl}/${protocolId}/specific-criteria`, criteriaData)
      .pipe(
        tap((newCriteria) => console.log(`Added specific criteria to protocol ${protocolId}:`, newCriteria)),
        catchError(this.handleError<SpecificControlCriteria>('addSpecificCriteria'))
      );
  }
  
  // Delete standard criteria
  deleteStandardCriteria(protocolId: number, criteriaId: number): Observable<void> {
    if (this.useMockData) {
      // Simulate API call with delay
      console.log(`Mock: Deleting standard criteria ${criteriaId} from protocol ${protocolId}`);
      return of(undefined).pipe(delay(500));
    }

    return this.http.delete<void>(`${this.protocolsUrl}/${protocolId}/standard-criteria/${criteriaId}`)
      .pipe(
        tap(_ => console.log(`Deleted standard criteria id=${criteriaId} from protocol id=${protocolId}`)),
        catchError(this.handleError<void>('deleteStandardCriteria'))
      );
  }
  
  // Delete specific criteria
  deleteSpecificCriteria(protocolId: number, criteriaId: number): Observable<void> {
    if (this.useMockData) {
      // Simulate API call with delay
      console.log(`Mock: Deleting specific criteria ${criteriaId} from protocol ${protocolId}`);
      return of(undefined).pipe(delay(500));
    }

    return this.http.delete<void>(`${this.protocolsUrl}/${protocolId}/specific-criteria/${criteriaId}`)
      .pipe(
        tap(_ => console.log(`Deleted specific criteria id=${criteriaId} from protocol id=${protocolId}`)),
        catchError(this.handleError<void>('deleteSpecificCriteria'))
      );
  }
  
  // Get standard criteria for a protocol
  getStandardCriteria(protocolId: number): Observable<StandardControlCriteria[]> {
    if (this.useMockData) {
      // Simulate API call with delay
      console.log(`Mock: Getting standard criteria for protocol ${protocolId}`);
      const mockCriteria: StandardControlCriteria[] = [
        {
          id: 1,
          description: 'Check electrical connections',
          checkResponsible: { id: 1, name: 'Maintenance' },
          implementationResponsible: { id: 4, name: 'Engineering' }
        },
        {
          id: 2,
          description: 'Inspect mechanical components',
          checkResponsible: { id: 2, name: 'Quality Control' },
          implementationResponsible: { id: 3, name: 'Production' }
        }
      ];
      
      return of(mockCriteria).pipe(delay(500));
    }

    return this.http.get<StandardControlCriteria[]>(`${this.protocolsUrl}/${protocolId}/standard-criteria`)
      .pipe(
        tap(criteria => console.log(`Fetched standard criteria for protocol id=${protocolId}:`, criteria.length)),
        catchError(this.handleError<StandardControlCriteria[]>('getStandardCriteria', []))
      );
  }
  
  // Helper method to get a department name based on ID (mock data)
  private getMockDepartmentName(id: number): string {
    const departments = [
      { id: 1, name: 'Maintenance' },
      { id: 2, name: 'Quality Control' },
      { id: 3, name: 'Production' },
      { id: 4, name: 'Engineering' },
      { id: 5, name: 'Safety' }
    ];
    
    const department = departments.find(dept => dept.id === id);
    return department ? department.name : 'Unknown Department';
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
        console.error(`${operation} failed: ${error.message || error.toString()}`);
      }
      return of(result as T);
    };
  }

  // Get standard entries for a report
  getStandardEntries(reportId: number): Observable<StandardReportEntry[]> {
    const url = `${this.apiUrl}/${reportId}/entries/standard`;
    
    // For mock data, simulate a response
    if (this.useMockData) {
      // Create mock standard entries
      const mockEntries: StandardReportEntry[] = [
        {
          id: 1,
          reportId: reportId,
          criteria: {
            id: 1,
            description: 'Machine power components are properly installed',
            equipmentType: 'Electrical',
            requiredFrequency: 12,
            implementation: 'Visual inspection of all power connections'
          },
          isImplemented: false,
          action: '',
          deadline: null,
          successControl: '',
          isUpdated: false,
          updatedBy: null,
          updatedAt: null
        },
        {
          id: 2,
          reportId: reportId,
          criteria: {
            id: 2,
            description: 'Safety interlocks are functioning properly',
            equipmentType: 'Mechanical',
            requiredFrequency: 6,
            implementation: 'Test all interlocks with power off'
          },
          isImplemented: false,
          action: '',
          deadline: null,
          successControl: '',
          isUpdated: false,
          updatedBy: null,
          updatedAt: null
        },
        {
          id: 3,
          reportId: reportId,
          criteria: {
            id: 3,
            description: 'Lubrication points are properly maintained',
            equipmentType: 'Mechanical',
            requiredFrequency: 3,
            implementation: 'Visual inspection and measurement of lubricant levels'
          },
          isImplemented: false,
          action: '',
          deadline: null,
          successControl: '',
          isUpdated: false,
          updatedBy: null,
          updatedAt: null
        }
      ];
      
      return of(mockEntries).pipe(delay(500));
    }
    
    return this.http.get<StandardReportEntry[]>(url)
      .pipe(
        catchError(this.handleError<StandardReportEntry[]>('getStandardEntries', []))
      );
  }
  
  // Get specific entries for a report
  getSpecificEntries(reportId: number): Observable<SpecificReportEntry[]> {
    const url = `${this.apiUrl}/${reportId}/entries/specific`;
    
    // For mock data, simulate a response
    if (this.useMockData) {
      // Create mock specific entries
      const mockEntries: SpecificReportEntry[] = [
        {
          id: 1,
          reportId: reportId,
          criteria: {
            id: 1,
            description: 'Inspect bearing assembly for wear and tear',
            checkResponsible: {
              id: 1,
              name: 'Maintenance Department'
            },
            implementationResponsible: {
              id: 2,
              name: 'Operations Department'
            }
          },
          isImplemented: false,
          action: '',
          deadline: null,
          successControl: '',
          isUpdated: false,
          updatedBy: null,
          updatedAt: null
        },
        {
          id: 2,
          reportId: reportId,
          criteria: {
            id: 2,
            description: 'Verify hydraulic system pressure meets specifications',
            checkResponsible: {
              id: 1,
              name: 'Maintenance Department'
            },
            implementationResponsible: {
              id: 1,
              name: 'Maintenance Department'
            }
          },
          isImplemented: false,
          action: '',
          deadline: null,
          successControl: '',
          isUpdated: false,
          updatedBy: null,
          updatedAt: null
        },
        {
          id: 3,
          reportId: reportId,
          criteria: {
            id: 3,
            description: 'Check electrical connections for corrosion and tightness',
            checkResponsible: {
              id: 3,
              name: 'Electrical Department'
            },
            implementationResponsible: {
              id: 3,
              name: 'Electrical Department'
            }
          },
          isImplemented: false,
          action: '',
          deadline: null,
          successControl: '',
          isUpdated: false,
          updatedBy: null,
          updatedAt: null
        }
      ];
      
      return of(mockEntries).pipe(delay(500));
    }
    
    return this.http.get<SpecificReportEntry[]>(url)
      .pipe(
        catchError(this.handleError<SpecificReportEntry[]>('getSpecificEntries', []))
      );
  }

  // Update a standard report entry
  updateStandardEntry(reportId: number, entryId: number, data: any): Observable<StandardReportEntry> {
    const url = `${this.apiUrl}/entry/standard/${entryId}`;
    
    // For mock data, simulate a response
    if (this.useMockData) {
      // Return the updated entry
      return of({
        ...data,
        id: entryId,
        reportId: reportId,
        updatedAt: new Date().toISOString(),
        updatedBy: {
          id: 1,
          firstName: 'Current',
          lastName: 'User',
          email: 'current.user@example.com'
        }
      }).pipe(delay(500));
    }
    
    return this.http.put<StandardReportEntry>(url, data)
      .pipe(
        catchError(this.handleError<StandardReportEntry>('updateStandardEntry'))
      );
  }

  // Update a specific report entry
  updateSpecificEntry(reportId: number, entryId: number, data: any): Observable<SpecificReportEntry> {
    const url = `${this.apiUrl}/entry/specific/${entryId}`;
    
    // For mock data, simulate a response
    if (this.useMockData) {
      // Return the updated entry
      return of({
        ...data,
        id: entryId,
        reportId: reportId,
        updatedAt: new Date().toISOString(),
        updatedBy: {
          id: 1,
          firstName: 'Current',
          lastName: 'User',
          email: 'current.user@example.com'
        }
      }).pipe(delay(500));
    }
    
    return this.http.put<SpecificReportEntry>(url, data)
      .pipe(
        catchError(this.handleError<SpecificReportEntry>('updateSpecificEntry'))
      );
  }
}
