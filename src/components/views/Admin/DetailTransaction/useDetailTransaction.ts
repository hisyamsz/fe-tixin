import eventServices from "@/services/event.service";
import orderServices from "@/services/order.service";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailTransaction = () => {
  const { query, isReady } = useRouter();

  const getOrderById = async () => {
    const { data } = await orderServices.getOrderById(`${query.orderId}`);

    return data.data;
  };

  const { data: dataTransaction } = useQuery({
    queryKey: ["TransactionDetail", query.orderId],
    queryFn: getOrderById,
    enabled: isReady,
  });

  const getEventById = async () => {
    const { data } = await eventServices.getEventById(
      `${dataTransaction?.events}`,
    );

    return data.data;
  };

  const { data: dataEvents, isPending: isPendingEvents } = useQuery({
    queryKey: ["EventById", query.orderId],
    queryFn: getEventById,
    enabled: !!dataTransaction?.events,
  });

  const getTicketById = async () => {
    const { data } = await ticketServices.getTicketById(
      `${dataTransaction?.ticket}`,
    );

    return data.data;
  };

  const { data: dataTickets } = useQuery({
    queryKey: ["TicketById", query.orderId],
    queryFn: getTicketById,
    enabled: !!dataTransaction?.ticket,
  });

  return {
    dataTransaction,
    dataEvents,
    isPendingEvents,
    dataTickets,
  };
};

export default useDetailTransaction;
