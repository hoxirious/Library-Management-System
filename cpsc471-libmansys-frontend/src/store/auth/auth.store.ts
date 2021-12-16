import { login } from "apis/services/users.service";
import {
  action,
  Action,
  computed,
  Computed,
  persist,
  thunk,
  Thunk,
} from "easy-peasy";
import { LoginInfo, UserTypeValue } from "models";
import { StoreModel } from "store/StoreFront";

interface AuthState {
  isLogin: Computed<AuthModel, boolean>;
  userToken: string | null;
  userType: UserTypeValue | null;
}

interface AuthAction {
  setIsLogin: Action<AuthModel, boolean>;
  setUserToken: Action<AuthModel, string | null>;
  setUserType: Action<AuthModel, UserTypeValue | null>;
}

interface AuthThunk {
  login: Thunk<AuthModel, LoginInfo, never, StoreModel, Promise<void>>;
  logout: Thunk<AuthModel, never, never, StoreModel, void>;
  // todo: logout
}

export interface AuthModel extends AuthState, AuthAction, AuthThunk {}

export const authModel: AuthModel = persist({
  // *State
  userToken: null,
  userType: null,
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

  // *Thunk
  login: thunk(async (actions, payload) => {
    try {
      const res = await login(payload);
      actions.setUserToken(res.accessToken);
      actions.setUserType(res.userType);
    } catch (error) {
      // todo: Handle error
      console.log(error);
    }
  }),

  logout: thunk((actions, _) => {
    actions.setUserToken(null);
    actions.setIsLogin(false);
  }),
  allow: ["userToken"],
});
