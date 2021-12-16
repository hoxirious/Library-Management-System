import { CustomError } from "models";

export interface APIResult<ReturnType = any, ErrorType extends CustomError = any,> {
  result: ReturnType | null;
  error: ErrorType | null
}

export interface GetBillingDataDto {
    serviceId: string,
}
