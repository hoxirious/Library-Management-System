import { createStore, createTypedHooks } from "easy-peasy";
import { authModel, AuthModel } from "./auth/auth.store";
import { TableModel, tableModel, itemModel, ItemModel } from "./misc";

export interface StoreModel {
  tableModel: TableModel;
  authModel: AuthModel;
  itemModel: ItemModel;
}

export const model: StoreModel = {
  tableModel,
  authModel,
  itemModel,
};

export const store = createStore(model);

const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>();

export { useStoreActions, useStoreState };
