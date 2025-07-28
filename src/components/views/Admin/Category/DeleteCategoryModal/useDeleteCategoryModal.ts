import { ToasterContext } from "@/contexts/ToasterContext";
import categoryServices from "@/services/category.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteCategoryModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteCategory = async (id: string) => {
    const result = await categoryServices.deleteCategory(id);
    return result;
  };

  const {
    mutate: mutateDeleteCategory,
    isPending: isPendingDeleteCategory,
    isSuccess: isSuccessDeleteCategory,
  } = useMutation({
    mutationFn: deleteCategory,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success delete category",
      });
    },
  });

  return {
    mutateDeleteCategory,
    isPendingDeleteCategory,
    isSuccessDeleteCategory,
  };
};

export default useDeleteCategoryModal;
