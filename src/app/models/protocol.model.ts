import { User } from './user.model';
import { ProtocolType } from './protocol-type.enum';

export interface Protocol {
  id: number;
  name: string;
  protocolType: ProtocolType;
  createdBy: User;
  standardCriteriaCount?: number;
  specificCriteriaCount?: number;
  type?: string; // To match the backend DTO field
} 