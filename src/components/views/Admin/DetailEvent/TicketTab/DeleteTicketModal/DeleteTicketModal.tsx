import DeleteModal from "@/components/commons/DeleteModal";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import useDeleteTicketModal from "./useDeleteTicketModal";
import { ITicket } from "@/types/Ticket";

interface DeleteTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
  selectedDataTicket: ITicket | null;
  setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>;
}

const DeleteTicketModal: FC<DeleteTicketModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchTicket,
  selectedDataTicket,
  setSelectedDataTicket,
}) => {
  const { mutateDeleteTicket, isPendingDeleteTicket, isSuccessDeleteTicket } =
    useDeleteTicketModal();

  useEffect(() => {
    if (isSuccessDeleteTicket) {
      onClose();
      refetchTicket();
      setSelectedDataTicket(null);
    }
  }, [isSuccessDeleteTicket]);

  return (
    <DeleteModal
      title="Delete Ticket"
      description="Are you sure want to delete this ticket?"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onPressCancel={() => {
        onClose();
        setSelectedDataTicket(null);
      }}
      onPressDelete={() => mutateDeleteTicket(`${selectedDataTicket?._id}`)}
      disabled={isPendingDeleteTicket}
    />
  );
};

export default DeleteTicketModal;
