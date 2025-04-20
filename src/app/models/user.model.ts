import { Department } from './department.model';
import { Plant } from './plant.model';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: number | string;
    profilePhoto?: string;
    department: Department;
    plant?: Plant;
    role: string;
    username?: string;
}
  