import {
  addItemInfo,
  deleteItemInfo,
  fetchItem,
  getItemById,
  updateItemInfo,
} from "apis/services";
import { action, Action, thunk, Thunk } from "easy-peasy";
import { ItemInfo, ItemType } from "models";
import { StoreModel } from "store/StoreFront";

interface ItemState {
  bookList: ItemInfo[];
  cdList: ItemInfo[];
  magazineList: ItemInfo[];
}

interface ItemAction {
  setBookList: Action<ItemModel, ItemInfo[]>;
  setCdList: Action<ItemModel, ItemInfo[]>;
  setMagazineList: Action<ItemModel, ItemInfo[]>;
}

interface ItemThunk {
  fetchItem: Thunk<ItemModel, ItemType, never, StoreModel, Promise<void>>;
  updateItemInfo: Thunk<ItemModel, ItemInfo, never, StoreModel, Promise<void>>;
  addItemInfo: Thunk<ItemModel, ItemInfo, never, StoreModel, Promise<void>>;
  deleteItemInfo: Thunk<ItemModel, ItemInfo, never, StoreModel, Promise<void>>;
  fetchItemById: Thunk<
    ItemModel,
    number,
    never,
    StoreModel,
    Promise<ItemInfo | null>
  >;
}

export interface ItemModel extends ItemState, ItemAction, ItemThunk {}

export const itemModel: ItemModel = {
  // *State
  bookList: [],
  cdList: [],
  magazineList: [],
  // *Action
  setBookList: action((state, itemList) => {
    state.bookList = itemList;
  }),
  setCdList: action((state, cdList) => {
    state.cdList = cdList;
  }),
  setMagazineList: action((state, magazineList) => {
    state.magazineList = magazineList;
  }),

  // *Thunk
  fetchItem: thunk(async (actions, itemType, store) => {
    try {
      const result = await fetchItem(
        store.getStoreState().authModel.userToken,
        itemType,
      );
      if (!result) {
        console.log("empty");
        return;
      }
      if (result.length !==0) {
        if (result[0].type === "book") actions.setBookList(result);
        else if (result[0].type === "cd") actions.setCdList(result);
        else if (result[0].type === "magazine") actions.setMagazineList(result);
      }
    } catch (error) {
      // todo: Handle error
      console.log(error);
    }
  }),
  updateItemInfo: thunk(async (actions, payload, store) => {
    try {
      console.log(payload);
      console.log(store.getStoreState().authModel.userToken);
      const result = await updateItemInfo(
        store.getStoreState().authModel.userToken,
        payload,
      );
      if (result !== -1) {
        actions.fetchItem(payload.type);
      } else {
        console.log("Error updating");
      }
    } catch (error) {}
  }),
  fetchItemById: thunk(async (_, payload, store) => {
    try {
      const result = await getItemById(
        store.getStoreState().authModel.userToken,
        payload,
      );
      return result;
    } catch (error) {
      console.log("Error get item by id");
      return null;
    }
  }),
  addItemInfo: thunk(async (actions, payload, store) => {
    try {
      const result = await addItemInfo(
        store.getStoreState().authModel.userToken,
        payload,
      );
      if (result !== -1) {
        actions.fetchItem(payload.type);
      } else {
        console.log("Error adding item");
      }
    } catch (error) {
      console.log("Error adding item");
    }
  }),
  deleteItemInfo: thunk(async (actions, payload, store) => {
    try {
      const result = await deleteItemInfo(
        store.getStoreState().authModel.userToken,
        payload,
      );
      if (result !== -1) {
        actions.fetchItem(payload.type);
      } else {
        console.log("Error deleting item");
      }
    } catch (error) {
      console.log("Error deleting item");
    }
  }),
};
