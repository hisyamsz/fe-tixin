import { Button, Card, CardBody, Input, Spinner } from "@nextui-org/react";
import useLogin from "./useLogin";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Image from "next/image";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-16 lg:flex-row lg:gap-20">
      <Card>
        <CardBody className="p-8">
          <h2 className="mb-2 text-2xl font-bold text-primary">Login</h2>
          <p className="mb-4 text-sm">
            Don&apos;t have any account?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-indigo-400"
            >
              Register here
            </Link>
          </p>
          {errors.root && (
            <p className="mb-2 text-sm font-medium text-red-600">
              {errors?.root?.message}
            </p>
          )}
          <form
            className={cn(
              "flex w-80 flex-col",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              name="identifier"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Email / Username"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.identifier !== undefined}
                  errorMessage={errors.identifier?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Password"
                  autoComplete="off"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button
              type="submit"
              size="lg"
              className="bg-primary text-white disabled:opacity-80"
              disabled={isPendingLogin}
            >
              {isPendingLogin ? <Spinner color="white" size="sm" /> : "Login"}
            </Button>
          </form>
        </CardBody>
      </Card>
      <div className="flex w-full flex-col items-center justify-center gap-10 lg:w-1/3">
        <Image
          src="/images/general/Tixin-Logos.svg"
          alt="Logo"
          width={180}
          height={180}
        />
        <Image
          src="/images/illustration/auth.svg"
          alt="Login"
          width={1024}
          height={1024}
          className="w-2/3 lg:w-full"
        />
      </div>
    </div>
  );
};

export default Login;
