import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IActivationCode, IRegister } from "@/types/Auth";

const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  activation: (payload: IActivationCode) =>
    instance.post(`${endpoint.AUTH}/activation`, payload),
};

export default authServices;
