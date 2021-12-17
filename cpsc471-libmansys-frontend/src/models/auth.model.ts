export interface LoginInfo {
  library: string;
  username: string;
  password: string;
}

export const UserType = {
  admin: "SYSADMIN",
  librarian: "LIBRARIAN",
  student: "STUDENT",
} as const;

export type UserTypeKey = keyof typeof UserType;
export type UserTypeValue = typeof UserType[keyof typeof UserType];

export interface LoginReturnInfo {
  accessToken: string;
  userType: UserTypeValue | null;
}
