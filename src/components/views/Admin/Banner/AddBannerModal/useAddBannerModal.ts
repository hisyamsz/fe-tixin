import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/Banner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const addBannerSchema = yup.object().shape({
  title: yup.string().required("Please input title"),
  isShow: yup.string().required("Please select status"),
  image: yup.mixed<FileList | string>().required("Please input image"),
});

const useAddBannerModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    isPendingUploadFile,
    isPendingDeleteFile,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitFormAddBanner,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(addBannerSchema),
  });

  const preview = watch("image");
  const fileUrl = getValues("image");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
  };

  const handleDeleteImage = async (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const addBanner = async (payload: IBanner) => {
    const result = await bannerServices.addBanner(payload);
    return result;
  };

  const {
    mutate: mutateAddBanner,
    isPending: isPendingAddBanner,
    isSuccess: isSuccessAddBanner,
  } = useMutation({
    mutationFn: addBanner,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add banner",
      });
      reset();
    },
  });

  const handleAddBanner = (data: IBanner) => mutateAddBanner(data);

  return {
    control,
    errors,
    reset,
    handleSubmitFormAddBanner,
    handleAddBanner,
    isPendingAddBanner,
    isSuccessAddBanner,

    handleUploadImage,
    isPendingUploadFile,
    handleDeleteImage,
    isPendingDeleteFile,
    handleOnClose,
    preview,
  };
};

export default useAddBannerModal;
