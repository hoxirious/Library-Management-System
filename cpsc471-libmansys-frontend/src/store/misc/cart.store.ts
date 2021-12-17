import {
  fetchBorrowedForUser,
  getFinesByStudent,
  postCart,
} from "apis/services";
import { action, Action, thunk, Thunk } from "easy-peasy";
import { BorrowedItemInfo, CartElementInfo, FineInfo, ItemInfo } from "models";
import { StoreModel } from "store/StoreFront";

interface CartState {
  myCart: CartElementInfo[];
  myCartDetail: ItemInfo[];
  fineList: FineInfo[];
  borrowedList: BorrowedItemInfo[];
}

interface CartAction {
  addToCart: Action<CartModel, CartElementInfo>;
  setFineList: Action<CartModel, FineInfo[]>;
  setBorrowedList: Action<CartModel, BorrowedItemInfo[]>;
  setMyCartDetail: Action<CartModel, ItemInfo[]>;
}

interface CartThunk {
  postCart: Thunk<CartModel, never, never, StoreModel, Promise<void>>;
  fetchFine: Thunk<CartModel, never, never, StoreModel, Promise<void>>;
  fetchBorrowedForUser: Thunk<
    CartModel,
    never,
    never,
    StoreModel,
    Promise<void>
  >;
}

export interface CartModel extends CartState, CartAction, CartThunk {}

export const cartModel: CartModel = {
  // *State
  myCart: [],
  fineList: [],
  borrowedList: [],
  myCartDetail: [],
  // *Action
  addToCart: action((state, newItem) => {
    let isExisted = false;
    for (let i = 0; i < state.myCart.length; i++) {
      if (state.myCart[i].item_id === newItem.item_id) {
        isExisted = true;
        break;
      }
    }
    if (!isExisted) {
      state.myCart.push(newItem);
      console.log(state.myCart.length);
    }
  }),

  setFineList: action((state, fineList) => {
    state.fineList = fineList;
  }),
  setBorrowedList: action((state, borrowedList) => {
    state.borrowedList = borrowedList;
  }),
  setMyCartDetail: action((state, cartDetail) => {
    state.myCartDetail = cartDetail;
  }),

  // *Thunk
  postCart: thunk(async (_, __, store) => {
    try {
      await postCart(
        store.getStoreState().authModel.userToken,
        store.getStoreState().authModel.user_id,
        store.getState().myCart,
      );
    } catch (error) {
      console.log(error);
    }
  }),
  fetchFine: thunk(async (actions, _, store) => {
    try {
      const result = await getFinesByStudent(
        store.getStoreState().authModel.userToken,
        store.getStoreState().authModel.user_id,
      );
      if (result) {
        actions.setFineList(result);
      }
    } catch (error) {
      console.log(error);
    }
  }),
  fetchBorrowedForUser: thunk(async (actions, _, store) => {
    try {
      const result = await fetchBorrowedForUser(
        store.getStoreState().authModel.userToken,
        store.getStoreState().authModel.user_id,
      );
      if (result) {
        console.log(result);
        actions.setBorrowedList(result);
      }
    } catch (error) {
      console.log(error);
    }
  }),
};
