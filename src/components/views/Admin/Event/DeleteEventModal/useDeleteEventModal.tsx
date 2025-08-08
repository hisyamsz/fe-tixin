import { ToasterContext } from "@/contexts/ToasterContext";
import eventServices from "@/services/event.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteEventModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteEvent = async (id: string) => {
    const result = await eventServices.deleteEvent(id);
    return result;
  };

  const {
    mutate: mutateDeleteEvent,
    isPending: isPendingDeleteEvent,
    isSuccess: isSuccessDeleteEvent,
  } = useMutation({
    mutationFn: deleteEvent,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success delete event",
      });
    },
  });

  return {
    mutateDeleteEvent,
    isPendingDeleteEvent,
    isSuccessDeleteEvent,
  };
};

export default useDeleteEventModal;
