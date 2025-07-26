import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const addCategorySchema = yup.object().shape({
  name: yup.string().required("Please input name of category"),
  description: yup.string().required("Please input description of category"),
  icon: yup.mixed<FileList | string>().required("Please input icon"),
});

const useAddCategoryModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    mutateUploadFile,
    isPendingUploadFile,
    mutateDeleteFile,
    isPendingDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitFormAddCategory,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(addCategorySchema),
  });

  const preview = watch("icon");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback: (fileUrl: string) => {
          setValue("icon", fileUrl);
        },
      });
    }
  };

  const addCategory = async (payload: ICategory) => {
    const result = await categoryServices.addCategory(payload);
    return result;
  };

  const handleDeleteIcon = async (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValues("icon");

    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
    }
  };

  const handleOnClose = (onClose: () => void) => {
    const fileUrl = getValues("icon");

    if (typeof fileUrl === "string") {
      mutateDeleteFile({
        fileUrl,
        callback: () => {
          reset();
          onClose();
        },
      });
    } else {
      reset();
      onClose();
    }
  };

  const {
    mutate: mutateAddCategory,
    isPending: isPendingAddCategory,
    isSuccess: isSuccessAddCategory,
  } = useMutation({
    mutationFn: addCategory,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add category",
      });
      reset();
    },
  });

  const handleAddCategory = (data: ICategory) => mutateAddCategory(data);

  return {
    control,
    errors,
    reset,
    handleSubmitFormAddCategory,
    handleAddCategory,
    isPendingAddCategory,
    isSuccessAddCategory,

    handleUploadIcon,
    isPendingUploadFile,
    handleDeleteIcon,
    isPendingDeleteFile,
    handleOnClose,
    preview,
  };
};

export default useAddCategoryModal;
