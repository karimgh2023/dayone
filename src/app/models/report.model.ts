export interface Report {
  id: number;
  type: string;
  protocol: Protocol;
  createdBy: User;
  reportUsers: UserAssignmentDTO[] | number[];
  reportEntries: StandardReportEntry[] | SpecificReportEntry[];
  createdAt: string;
  isCompleted: boolean;
  serialNumber?: string;
  equipmentDescription?: string;
  designation?: string;
  manufacturer?: string;
  immobilization?: string;
  serviceSeg?: string;
  businessUnit?: string;
  maintenanceForm?: MaintenanceForm;
}

export interface Protocol {
  id: number;
  name: string;
  protocolType: 'Homologation' | 'Requalification';
  createdBy: User;
  standardCriteriaCount?: number;
  specificCriteriaCount?: number;
  type?: string; // To match the backend DTO field
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profilePhoto?: string;
  department: Department;
  plant?: Plant;
  role: string;
  username?: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface Plant {
  id: number;
  name: string;
  address: string;
}

export interface ReportUser {
  id?: number;
  report: Report;
  user: User;
}

export interface StandardReportEntry {
  id: number;
  reportId: number;
  criteria: {
    id: number;
    description: string;
    equipmentType: string;
    requiredFrequency: number;
    implementation: string;
  };
  isImplemented: boolean;
  action: string | null;
  deadline: string | null;
  successControl: string | null;
  isUpdated: boolean;
  updatedBy: any | null;
  updatedAt: string | null;
}

export interface SpecificReportEntry {
  id: number;
  reportId: number;
  criteria: {
    id: number;
    description: string;
    checkResponsible: {
      id: number;
      name: string;
    };
    implementationResponsible: {
      id: number;
      name: string;
    };
  };
  isImplemented: boolean;
  action: string | null;
  deadline: string | null;
  successControl: string | null;
  isUpdated: boolean;
  updatedBy: any | null;
  updatedAt: string | null;
}

export interface StandardControlCriteria {
  id: number;
  description: string;
  checkResponsible: Department;
  implementationResponsible: Department;
}

export interface SpecificControlCriteria {
  id: number;
  description: string;
  protocol: Protocol;
  checkResponsible?: Department[];
  implementationResponsible?: Department[];
}

export interface MaintenanceForm {
  id?: number;
  reportId: number;
  hasTransformer: boolean;
  isInOrder: boolean;
  controlCircuit?: string;
  frequency?: string;
  fuseValue?: string;
  insulationResistanceCable?: string;
  insulationResistanceMotor?: string;
  machineSizeHeight?: string;
  machineSizeLength?: string;
  machineSizeWidth?: string;
  phaseBalanceTest210v?: string;
  phaseBalanceTest380v?: string;
  powerCircuit?: string;
  controlStandard?: ControlStandard;
  currentType?: CurrentType;
  networkForm?: NetworkForm;
}

export interface ReportCreationRequest {
  title?: string;
  description?: string;
  type: string;
  protocolId: number;
  assignedToId?: number;
  assignedUsers?: UserAssignmentDTO[];
  serialNumber?: string;
  equipmentDescription?: string;
  designation?: string;
  manufacturer?: string;
  immobilization?: string;
  serviceSeg?: string;
  businessUnit?: string;
  
  // Homologation-specific fields
  initialVerificationDate?: string;
  equipmentCategory?: string;
  
  // Requalification-specific fields
  lastQualificationDate?: string;
  maintenanceFrequency?: string;
}

export interface UserAssignmentDTO {
  userId: number;
}

export interface StandardReportEntryUpdateRequest {
  value: string;
  conformity: boolean;
  comments?: string;
}

export interface SpecificReportEntryUpdateRequest {
  value: string;
  conformity: boolean;
  comments?: string;
}

export enum ControlStandard {
  NFC_15_100 = 'NFC_15_100',
  VDE_0100 = 'VDE_0100',
  NONE = 'NONE'
}

export enum CurrentType {
  AC = 'AC',
  DC = 'DC',
  NONE = 'NONE'
}

export enum NetworkForm {
  SYSTEM_3_CONDUCTORS = 'SYSTEM_3_CONDUCTORS',
  SYSTEM_4_CONDUCTORS = 'SYSTEM_4_CONDUCTORS',
  SYSTEM_5_CONDUCTORS = 'SYSTEM_5_CONDUCTORS'
} 