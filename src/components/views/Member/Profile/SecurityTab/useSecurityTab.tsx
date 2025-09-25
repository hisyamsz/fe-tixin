import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import { IUpdatePassword } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const updatePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Input your old password"),
  password: yup.string().required("Input your new password"),
  confirmPassword: yup.string().required("Input confirm password"),
});

const useSecurityTab = () => {
  const { setToaster } = useContext(ToasterContext);
  const [visiblePass, setVisiblePass] = useState({
    oldPassword: false,
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (
    key: "oldPassword" | "password" | "confirmPassword",
  ) => {
    setVisiblePass({
      ...visiblePass,
      [key]: !visiblePass[key],
    });
  };

  const {
    control: controlUpdatePassword,
    handleSubmit: handleSubmitUpdatePassword,
    formState: { errors: errorsUpdatePassword },
    reset: resetUpdatePassword,
    setValue: setValueUpdatePassword,
  } = useForm({
    resolver: yupResolver(updatePasswordSchema),
  });

  const updatePassword = async (payload: IUpdatePassword) => {
    const { data } = await authServices.updatePassword(payload);

    return data;
  };

  const { mutate: mutateUpdatePassword, isPending: isPendingUpdatePassword } =
    useMutation({
      mutationFn: (payload: IUpdatePassword) => updatePassword(payload),
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
      onSuccess: () => {
        resetUpdatePassword();
        setValueUpdatePassword("oldPassword", "");
        setValueUpdatePassword("password", "");
        setValueUpdatePassword("confirmPassword", "");
        setToaster({
          type: "success",
          message: "Success update password",
        });
      },
    });

  const handleUpdatePassword = (data: IUpdatePassword) =>
    mutateUpdatePassword(data);

  return {
    controlUpdatePassword,
    errorsUpdatePassword,
    handleSubmitUpdatePassword,

    handleVisiblePassword,
    visiblePass,

    handleUpdatePassword,
    isPendingUpdatePassword,
  };
};

export default useSecurityTab;
