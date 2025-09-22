import { ToasterContext } from "@/contexts/ToasterContext";
import orderServices from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteTransactionModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteTransaction = async (id: string) => {
    const result = await orderServices.deleteOrder(id);
    return result;
  };

  const {
    mutate: mutateDeleteTransaction,
    isPending: isPendingDeleteTransaction,
    isSuccess: isSuccessDeleteTransaction,
  } = useMutation({
    mutationFn: deleteTransaction,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success delete transaction",
      });
    },
  });

  return {
    mutateDeleteTransaction,
    isPendingDeleteTransaction,
    isSuccessDeleteTransaction,
  };
};

export default useDeleteTransactionModal;
