import React, { FC } from "react";
import useSecurityTab from "./useSecurityTab";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface SecurityTabProps {}

const SecurityTab: FC<SecurityTabProps> = ({}) => {
  const {
    controlUpdatePassword,
    errorsUpdatePassword,
    handleSubmitUpdatePassword,

    handleVisiblePassword,
    visiblePass,

    handleUpdatePassword,
    isPendingUpdatePassword,
  } = useSecurityTab();

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Security</h1>
        <p className="w-full text-sm text-default-400">
          Update your account security
        </p>
        <CardBody>
          <form
            className="mt-2 flex flex-col gap-4"
            onSubmit={handleSubmitUpdatePassword(handleUpdatePassword)}
          >
            <Controller
              name="oldPassword"
              control={controlUpdatePassword}
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  errorMessage={errorsUpdatePassword.oldPassword?.message}
                  isInvalid={errorsUpdatePassword.oldPassword !== undefined}
                  label="Old Password"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Input your old password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("oldPassword")}
                    >
                      {visiblePass.oldPassword ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  }
                  type={visiblePass.oldPassword ? "text" : "password"}
                />
              )}
            />
            <Controller
              name="password"
              control={controlUpdatePassword}
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  errorMessage={errorsUpdatePassword.password?.message}
                  isInvalid={errorsUpdatePassword.password !== undefined}
                  label="New Password"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Input your new password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("password")}
                    >
                      {visiblePass.password ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  }
                  type={visiblePass.password ? "text" : "password"}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={controlUpdatePassword}
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  errorMessage={errorsUpdatePassword.confirmPassword?.message}
                  isInvalid={errorsUpdatePassword.confirmPassword !== undefined}
                  label="Confirm Password"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Input confirm password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("confirmPassword")}
                    >
                      {visiblePass.confirmPassword ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  }
                  type={visiblePass.confirmPassword ? "text" : "password"}
                />
              )}
            />

            <Button
              type="submit"
              color="primary"
              className="mt-2 disabled:bg-default-500"
              disabled={isPendingUpdatePassword}
            >
              {isPendingUpdatePassword ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardBody>
      </CardHeader>
    </Card>
  );
};

export default SecurityTab;
