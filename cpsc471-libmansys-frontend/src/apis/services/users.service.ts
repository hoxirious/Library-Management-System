import { loginEndpointMap } from "apis/data";
import { sendRequest } from "apis/utils";
import { LoginInfo, LoginReturnInfo, StudentInfo } from "models";

export const login = async (loginInfo: LoginInfo): Promise<LoginReturnInfo> => {
  const result = await sendRequest<LoginInfo, LoginReturnInfo>({
    endpointInfo: loginEndpointMap.postLogin,
    data: loginInfo,
    useTokenInHeaders: false,
  });
  console.log(result.result);
  return (
    result.result ?? {
      accessToken: "",
      userType: null,
      user_id: null,
    }
  );
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
