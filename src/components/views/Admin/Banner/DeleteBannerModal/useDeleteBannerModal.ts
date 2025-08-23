import { ToasterContext } from "@/contexts/ToasterContext";
import bannerServices from "@/services/banner.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteBannerModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteBanner = async (id: string) => {
    const result = await bannerServices.deleteBanner(id);
    return result;
  };

  const {
    mutate: mutateDeleteBanner,
    isPending: isPendingDeleteBanner,
    isSuccess: isSuccessDeleteBanner,
  } = useMutation({
    mutationFn: deleteBanner,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success delete banner",
      });
    },
  });

  return {
    mutateDeleteBanner,
    isPendingDeleteBanner,
    isSuccessDeleteBanner,
  };
};

export default useDeleteBannerModal;
