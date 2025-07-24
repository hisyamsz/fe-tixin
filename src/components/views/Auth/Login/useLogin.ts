import { ToasterContext } from "@/contexts/ToasterContext";
import { ILogin } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Please input your Email or Username"),
  password: yup.string().required("Please input your password"),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const callbackUrl: string = (router.query.callbackUrl as string) || "/";

  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (result?.error && result.status === 401) {
      throw new Error("Incorrect email, username, or password");
    }

    return result;
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: () => {
      setToaster({
        type: "error",
        message: "Incorrect email, username, or password",
      });
    },
    onSuccess: () => {
      reset();
      setToaster({
        type: "success",
        message: "Login Success",
      });
      router.push(callbackUrl);
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
