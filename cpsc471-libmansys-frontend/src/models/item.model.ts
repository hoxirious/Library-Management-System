export interface BookInfo {
  item_id: number;
  name: string;
  amount: number;
  location: number;
  library: string;
  pub_id: number;
  type: ItemType;
  genre: string;
  author_id: number;
  pages: number;
}

export interface CdInfo {
  item_id: number;
  name: string;
  amount: number;
  location: number;
  library: string;
  pub_id: number;
  type: ItemType;
  genre: string;
  length: number;
}

export interface MagazineInfo {
  item_id: number;
  name: string;
  amount: number;
  location: number;
  library: string;
  pub_id: number;
  type: ItemType;
  genre: string;
  pages: number;
}

export const TitleMap = {
  item_id: "Item Id",
  name: "Item Name",
  amount: "Number Available",
  location: "Location",
  library: "Library",
  pub_id: "Published Id",
  type: "Item Type",
  genre: "Genre",
  length: "Length",
  author_id: "Author Id",
  pages: "Number of pages",
  student_id: "Student Id",
  borrowed_date: "Borrowed Date",
  returned_date: "Returned Date",
  overdue: "Overdue"
} as const;

export type TitleKey = keyof typeof TitleMap;
export type ItemType = "book" | "cd" | "magazine";
export type TitleValue = typeof TitleMap[TitleKey];
export interface ItemInfo extends BookInfo, CdInfo, MagazineInfo {}
