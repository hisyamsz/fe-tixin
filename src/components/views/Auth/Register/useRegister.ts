import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ToasterContext } from "@/contexts/ToasterContext";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Please input your fullname"),
  username: yup.string().required("Please input your username"),
  email: yup
    .string()
    .email("Email format not valid")
    .required("Please input your email"),
  password: yup
    .string()
    .min(6, "Password at least 6 characters")
    .required("Please input your password")
    .test(
      "at-least-one-uppercase-letter",
      "Contains at least one uppercase letter",
      (value) => {
        if (!value) return false;

        const regex = /^(?=.*[A-Z])/;
        return regex.test(value);
      },
    )
    .test("at-least-one-number", "Contains at least one number", (value) => {
      if (!value) return false;

      const regex = /^(?=.*\d)/;
      return regex.test(value);
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password not match")
    .required("Please input your confirm password"),
});

const useRegister = () => {
  const router = useRouter();
  const [visiblePass, setVisiblePass] = useState({
    password: false,
    confirmPassword: false,
  });
  const { setToaster } = useContext(ToasterContext);

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePass({
      ...visiblePass,
      [key]: !visiblePass[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);

    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      reset();
      setToaster({
        type: "success",
        message: "Register Success",
      });
      router.push("/auth/register/success");
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    visiblePass,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
