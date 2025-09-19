import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICart } from "@/types/Ticket";

const orderServices = {
  addOrder: (payload: ICart) => instance.post(endpoint.ORDER, payload),
  updateOrderStatus: (order_id: string, status: string) =>
    instance.put(`${endpoint.ORDER}/${order_id}/${status}`),
  getMemberOrder: (params: string) =>
    instance.get(`${endpoint.ORDER}-history?${params}`),
  getOrderById: (orderId: string) =>
    instance.get(`${endpoint.ORDER}/${orderId}`),
};

export default orderServices;
