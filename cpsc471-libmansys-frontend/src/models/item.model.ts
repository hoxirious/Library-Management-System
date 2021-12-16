export interface BookInfo {
  item_id: number;
  name: string;
  amount: number;
  location: string;
  library: string;
  pub_id: number;
  type: string;
  genre: string;
  authorId: number;
  pages: number;
}

export interface CdInfo {
  item_id: number;
  name: string;
  amount: number;
  location: string;
  library: string;
  pub_id: number;
  type: string;
  genre: string;
  length: number;
}

export interface MagazineInfo {
  item_id: number;
  name: string;
  amount: number;
  location: string;
  library: string;
  pub_id: number;
  type: string;
  genre: string;
  pages: number;
}
