import { fetchBookList, fetchCdList, fetchMagazineList } from "apis/services";
import { action, Action, thunk, Thunk } from "easy-peasy";
import { BookInfo, CdInfo, MagazineInfo } from "models";
import { StoreModel } from "store/StoreFront";

interface ItemState {
  bookList: BookInfo[];
  cdList: CdInfo[];
  magazineList: MagazineInfo[];
}

interface ItemAction {
  setBookList: Action<ItemModel, BookInfo[]>;
  setCdList: Action<ItemModel, CdInfo[]>;
  setMagazineList: Action<ItemModel, MagazineInfo[]>;
}

interface ItemThunk {
  fetchBookList: Thunk<
    ItemModel,
    string | null,
    never,
    StoreModel,
    Promise<void>
  >;
  fetchCdList: Thunk<
    ItemModel,
    string | null,
    never,
    StoreModel,
    Promise<void>
  >;
  fetchMagazineList: Thunk<
    ItemModel,
    string | null,
    never,
    StoreModel,
    Promise<void>
  >;
}

export interface ItemModel extends ItemState, ItemAction, ItemThunk {}

export const itemModel: ItemModel = {
  // *State
  bookList: [],
  cdList: [],
  magazineList: [],
  // *Action
  setBookList: action((state, bookList) => {
    state.bookList = bookList;
  }),
  setCdList: action((state, cdList) => {
    state.cdList = cdList;
  }),
  setMagazineList: action((state, magazineList) => {
    state.magazineList = magazineList;
  }),

  // *Thunk
  fetchBookList: thunk(async (actions, payload) => {
    try {
      const result = await fetchBookList(payload);
      actions.setBookList(result);
    } catch (error) {
      // todo: Handle error
      console.log(error);
    }
  }),
  fetchCdList: thunk(async (actions, payload) => {
    try {
      const result = await fetchCdList(payload);
      actions.setCdList(result);
    } catch (error) {
      // todo: Handle error
      console.log(error);
    }
  }),
  fetchMagazineList: thunk(async (actions, payload) => {
    try {
      const result = await fetchMagazineList(payload);
      actions.setMagazineList(result);
    } catch (error) {
      // todo: Handle error
      console.log(error);
    }
  }),
};
