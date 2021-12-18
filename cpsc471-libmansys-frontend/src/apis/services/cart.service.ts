import { cartEndpointMap } from "apis/data";
import { sendRequest } from "apis/utils";
import {
  BorrowedItemInfo,
  CartElementInfo,
  CartElementPayload,
  FineInfo,
  ReturnedItemInfo,
} from "models";

export const postCart = async (
  token: string | null,
  student_id: number | null,
  myCart: CartElementInfo[],
): Promise<void> => {
  if (token && student_id) {
    myCart.forEach(async (item) => {
      const data: CartElementPayload = {
        item_id: item.item_id,
        student_id: student_id,
        date: "2021/12/17",
      };
      await sendRequest<CartElementPayload, Promise<void>>({
        endpointInfo: cartEndpointMap.postBorrowedItemInfo,
        useTokenInHeaders: true,
        data,
        token: token,
      });
    });
  }
};

export async function getFinesByStudent(
  token: string | null,
  student_id: number | null,
): Promise<FineInfo[]> {
  if (token && student_id) {
    const result = await sendRequest<number, FineInfo[]>({
      endpointInfo: {
        endpoint: cartEndpointMap.getFinesByStudent.endpoint + student_id,
        method: cartEndpointMap.getFinesByStudent.method,
      },
      useTokenInHeaders: true,
      token: token,
    });
    return result.result ?? [];
  }
  return [];
}

export async function fetchBorrowedForUser(
  token: string | null,
  student_id: number | null,
): Promise<BorrowedItemInfo[]> {
  if (token && student_id) {
    const result = await sendRequest<never, BorrowedItemInfo[]>({
      endpointInfo: {
        endpoint:
          cartEndpointMap.getBorrowedItemForUser.endpoint + `${student_id}`,
        method: cartEndpointMap.getBorrowedItemForUser.method,
      },
      useTokenInHeaders: true,
      token: token,
    });
    console.log(result.result);
    return result.result ?? [];
  }
  return [];
}

export async function fetchBorrowedForAll(
  token: string | null,
): Promise<BorrowedItemInfo[]> {
  if (token) {
    const result = await sendRequest<never, BorrowedItemInfo[]>({
      endpointInfo: {
        endpoint:
          cartEndpointMap.getBorrowedItemForAll.endpoint ,
        method: cartEndpointMap.getBorrowedItemForAll.method,
      },
      useTokenInHeaders: true,
      token: token,
    });
    console.log(result.result);
    return result.result ?? [];
  }
  return [];
}
export async function fetchReturnedForAll(
  token: string | null,
): Promise<ReturnedItemInfo[]> {
  if (token) {
    const result = await sendRequest<never, ReturnedItemInfo[]>({
      endpointInfo: {
        endpoint:
          cartEndpointMap.getReturnedItemForAll.endpoint ,
        method: cartEndpointMap.getReturnedItemForAll.method,
      },
      useTokenInHeaders: true,
      token: token,
    });
    console.log(result.result);
    return result.result ?? [];
  }
  return [];
}
