import DeleteModal from "@/components/commons/DeleteModal";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import useDeleteTicketModal from "./useDeleteTicketModal";

interface DeleteTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteTicketModal: FC<DeleteTicketModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchTicket,
  selectedId,
  setSelectedId,
}) => {
  const { mutateDeleteTicket, isPendingDeleteTicket, isSuccessDeleteTicket } =
    useDeleteTicketModal();

  useEffect(() => {
    if (isSuccessDeleteTicket) {
      onClose();
      refetchTicket();
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
        setSelectedId("");
      }}
      onPressDelete={() => mutateDeleteTicket(selectedId)}
      disabled={isPendingDeleteTicket}
    />
  );
};

export default DeleteTicketModal;
