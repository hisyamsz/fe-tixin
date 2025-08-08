import { Dispatch, FC, SetStateAction, useEffect } from "react";
import useDeleteCategoryModal from "./useDeleteCategoryModal";
import DeleteModal from "@/components/commons/DeleteModal";

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
    <div>
      <DeleteModal
        title="Delete Category"
        description="Are you sure want to delete this category?"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onPressCancel={() => {
          onClose();
          setSelectedId("");
        }}
        onPressDelete={() => mutateDeleteCategory(selectedId)}
        disabled={isPendingDeleteCategory}
      />
    </div>
  );
};

export default DeleteCategoryModal;
