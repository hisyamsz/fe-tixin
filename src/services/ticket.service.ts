import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ITicket } from "@/types/Ticket";

const ticketServices = {
  getTicketByEventId: (eventId: string) =>
    instance.get(`${endpoint.TICKET}/${eventId}/events`),
  addTicket: (payload: ITicket) => instance.post(endpoint.TICKET, payload),
  deleteTicket: (id: string) => instance.delete(`${endpoint.TICKET}/${id}`),
  updateTicket: (id: string, payload: ITicket) =>
    instance.put(`${endpoint.TICKET}/${id}`, payload),
};

export default ticketServices;
