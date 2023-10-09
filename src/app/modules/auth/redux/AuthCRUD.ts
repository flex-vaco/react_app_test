import axios from "axios";
import { AuthModel } from "../models/AuthModel";
import { UserModel } from "../models/UserModel";

const AUTH_URL = process.env.REACT_APP_AUTH_URL || "api";

export const GET_USER_BY_ACCESSTOKEN_URL = `${AUTH_URL}/get-user`;
export const LOGIN_URL = `${AUTH_URL}login`;
export const REGISTER_URL = `${AUTH_URL}register`;
export const REQUEST_PASSWORD_URL = `${AUTH_URL}forgot-password`;

let user:UserModel
// Server should return AuthModel { email:"rvanamala_test@vaco.com", password:"vb2023" })
export async function login(email: string, password: string) {
  // console.log("PROCESS ENV VARS", process.env)
  // console.log("AUTH URL", AUTH_URL)
  // console.log("LOGIN URL", LOGIN_URL)
  const auth_resp = await axios.post(LOGIN_URL, {email, password}) ;
  // console.log("RTETRTER", auth_resp.data.user)
  user = auth_resp.data.user;
  return auth_resp //axios.post(LOGIN_URL, { email, password });
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string
) {
  return axios.post<AuthModel>(REGISTER_URL, {
    email,
    firstname,
    lastname,
    password,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, { email });
}

export async function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  //return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL);
  // console.log("USER",user1)
  return user;
}
