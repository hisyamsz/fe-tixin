import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import useDeleteCategoryModal from "./useDeleteCategoryModal";

interface DeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteCategoryModal: FC<DeleteCategoryModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchCategory,
  selectedId,
  setSelectedId,
}) => {
  const {
    mutateDeleteCategory,
    isPendingDeleteCategory,
    isSuccessDeleteCategory,
  } = useDeleteCategoryModal();

  useEffect(() => {
    if (isSuccessDeleteCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessDeleteCategory]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Category</ModalHeader>
        <ModalBody>
          <p className="text-medium font-semibold">
            Are you sure want to delete this category?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            color="primary"
            variant="bordered"
            disabled={isPendingDeleteCategory}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            onPress={() => mutateDeleteCategory(selectedId)}
            disabled={isPendingDeleteCategory}
          >
            {isPendingDeleteCategory ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Category"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCategoryModal;
