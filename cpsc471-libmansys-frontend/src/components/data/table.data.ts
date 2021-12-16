import { ColumnDefinitionType } from "components/common/Table";

interface Cat {
  name: string;
  UCID: string;
  Fine: number;
  ClearFine: string;
  activityLevel?: string; // optional, same as string | undefined
  favoriteFood?: string; // optional, same as string | undefined
}

export const data: Cat[] = [
  {
    name: "Luca Lacu",
    UCID: "300864624",
    Fine: 5.02,
    ClearFine: "Button to clear fine",
    activityLevel: "hight",
    favoriteFood: "milk",
  },
  {
    name: "Luca Lacu",
    UCID: "300864624",
    Fine: 5.02,
    ClearFine: "Button to clear fine",
    activityLevel: "hight",
    favoriteFood: "milk",
  },
  {
    name: "Luca Lacu",
    UCID: "300864624",
    Fine: 5.02,
    ClearFine: "Button to clear fine",
    activityLevel: "hight",
    favoriteFood: "milk",
  },
  {
    name: "Luca Lacu",
    UCID: "300864624",
    Fine: 5.02,
    ClearFine: "Button to clear fine",
    activityLevel: "hight",
    favoriteFood: "milk",
  },
  {
    name: "Luca Lacu",
    UCID: "300864624",
    Fine: 5.02,
    ClearFine: "Button to clear fine",
    activityLevel: "hight",
    favoriteFood: "milk",
  },
  {
    name: "Luca Lacu",
    UCID: "300864624",
    Fine: 5.02,
    ClearFine: "Button to clear fine",
    activityLevel: "hight",
    favoriteFood: "milk",
  },
  
];

export const columns: ColumnDefinitionType<Cat, keyof Cat>[] = [
  {
    key: "name",
    header: "Name",
    width: 150,
  },
  {
    key: "UCID",
    header: "UCID",
  },
  {
    key: "Fine",
    header: "Fine",
  },
  {
    key: "ClearFine",
    header: "Clear Fine",
  },
];
