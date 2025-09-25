import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const updatePictureSchema = yup.object().shape({
  profilePicture: yup
    .mixed<FileList | string>()
    .required("Please input picture"),
});

const usePictureTab = () => {
  const {
    handleUploadFile,
    isPendingUploadFile,
    handleDeleteFile,
    isPendingDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdatePicture,
    handleSubmit: handleSubmitUpdatePicture,
    formState: { errors: errorsUpdatePicture },
    reset: resetUpdatePicture,
    watch: watchUpdatePicture,
    getValues: getValuesUpdatePicture,
    setValue: setValueUpdatePicture,
  } = useForm({
    resolver: yupResolver(updatePictureSchema),
  });

  const preview = watchUpdatePicture("profilePicture");
  const fileUrl = getValuesUpdatePicture("profilePicture");

  const handleUploadPicture = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdatePicture("profilePicture", fileUrl);
      }
    });
  };

  const handleDeletePicture = async (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    handleDeletePicture,
    handleUploadPicture,
    isPendingDeleteFile,
    isPendingUploadFile,

    controlUpdatePicture,
    errorsUpdatePicture,
    handleSubmitUpdatePicture,
    resetUpdatePicture,

    preview,
  };
};

export default usePictureTab;
