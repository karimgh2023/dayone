import { UserAssignmentDTO } from "./user-assignment-dto.model";

export interface ReportRequest {
  protocolId: number;
  type: string;
  serialNumber: string;
  equipmentDescription: string;
  designation: string;
  manufacturer: string;
  immobilization: string;
  serviceSeg: string;
  businessUnit: string;
  assignedUsers: UserAssignmentDTO[];
} 