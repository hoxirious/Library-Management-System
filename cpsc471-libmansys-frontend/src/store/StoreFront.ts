import { createStore, createTypedHooks } from "easy-peasy";
import { authModel, AuthModel } from "./auth/auth.store";
import { TableModel, tableModel, itemModel, ItemModel, cartModel, CartModel } from "./misc";

export interface StoreModel {
  tableModel: TableModel;
  authModel: AuthModel;
  itemModel: ItemModel;
  cartModel: CartModel;
}

export const model: StoreModel = {
  tableModel,
  authModel,
  itemModel,
  cartModel,
};

export const store = createStore(model);

const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>();

export { useStoreActions, useStoreState };
