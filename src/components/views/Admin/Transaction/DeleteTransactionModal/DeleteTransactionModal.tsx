import { Dispatch, FC, SetStateAction, useEffect } from "react";
import useDeleteTransactionModal from "./useDeleteTransactionModal";
import DeleteModal from "@/components/commons/DeleteModal";

interface DeleteTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTransactions: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteTransactionModal: FC<DeleteTransactionModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchTransactions,
  selectedId,
  setSelectedId,
}) => {
  const {
    mutateDeleteTransaction,
    isPendingDeleteTransaction,
    isSuccessDeleteTransaction,
  } = useDeleteTransactionModal();

  useEffect(() => {
    if (isSuccessDeleteTransaction) {
      onClose();
      refetchTransactions();
      setSelectedId("");
    }
  }, [isSuccessDeleteTransaction]);

  return (
    <DeleteModal
      title="Delete Transaction"
      description="Are you sure want to delete this transaction?"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onPressCancel={() => {
        onClose();
        setSelectedId("");
      }}
      onPressDelete={() => mutateDeleteTransaction(selectedId)}
      disabled={isPendingDeleteTransaction}
    />
  );
};

export default DeleteTransactionModal;
