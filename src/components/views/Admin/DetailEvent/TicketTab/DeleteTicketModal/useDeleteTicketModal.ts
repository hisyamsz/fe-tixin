import { ToasterContext } from "@/contexts/ToasterContext";
import ticketServices from "@/services/ticket.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteTicketModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteTicket = async (id: string) => {
    const result = await ticketServices.deleteTicket(id);
    return result;
  };

  const {
    mutate: mutateDeleteTicket,
    isPending: isPendingDeleteTicket,
    isSuccess: isSuccessDeleteTicket,
  } = useMutation({
    mutationFn: deleteTicket,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success delete ticket",
      });
    },
  });

  return {
    mutateDeleteTicket,
    isPendingDeleteTicket,
    isSuccessDeleteTicket,
  };
};

export default useDeleteTicketModal;
