import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useTicketTab = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const { query, isReady } = useRouter();

  const getTicketByEventId = async (id: string) => {
    const { data } = await ticketServices.getTicketByEventId(id);
    return data.data;
  };

  const {
    data: dataTicket,
    isLoading: isLoadingDataTicket,
    isPending: isPendingDataTicket,
    isRefetching: isRefetchingDataTicket,
    refetch: refetchTicket,
  } = useQuery({
    queryKey: ["Ticket"],
    queryFn: () => getTicketByEventId(`${query.id}`),
    enabled: isReady,
  });

  return {
    dataTicket,
    isLoadingDataTicket,
    isPendingDataTicket,
    isRefetchingDataTicket,
    refetchTicket,
    selectedId,
    setSelectedId,
  };
};

export default useTicketTab;
