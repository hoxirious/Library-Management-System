import { itemEndpointMap } from "apis/data";
import { sendRequest } from "apis/utils";
import { BookInfo, CdInfo, MagazineInfo } from "models";

export const fetchBookList = async (
  token: string | null,
): Promise<BookInfo[]> => {
  if (token) {
    const result = await sendRequest<never, BookInfo[]>({
      endpointInfo: {
        endpoint: itemEndpointMap.getAllItemInfoByType.endpoint + `book`,
        method: itemEndpointMap.getAllItemInfoByType.method,
      },
      useTokenInHeaders: true,
      token: token,
    });
    return result.result ?? [];
  }
  return [];
};
export const fetchCdList = async (token: string | null): Promise<CdInfo[]> => {
  if (token) {
    const result = await sendRequest<never, CdInfo[]>({
      endpointInfo: {
        endpoint: itemEndpointMap.getAllItemInfoByType.endpoint + `cd`,
        method: itemEndpointMap.getAllItemInfoByType.method,
      },
      useTokenInHeaders: true,
      token: token,
    });
    return result.result ?? [];
  }
  return [];
};

export const fetchMagazineList = async (
  token: string | null,
): Promise<MagazineInfo[]> => {
  if (token) {
    const result = await sendRequest<never, MagazineInfo[]>({
      endpointInfo: {
        endpoint: itemEndpointMap.getAllItemInfoByType.endpoint + `magazine`,
        method: itemEndpointMap.getAllItemInfoByType.method,
      },
      useTokenInHeaders: true,
      token: token,
    });
    return result.result ?? [];
  }
  return [];
};
