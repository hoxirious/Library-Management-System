import { loginEndpointMap } from "apis/data";
import { sendRequest } from "apis/utils";
import {
  LibrarianInfo,
  LibrarianPatchInfo,
  LoginInfo,
  LoginReturnInfo,
  StudentInfo,
  StudentPatchInfo,
  StudentRegisterInfo,
} from "models";

export const login = async (loginInfo: LoginInfo): Promise<LoginReturnInfo> => {
  const result = await sendRequest<LoginInfo, LoginReturnInfo>({
    endpointInfo: loginEndpointMap.postLogin,
    data: loginInfo,
    useTokenInHeaders: false,
  });
  return (
    result.result ?? {
      accessToken: "",
      userType: null,
      user_id: null,
    }
  );
};
export const register = async (
  newStudent: StudentRegisterInfo,
): Promise<number> => {
  const result = await sendRequest<StudentRegisterInfo, Promise<number>>({
    endpointInfo: loginEndpointMap.registerStudent,
    data: newStudent,
    useTokenInHeaders: false,
  });
  return result.result ?? -1;
};

export async function fetchStudentInfo(
  token: string | null,
  student_id: number | null,
): Promise<StudentInfo | null> {
  if (token && student_id) {
    const result = await sendRequest<never, StudentInfo>({
      endpointInfo: {
        endpoint: loginEndpointMap.getStudentInfoById.endpoint + student_id,
        method: loginEndpointMap.getStudentInfoById.method,
      },
      useTokenInHeaders: true,
      token: token,
    });

    return result.result ?? null;
  }
  return null;
}
export async function patchStudentInfo(
  token: string | null,
  student_id: number | null,
  data: StudentPatchInfo,
): Promise<void> {
  if (token && student_id) {
    await sendRequest<StudentPatchInfo, Promise<void>>({
      endpointInfo: {
        endpoint: loginEndpointMap.patchStudentInfo.endpoint + student_id,
        method: loginEndpointMap.patchStudentInfo.method,
      },
      data,
      useTokenInHeaders: true,
      token: token,
    });
  }
}
export async function patchLibrarianInfo(
  token: string | null,
  librarian_id: number | null,
  data: LibrarianPatchInfo,
): Promise<void> {
  if (token && librarian_id) {
    await sendRequest<LibrarianPatchInfo, Promise<void>>({
      endpointInfo: {
        endpoint: loginEndpointMap.patchLibrarianInfo.endpoint + librarian_id,
        method: loginEndpointMap.patchLibrarianInfo.method,
      },
      data,
      useTokenInHeaders: true,
      token: token,
    });
  }
}
export async function fetchLibrarianInfo(
  token: string | null,
  librarian_id: number | null,
): Promise<LibrarianInfo | null> {
  if (token && librarian_id) {
    const result = await sendRequest<never, LibrarianInfo>({
      endpointInfo: {
        endpoint: loginEndpointMap.getLibrarianInfoById.endpoint + librarian_id,
        method: loginEndpointMap.getLibrarianInfoById.method,
      },
      useTokenInHeaders: true,
      token: token,
    });

    return result.result ?? null;
  }
  return null;
}
