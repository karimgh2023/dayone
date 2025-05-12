import { Department } from './department.model';
import { Plant } from './plant.model';

export interface UserDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto?: string;
  department?: Department;
  plant?: Plant;
}