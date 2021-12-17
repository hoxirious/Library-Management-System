import { loginEndpointMap } from "apis/data";
import { sendRequest } from "apis/utils";
import { LoginInfo, LoginReturnInfo } from "models";

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
    }
  );
};
