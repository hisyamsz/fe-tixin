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

export type { IRegister, IActivationCode };
