export interface CustomError<ErrorMessageType extends string = string> {
    message: ErrorMessageType;
    detailMessage?: string;
    canToast?: boolean;
  }