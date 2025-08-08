import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IEvent } from "@/types/Event";

const eventServices = {
  getEvents: (params: string) => instance.get(`${endpoint.EVENT}?${params}`),
  addEvent: (payload: IEvent) => instance.post(endpoint.EVENT, payload),
  deleteEvent: (id: string) => instance.delete(`${endpoint.EVENT}/${id}`),
  searchLocation: () => instance.get(endpoint.REGION),
  searchLocationByRegency: (name: string) =>
    instance.get(`${endpoint.REGION}-search?name=${name}`),
};

export default eventServices;
