import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { ICart, ITicket } from "@/types/Ticket";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { defaultCart } from "./DetailEvent.constants";

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

  const [cart, setCart] = useState<ICart>(defaultCart);

  const dataTicketInCart = useMemo(() => {
    if (dataTicket) {
      return dataTicket.find((ticket: ITicket) => ticket._id === cart.ticket);
    }

    return null;
  }, [dataTicket, cart]);

  const handleAddToCart = (ticket: string) => {
    setCart({
      events: dataDetailEvent._id as string,
      ticket,
      quantity: 1,
    });
  };

  const handleChangeQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      if (cart.quantity < dataTicketInCart?.quantity) {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity + 1,
        }));
      }
    } else {
      if (cart.quantity <= 1) {
        setCart(defaultCart);
      } else {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity - 1,
        }));
      }
    }
  };

  return {
    dataDetailEvent,
    isPendingDetailEvent,
    dataTicket,
    isPendingTicket,
    dataTicketInCart,
    cart,
    handleAddToCart,
    handleChangeQuantity,
  };
};

export default useDetailEvent;
