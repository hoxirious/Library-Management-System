import { itemEndpointMap } from "apis/data";
import { sendRequest } from "apis/utils";
import { ItemInfo, ItemType } from "models";

export const fetchItem = async (
  token: string | null,
  itemType: ItemType,
): Promise<ItemInfo[]> => {
  if (token) {
    const result = await sendRequest<never, ItemInfo[]>({
      endpointInfo: {
        endpoint: itemEndpointMap.getAllItemInfoByType.endpoint + `${itemType}`,
        method: itemEndpointMap.getAllItemInfoByType.method,
      },
      useTokenInHeaders: true,
      token: token,
    });
    return result.result ?? [];
  }
  return [];
};

export async function getItemById(
  token: string | null,
  item_id: number,
): Promise<ItemInfo | null> {
  if (token) {
    const result = await sendRequest<number, ItemInfo>({
      endpointInfo: {
        endpoint: itemEndpointMap.getItemInfoById.endpoint + item_id,
        method: itemEndpointMap.getItemInfoById.method,
      },
      useTokenInHeaders: true,
      token: token,
    });

    return result.result ?? null;
  }
  return null;
}

export async function updateItemInfo(
  token: string | null,
  item: ItemInfo,
): Promise<number> {
  if (token) {
    let data;
    if (item.type === "book" || item.type === "magazine") {
      data = {
        name: item.name,
        amount: item.amount,
        location: item.location,
        library: item.library,
        pub_id: item.pub_id,
        type: item.type,
        genre: item.genre as string,
        length: null,
        author_id: item.author_id,
        pages: item.pages,
      };
    } else if (item.type === "cd") {
      data = {
        name: item.name,
        amount: item.amount,
        location: item.location,
        library: item.library,
        pub_id: item.pub_id,
        type: item.type,
        genre: item.genre as string,
        length: item.length,
        author_id: null,
        pages: null,
      };
    }
    const result = await sendRequest<any, number>({
      endpointInfo: {
        endpoint: itemEndpointMap.putItemInfoById.endpoint + item.item_id,
        method: itemEndpointMap.putItemInfoById.method,
      },
      useTokenInHeaders: true,
      token: token,
      data: data,
    });

    return result.result ?? -1;
  }
  return -1;
}

export async function addItemInfo(
  token: string | null,
  item: ItemInfo,
): Promise<number> {
  if (token) {
    let data;
    if (item.type === "book" || item.type === "magazine") {
      data = {
        name: item.name,
        amount: item.amount,
        location: item.location,
        library: item.library,
        pub_id: item.pub_id,
        type: item.type,
        genre: item.genre as string,
        length: null,
        author_id: item.author_id,
        pages: item.pages,
      };
    } else if (item.type === "cd") {
      data = {
        name: item.name,
        amount: item.amount,
        location: item.location,
        library: item.library,
        pub_id: item.pub_id,
        type: item.type,
        genre: item.genre as string,
        length: item.length,
        author_id: null,
        pages: null,
      };
    }
    const result = await sendRequest<any, number>({
      endpointInfo: {
        endpoint: itemEndpointMap.postItem.endpoint,
        method: itemEndpointMap.postItem.method,
      },
      useTokenInHeaders: true,
      token: token,
      data: data,
    });

    return result.result ?? -1;
  }
  return -1;
}

export async function deleteItemInfo(
  token: string | null,
  item: ItemInfo,
): Promise<number> {
  if (token) {
    let data;
    if (item.type === "book" || item.type === "magazine") {
      data = {
        name: item.name,
        amount: item.amount,
        location: item.location,
        library: item.library,
        pub_id: item.pub_id,
        type: item.type,
        genre: item.genre as string,
        length: null,
        author_id: item.author_id,
        pages: item.pages,
      };
    } else if (item.type === "cd") {
      data = {
        name: item.name,
        amount: item.amount,
        location: item.location,
        library: item.library,
        pub_id: item.pub_id,
        type: item.type,
        genre: item.genre as string,
        length: item.length,
        author_id: null,
        pages: null,
      };
    }
    const result = await sendRequest<any, number>({
      endpointInfo: {
        endpoint: itemEndpointMap.deleteItem.endpoint + item.item_id,
        method: itemEndpointMap.deleteItem.method,
      },
      useTokenInHeaders: true,
      token: token,
      data: data,
    });

    return result.result ?? -1;
  }
  return -1;
}