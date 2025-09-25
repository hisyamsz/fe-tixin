import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import React, { FC, useEffect } from "react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { IProfile } from "@/types/Auth";

interface InfoTabProps {
  dataProfile: IProfile;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  onUpdate: (data: IProfile) => void;
}

const InfoTab: FC<InfoTabProps> = ({
  dataProfile,
  isPendingUpdate,
  isSuccessUpdate,
  onUpdate,
}) => {
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (dataProfile) {
      setValueUpdateInfo("fullName", `${dataProfile?.fullName}`);
    }
  }, [dataProfile]);

  useEffect(() => {
    if (isSuccessUpdate && isPendingUpdate) {
      resetUpdateInfo();
      setValueUpdateInfo("fullName", `${dataProfile?.fullName}`);
    }
  }, [isSuccessUpdate, isPendingUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Profile Information</h1>
        <p className="w-full text-sm text-default-400">
          Manage information of this account
        </p>
        <CardBody>
          <form
            className="mt-2 flex flex-col gap-4"
            onSubmit={handleSubmitUpdateInfo(onUpdate)}
          >
            <Skeleton
              isLoaded={!!dataProfile?.fullName || isPendingUpdate}
              className="rounded-lg"
            >
              <Controller
                name="fullName"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoComplete="off"
                    errorMessage={errorsUpdateInfo.fullName?.message}
                    isInvalid={errorsUpdateInfo.fullName !== undefined}
                    label="Fullname"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                  />
                )}
              />
            </Skeleton>

            <Skeleton
              isLoaded={!!dataProfile?.username || isPendingUpdate}
              className="rounded-lg"
            >
              <Input
                label="Username"
                labelPlacement="outside"
                disabled
                variant="flat"
                value={dataProfile?.username}
              />
            </Skeleton>

            <Skeleton
              isLoaded={!!dataProfile?.email || isPendingUpdate}
              className="rounded-lg"
            >
              <Input
                label="Email"
                labelPlacement="outside"
                disabled
                variant="flat"
                value={dataProfile?.email}
              />
            </Skeleton>

            <Skeleton
              isLoaded={!!dataProfile?.role || isPendingUpdate}
              className="rounded-lg"
            >
              <Input
                label="Role"
                labelPlacement="outside"
                disabled
                variant="flat"
                value={dataProfile?.role}
              />
            </Skeleton>

            <Button
              type="submit"
              color="primary"
              className="mt-2 disabled:bg-default-500"
              disabled={isPendingUpdate || !dataProfile?._id}
            >
              {isPendingUpdate ? (
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

export default InfoTab;
