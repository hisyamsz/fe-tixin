import { Dispatch, FC, SetStateAction, useEffect } from "react";
import useUpdateTicketModal from "./useUpdateTicketModal";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { ITicket } from "@/types/Ticket";

interface UpdateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
  selectedDataTicket: ITicket | null;
  setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>;
}

const UpdateTicketModal: FC<UpdateTicketModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchTicket,
  selectedDataTicket,
  setSelectedDataTicket,
}) => {
  const {
    control,
    errors,
    reset,
    setValueUpdateTicket,
    handleSubmitFormUpdateTicket,
    handleUpdateTicket,
    isPendingUpdateTicket,
    isSuccessUpdateTicket,
  } = useUpdateTicketModal(`${selectedDataTicket?._id}`);

  useEffect(() => {
    if (selectedDataTicket) {
      setValueUpdateTicket("name", `${selectedDataTicket.name}`);
      setValueUpdateTicket("price", `${selectedDataTicket.price}`);
      setValueUpdateTicket("quantity", `${selectedDataTicket.quantity}`);
      setValueUpdateTicket("description", `${selectedDataTicket.description}`);
    }
  }, [selectedDataTicket]);

  useEffect(() => {
    if (isSuccessUpdateTicket) {
      onClose();
      refetchTicket();
      setSelectedDataTicket(null);
    }
  }, [isSuccessUpdateTicket]);

  const handleOnClose = () => {
    reset();
    onClose();
    setSelectedDataTicket(null);
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      onClose={handleOnClose}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitFormUpdateTicket(handleUpdateTicket)}>
        <ModalContent className="m-4 p-2">
          <ModalHeader>Update Ticket</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Name"
                    variant="bordered"
                    type="text"
                    autoComplete="off"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Price"
                    variant="bordered"
                    type="text"
                    autoComplete="off"
                    isInvalid={errors.price !== undefined}
                    errorMessage={errors.price?.message}
                  />
                )}
              />
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Quantity"
                    variant="bordered"
                    type="text"
                    autoComplete="off"
                    isInvalid={errors.quantity !== undefined}
                    errorMessage={errors.quantity?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={handleOnClose}
              color="primary"
              variant="bordered"
              disabled={isPendingUpdateTicket}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={isPendingUpdateTicket}
            >
              {isPendingUpdateTicket ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update Ticket"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateTicketModal;
