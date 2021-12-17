export interface CartElementInfo {
  item_id: number;
}
export interface CartElementPayload extends CartElementInfo {
  student_id: number;
  date: string;
}
export interface FineInfo {
  fine_id: number;
  student_id: number;
  item_id: number;
  amount: number;
  charge_date: string;
  pay_date: string;
}

export interface BorrowedItemInfo {
  student_id: number;
  item_id: number;
  date: string;
  overdue: boolean;
}
