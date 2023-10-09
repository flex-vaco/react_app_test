import { AuthModel } from "./AuthModel";
import { UserAddressModel } from "./UserAddressModel";
import { UserCommunicationModel } from "./UserCommunicationModel";
import { UserEmailSettingsModel } from "./UserEmailSettingsModel";
import { UserSocialNetworksModel } from "./UserSocialNetworksModel";

export interface UserModel {
  id: number;
  username: string;
  password: string | undefined;
  email: string;
  firstname: string;
  lastname: string;
  fullname?: string;
  occupation?: string;
  companyName?: string;
  phone?: string;
  roles?: Array<number>;
  pic?: string;
  language?: "en" | "de" | "es" | "fr" | "ja" | "zh" | "ru";
  timeZone?: string;
  website?: "https://keenthemes.com";
  emailSettings?: UserEmailSettingsModel;
  auth?: AuthModel;
  communication?: UserCommunicationModel;
  address?: UserAddressModel;
  socialNetworks?: UserSocialNetworksModel;
  typeid?: number;
}

// export interface UserModel {
//   id: number;
//   username: string | undefined;
//   password: string | undefined;
//   email: string | undefined;
//   firstname: string | undefined;
//   lastname: string | undefined;
//   fullname?: string;
//   occupation?: string;
//   companyName?: string;
//   phone?: string;
//   roles?: Array<number>;
//   pic?: string;
//   language?: "en" | "de" | "es" | "fr" | "ja" | "zh" | "ru";
//   timeZone?: string;
//   website?: "https://keenthemes.com";
//   emailSettings?: UserEmailSettingsModel;
//   auth?: AuthModel;
//   communication?: UserCommunicationModel;
//   address?: UserAddressModel;
//   socialNetworks?: UserSocialNetworksModel;
//   date_added?: string;
//   date_last_login?: string;
//   pub_id?: string;
//   statusid?: string;
//   typeid?: string;
// }