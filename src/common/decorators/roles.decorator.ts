import { SetMetadata } from "@nestjs/common";

export const ROLE_KEY = 'ROLE';
export const Roles = (...roles) => SetMetadata(ROLE_KEY, roles);