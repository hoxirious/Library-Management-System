
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

export interface StudentRegisterInfo {
  name: string;
  faculty: string;
  phone: string;
  username: string;
  password: string;
  library: string;
}

export interface AuthInput {
  title: string,
  input: { type: string; placeholder: string; className: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type UserTypeKey = keyof typeof UserType;
export type UserTypeValue = typeof UserType[keyof typeof UserType];

export interface LoginReturnInfo {
  accessToken: string;
  userType: UserTypeValue | null;
  user_id: number | null;
}

export interface StudentInfo {
  student_id: number;
  name: string;
  faculty: string;
  phone: string;
  username: string;
}
export interface StudentPatchInfo {
  name: string;
  faculty: string;
  phone: string;
}

export interface LibrarianInfo {
  librarian_id: number;
  library: string;
  name: string;
  username: string;
}
export interface LibrarianPatchInfo {
  name: string;
}
