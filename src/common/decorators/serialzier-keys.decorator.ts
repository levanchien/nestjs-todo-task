import { SetMetadata } from "@nestjs/common";

export const SERIALZIER_KEYS = 'keys';
export const SerialzierKeys = (...keys: string[]) => SetMetadata(SERIALZIER_KEYS, keys);