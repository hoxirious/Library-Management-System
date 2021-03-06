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
    endpoint: baseEndPointMap.api + `items?type=`,
    method: "get",
  },
  getItemInfoById: {
    endpoint: baseEndPointMap.api + `items/`,
    method: "get",
  },
  putItemInfoById: {
    endpoint: baseEndPointMap.api + `items/`,
    method: "put",
  },
  postItem: {
    endpoint: baseEndPointMap.api + `items/`,
    method: "post"
  },
  deleteItem: {
    endpoint: baseEndPointMap.api + `items/`,
    method: "delete"
  }
} as const;

export const cartEndpointMap = {
  postBorrowedItemInfo: {
    endpoint: baseEndPointMap.api + `borrowed`,
    method: "post",
  },
  getBorrowedItemForUser: {
    endpoint: baseEndPointMap.api + `borrowed/`,
    method: "get",
  },
  getBorrowedItemForAll: {
    endpoint: baseEndPointMap.api + `borrowed/`,
    method: "get",
  },
  getReturnedItemForAll: {
    endpoint: baseEndPointMap.api + `returned/`,
    method: "get",
  },
  postReturned: {
    endpoint: baseEndPointMap.api + `returned`,
    method: "post",
  },
  getFinesByStudent: {
    endpoint: baseEndPointMap.api + `fines/`,
    method: "get",
  }
} as const;

export const loginEndpointMap = {
  postLogin: {
    endpoint: baseEndPointMap.api + `login`,
    method: "post",
  },
  getStudentInfoById: {
    endpoint: baseEndPointMap.api + `students/`,
    method: "get",
  },
  patchStudentInfo: {
    endpoint: baseEndPointMap.api + `students/`,
    method: "patch",
  },
  patchLibrarianInfo: {
    endpoint: baseEndPointMap.api + `librarians/`,
    method: "patch",
  },
  registerStudent: {
    endpoint: baseEndPointMap.api + `students`,
    method: "post",
  },
  getLibrarianInfoById: {
    endpoint: baseEndPointMap.api + `librarians/`,
    method: "get",
  }
} as const;
