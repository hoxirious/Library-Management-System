import dotenv from "dotenv";
dotenv.config();

const baseResourceLocator = process.env.REACT_APP_BE_ENDPOINT as string;
export const baseToken = process.env.REACT_APP_JWT_SECRET as string;

export const baseEndPointMap = {
  api: baseResourceLocator + `/api/`,
} as const;

export const itemEndpointMap = {
  getAllItemInfo: {
    endpoint: baseEndPointMap.api + `items`,
    method: "get",
  },
  getAllItemInfoByType: {
    endpoint : baseEndPointMap.api + `items?type=`,
    method: "get",
  }
} as const;

export const loginEndpointMap = {
  postLogin: {
    endpoint: baseEndPointMap.api + `login`,
    method: "post",
  },
} as const;
