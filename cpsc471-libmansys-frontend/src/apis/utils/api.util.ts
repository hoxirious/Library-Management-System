import { APIResult } from "apis/data/api.data";
import axios, { AxiosRequestHeaders, Method } from "axios";
import { CustomError } from "models";

export interface SendRequestProps<T> {
  endpointInfo: {
    endpoint: string;
    method: Method;
  };
  data?: T;
  token?: string;
  useTokenInHeaders: boolean;
  customHeader?: AxiosRequestHeaders;
  extraPath?: string;
}

export const sendRequest = async <
  ReqT = any,
  ResT = any,
  ErrorMessageType extends string = string,
>({
  endpointInfo,
  data,
  token,
  customHeader,
  useTokenInHeaders = true,
  extraPath,
}: SendRequestProps<ReqT>): Promise<APIResult<ResT>> => {
  let result: APIResult<ResT, CustomError<ErrorMessageType>> = {
    result: null,
    error: null,
  };
  try {
    const headers: Record<string, any> = { ...customHeader };
    if (useTokenInHeaders) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const baseURL = endpointInfo.endpoint + (extraPath ?? "");
    const response = await axios({
      baseURL,
      headers,
      data,
      method: endpointInfo.method,
    });
    result.result = response.data;
  } catch {
    //TODOS complete result.error
    console.error(result.error);
  }
  return result;
};
