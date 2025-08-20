import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import useDeleteEventModal from "./useDeleteEventModal";
import DeleteModal from "@/components/commons/DeleteModal";

interface DeleteEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchEvent: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteEventModal: FC<DeleteEventModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchEvent,
  selectedId,
  setSelectedId,
}) => {
  const { mutateDeleteEvent, isPendingDeleteEvent, isSuccessDeleteEvent } =
    useDeleteEventModal();

  useEffect(() => {
    if (isSuccessDeleteEvent) {
      onClose();
      refetchEvent();
      setSelectedId("");
    }
  }, [isSuccessDeleteEvent]);

  return (
    <DeleteModal
      title="Delete Event"
      description="Are you sure want to delete this event?"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onPressCancel={() => {
        onClose();
        setSelectedId("");
      }}
      onPressDelete={() => mutateDeleteEvent(selectedId)}
      disabled={isPendingDeleteEvent}
    />
  );
};

export default DeleteEventModal;
