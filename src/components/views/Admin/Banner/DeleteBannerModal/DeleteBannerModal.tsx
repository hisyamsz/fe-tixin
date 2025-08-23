import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import useDeleteBannerModal from "./useDeleteBannerModal";
import DeleteModal from "@/components/commons/DeleteModal";

interface DeleteBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBanner: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteBannerModal: FC<DeleteBannerModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchBanner,
  selectedId,
  setSelectedId,
}) => {
  const { mutateDeleteBanner, isPendingDeleteBanner, isSuccessDeleteBanner } =
    useDeleteBannerModal();

  useEffect(() => {
    if (isSuccessDeleteBanner) {
      onClose();
      refetchBanner();
      setSelectedId("");
    }
  }, [isSuccessDeleteBanner]);

  return (
    <DeleteModal
      title="Delete Banner"
      description="Are you sure want to delete this banner?"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onPressCancel={() => {
        onClose();
        setSelectedId("");
      }}
      onPressDelete={() => mutateDeleteBanner(selectedId)}
      disabled={isPendingDeleteBanner}
    />
  );
};

export default DeleteBannerModal;
