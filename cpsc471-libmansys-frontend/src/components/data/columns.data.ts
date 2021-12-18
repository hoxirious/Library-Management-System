import { ColumnDefinitionType } from "components/common/Table";
import { BookInfo, BorrowedItemInfo, CdInfo, MagazineInfo, ReturnedItemInfo } from "models";

export const bookColumns: ColumnDefinitionType<BookInfo, keyof BookInfo>[] = [
  {
    key: "item_id",
    header: "Item Id",
  },
  {
    key: "name",
    header: "Item Name",
    width: 150,
  },
  {
    key: "amount",
    header: "Number Available",
  },
  {
    key: "location",
    header: "Location",
  },
  {
    key: "library",
    header: "Library",
  },
  {
    key: "pub_id",
    header: "Published Id",
  },
  {
    key: "type",
    header: "Item Type",
  },
  {
    key: "genre",
    header: "Genre",
  },
  {
    key: "author_id",
    header: "Author Id",
  },
  {
    key: "pages",
    header: "Number of pages",
  },
];
export const magazineColumns: ColumnDefinitionType<
  MagazineInfo,
  keyof MagazineInfo
>[] = [
  {
    key: "item_id",
    header: "Item Id",
  },
  {
    key: "name",
    header: "Item Name",
    width: 150,
  },
  {
    key: "amount",
    header: "Number Available",
  },
  {
    key: "location",
    header: "Location",
  },
  {
    key: "library",
    header: "Library",
  },
  {
    key: "pub_id",
    header: "Published Id",
  },
  {
    key: "type",
    header: "Item Type",
  },
  {
    key: "genre",
    header: "Genre",
  },
  {
    key: "pages",
    header: "Number of pages",
  },
];

export const cdColumns: ColumnDefinitionType<CdInfo, keyof CdInfo>[] = [
  {
    key: "item_id",
    header: "Item Id",
  },
  {
    key: "name",
    header: "Item Name",
    width: 150,
  },
  {
    key: "amount",
    header: "Number Available",
  },
  {
    key: "location",
    header: "Location",
  },
  {
    key: "library",
    header: "Library",
  },
  {
    key: "pub_id",
    header: "Published Id",
  },
  {
    key: "type",
    header: "Item Type",
  },
  {
    key: "genre",
    header: "Genre",
  },
  {
    key: "length",
    header: "Length",
  },
];
export const borrowedColumns: ColumnDefinitionType<BorrowedItemInfo, keyof BorrowedItemInfo>[] = [
  {
    key: "student_id",
    header: "Student Id",
  },
  {
    key: "item_id",
    header: "Item Id",
  },
  {
    key: "date",
    header: "Borrowed Date",
  },
  {
    key: "overdue",
    header: "Overdue",
  },
];
export const returnedColumns: ColumnDefinitionType<ReturnedItemInfo, keyof ReturnedItemInfo>[] = [
  {
    key: "student_id",
    header: "Student Id",
  },
  {
    key: "item_id",
    header: "Item Id",
  },
  {
    key: "borrow_date",
    header: "Borrowed Date",
  },
  {
    key: "return_date",
    header: "Returned Date",
  },
];
