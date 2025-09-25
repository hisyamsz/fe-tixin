import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IActivationCode {
  code: string;
}

interface ILogin {
  identifier: string;
  password: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

interface IProfile {
  _id?: string;
  email?: string;
  fullName?: string;
  username?: string;
  isActive?: boolean;
  profilePicture?: string | FileList;
  role?: string;
}

interface IUpdatePassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export type {
  IRegister,
  IActivationCode,
  ILogin,
  UserExtended,
  SessionExtended,
  JWTExtended,
  IProfile,
  IUpdatePassword,
};
