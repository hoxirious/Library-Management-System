export const DEBOUNCE_TIME = 1000;

export const SELECTION = {
  edit: "Edit Item",
  add: "Add Item",
  remove: "Remove Item",
} as const;

export type SelectionKey = keyof typeof SELECTION;
export type SelectionValue = typeof SELECTION[SelectionKey];