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

export const InputRegisterMap = {
  name: "text",
  faculty: "text",
  phone: "text",
  username: "text",
  password: "password",
  library: "text",
} as const;

export const LabelRegisterMap = {
  name: "Input your name",
  faculty: "Input your faculty",
  phone: "Input your phone",
  username: "Input your username",
  password: "Input your password",
  library: "Input your library",
} as const;

export type RegistrationTypeKey = keyof typeof LabelRegisterMap;
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
