import { FC, useEffect } from "react";
import useAddTicketModal from "./useAddTicketModal";
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

interface AddTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
}

const AddTicketModal: FC<AddTicketModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchTicket,
}) => {
  const {
    control,
    errors,
    reset,
    handleAddTicket,
    handleSubmitFormAddTicket,
    isPendingAddTicket,
    isSuccessAddTicket,
  } = useAddTicketModal();

  useEffect(() => {
    if (isSuccessAddTicket) {
      onClose();
      refetchTicket();
    }
  }, [isSuccessAddTicket]);

  const handleOnClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      onClose={handleOnClose}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitFormAddTicket(handleAddTicket)}>
        <ModalContent className="m-4 p-2">
          <ModalHeader>Create Ticket</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
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
              disabled={isPendingAddTicket}
            >
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={isPendingAddTicket}>
              {isPendingAddTicket ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Add Ticket"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddTicketModal;
