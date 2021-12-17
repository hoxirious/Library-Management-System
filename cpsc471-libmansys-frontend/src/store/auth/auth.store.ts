import { fetchStudentInfo, login } from "apis/services/users.service";
import {
  action,
  Action,
  computed,
  Computed,
  persist,
  thunk,
  Thunk,
} from "easy-peasy";
import { LoginInfo, StudentInfo, UserTypeValue } from "models";
import { StoreModel } from "store/StoreFront";

interface AuthState {
  isLogin: Computed<AuthModel, boolean>;
  userToken: string | null;
  userType: UserTypeValue | null;
  user_id: number | null;
  studentInfo: StudentInfo | null;
}

interface AuthAction {
  setIsLogin: Action<AuthModel, boolean>;
  setUserToken: Action<AuthModel, string | null>;
  setUserType: Action<AuthModel, UserTypeValue | null>;
  setUser_id: Action<AuthModel, number | null>;
  setStudentInfo: Action<AuthModel, StudentInfo | null>;
}

interface AuthThunk {
  login: Thunk<AuthModel, LoginInfo, never, StoreModel, Promise<void>>;
  logout: Thunk<AuthModel, never, never, StoreModel, void>;
  fetchStudentInfo: Thunk<AuthModel, never, never, StoreModel, Promise<void>>;
}

export interface AuthModel extends AuthState, AuthAction, AuthThunk {}

export const authModel: AuthModel = persist({
  // *State
  userToken: null,
  userType: null,
  user_id: null,
  studentInfo: null,
  isLogin: computed((state) => state.userToken !== null),

  // *Action
  setIsLogin: action((state, payload) => {
    state.isLogin = payload;
  }),
  setUserToken: action((state, payload) => {
    state.userToken = payload;
  }),
  setUserType: action((state, payload) => {
    state.userType = payload;
  }),
  setUser_id: action((state, payload) => {
    state.user_id = payload;
  }),
  setStudentInfo: action((state, payload) => {
    state.studentInfo = payload;
  }),

  // *Thunk
  login: thunk(async (actions, payload) => {
    try {
      const res = await login(payload);
      actions.setUserToken(res.accessToken);
      actions.setUserType(res.userType);
      actions.setUser_id(res.user_id);
    } catch (error) {
      // todo: Handle error
      console.log(error);
    }
  }),

  logout: thunk((actions, _) => {
    actions.setUserToken(null);
    actions.setIsLogin(false);
    actions.setUser_id(null);
  }),

  fetchStudentInfo: thunk(async (actions, _, store) => {
    try {
      const result = await fetchStudentInfo(
        store.getState().userToken,
        store.getState().user_id,
      );
      if(result){
        actions.setStudentInfo(result);
      }
    } catch (error) {}
  }),
  allow: ["userToken"],
});
