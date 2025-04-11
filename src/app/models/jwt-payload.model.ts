// jwt-payload.model.ts
export interface JwtPayload {
    sub: string;
    firstName: string;
    lastName: string;
    department?: string;
    phoneNumber?: number;
    email: string;
    role?: string;
    exp?: number;
    iat?: number;
  }
  