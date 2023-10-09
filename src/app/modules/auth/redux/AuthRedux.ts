import { Action } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { UserModel } from "../models/UserModel";
import { getUserByToken } from "./AuthCRUD";

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",
};

const initialAuthState: IAuthState = {
  user: undefined,
  accessToken: undefined,
};

export interface IAuthState {
  user?: UserModel;
  accessToken?: string;
}

export const reducer = persistReducer(
  { storage, key: "v100-demo1-auth", whitelist: ["user", "accessToken"] },
  (
    state: IAuthState = initialAuthState,
    action: ActionWithPayload<IAuthState>
  ) => {
    switch (action.type) {
      case actionTypes.Login: {
        const accessToken = action.payload?.accessToken;
        return { accessToken, user: undefined };
      }

      case actionTypes.Register: {
        const accessToken = action.payload?.accessToken;
        return { accessToken, user: undefined };
      }

      case actionTypes.Logout: {
        return { accessToken: undefined, user: undefined };
      }

      case actionTypes.UserRequested: {
        return { ...state, user: undefined };
      }

      case actionTypes.UserLoaded: {
        const user = action.payload?.user;
        return { ...state, user, accessToken: user?.auth?.accessToken };
      }

      case actionTypes.SetUser: {
        const user = action.payload?.user;
        return { ...state, user, accessToken: user?.auth?.accessToken };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (accessToken: string) => ({
    type: actionTypes.Login,
    payload: { accessToken },
  }),
  register: (accessToken: string) => ({
    type: actionTypes.Register,
    payload: { accessToken },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: () => ({
    type: actionTypes.UserRequested,
  }),
  fulfillUser: (user: UserModel) => ({
    type: actionTypes.UserLoaded,
    payload: { user },
  }),
  setUser: (user: UserModel) => ({
    type: actionTypes.SetUser,
    payload: { user },
  }),
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data: user } = yield getUserByToken();
    yield put(actions.fulfillUser(user));
  });
}
