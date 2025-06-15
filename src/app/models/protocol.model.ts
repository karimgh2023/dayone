import { ProtocolType } from './protocol-type.enum';
import { SpecificCriteriaDTO } from './SpecificCriteriaDTO.model';
import { User } from './user.model';

export interface Protocol {
  id: number;
  name: string;
  protocolType: ProtocolType;
  createdBy: User;
  specificControlCriteriaList: SpecificCriteriaDTO[];
}
