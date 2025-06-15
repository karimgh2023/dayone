import {  AssignedUserDTO } from "./assignedUserDTO.model";
import { ProtocolType } from "./protocol-type.enum";
import { Protocol } from "./protocol.model";

export interface ReportDTO {
  id: number;
  protocol: String;
  protocolType: ProtocolType;
  type: string;
  serialNumber: string;
  equipmentDescription: string;
  designation: string;
  manufacturer: string;
  immobilization: string;
  serviceSeg: string;
  businessUnit: string;
  createdAt: string; // use Date if you want to parse it later
  createdByEmail: string;
  assignedUsers: AssignedUserDTO[];
  progress: number;
}
