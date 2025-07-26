import { ToasterContext } from "@/contexts/ToasterContext";
import uploadServices from "@/services/upload.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useMediaHandling = () => {
  const { setToaster } = useContext(ToasterContext);
  const uploadIcon = async (
    file: File,
    callback: (fileUrl: string) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    const {
      data: {
        data: { secure_url: icon },
      },
    } = await uploadServices.uploadFile(formData);
    callback(icon);
  };

  const { mutate: mutateUploadFile, isPending: isPendingUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadIcon(variables.file, variables.callback),
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
    });

  const deleteIcon = async (fileUrl: string, callback: () => void) => {
    const result = await uploadServices.deleteFile({ fileUrl });

    if (result.data.meta.status === 200) {
      callback();
    }
  };

  const { mutate: mutateDeleteFile, isPending: isPendingDeleteFile } =
    useMutation({
      mutationFn: (variables: { fileUrl: string; callback: () => void }) =>
        deleteIcon(variables.fileUrl, variables.callback),
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
    });

  return {
    mutateUploadFile,
    isPendingUploadFile,
    mutateDeleteFile,
    isPendingDeleteFile,
  };
};

export default useMediaHandling;
