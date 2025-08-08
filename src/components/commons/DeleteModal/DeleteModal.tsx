import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { FC } from "react";

interface DeleteModalProps {
  title: string;
  description: string;
  disabled: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onPressDelete: () => void;
  onPressCancel: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  title,
  description,
  disabled,
  isOpen,
  onOpenChange,
  onPressDelete,
  onPressCancel,
}) => {
  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <p className="text-medium font-semibold">{description}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={onPressCancel}
            color="primary"
            variant="bordered"
            disabled={disabled}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            onPress={onPressDelete}
            disabled={disabled}
          >
            {disabled ? <Spinner size="sm" color="white" /> : `${title}`}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
