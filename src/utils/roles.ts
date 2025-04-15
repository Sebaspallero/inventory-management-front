export enum UserRole {
    ADMIN = "ADMIN",
    EMPLOYEE = "EMPLOYEE"
  }
  
export const ROLE_LABELS: Record<UserRole, string> = {
    [UserRole.ADMIN]: "Administrador",
    [UserRole.EMPLOYEE]: "Empleado"
};