import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IFileUrl } from "@/types/File";

const formDataCustom = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const uploadServices = {
  uploadFile: (payload: FormData) =>
    instance.post(`${endpoint.MEDIA}/single`, payload, formDataCustom),
  deleteFile: (payload: IFileUrl) =>
    instance.delete(`${endpoint.MEDIA}/remove`, { data: payload }),
};

export default uploadServices;
