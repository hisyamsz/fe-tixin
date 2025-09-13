import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailEvent = () => {
  const router = useRouter();

  const getEventBySlug = async (slug: string) => {
    const { data } = await eventServices.getEventBySlug(slug);
    return data.data;
  };

  const { data: dataDetailEvent, isPending: isPendingDetailEvent } = useQuery({
    queryKey: ["EventBySlug"],
    queryFn: () => getEventBySlug(`${router.query.slug}`),
    enabled: router.isReady,
  });

  const getTicketByEventId = async (eventId: string) => {
    const { data } = await ticketServices.getTicketByEventId(eventId);
    return data.data;
  };

  const { data: dataTicket, isPending: isPendingTicket } = useQuery({
    queryKey: ["Tickets", dataDetailEvent?._id],
    queryFn: () => getTicketByEventId(dataDetailEvent._id),
    enabled: !!dataDetailEvent?._id && router.isReady,
  });

  return {
    dataDetailEvent,
    isPendingDetailEvent,
    dataTicket,
    isPendingTicket,
  };
};

export default useDetailEvent;
