import { IBanner } from "@/types/Banner";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import React, { FC, useEffect } from "react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";

interface InfoTabProps {
  dataBanner: IBanner;
  onUpdate: (data: IBanner) => void;
  isPendingDataBanner: boolean;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab: FC<InfoTabProps> = ({
  dataBanner,
  isPendingDataBanner,
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
    setValueUpdateInfo("title", `${dataBanner?.title}`);
    setValueUpdateInfo("isShow", `${dataBanner?.isShow}`);
  }, [dataBanner]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
      setValueUpdateInfo("title", `${dataBanner?.title}`);
      setValueUpdateInfo("isShow", `${dataBanner?.isShow}`);
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Banner Information</h1>
        <p className="w-full text-sm text-default-400">
          Manage information of this banner
        </p>
        <CardBody>
          <form
            className="mt-2 flex flex-col gap-4"
            onSubmit={handleSubmitUpdateInfo(onUpdate)}
          >
            <Skeleton isLoaded={!!dataBanner?.title} className="rounded-lg">
              <Controller
                name="title"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoComplete="off"
                    errorMessage={errorsUpdateInfo.title?.message}
                    isInvalid={errorsUpdateInfo.title !== undefined}
                    label="Title"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                  />
                )}
              />
            </Skeleton>
            <Skeleton
              isLoaded={!!dataBanner && !isPendingDataBanner}
              className="rounded-lg"
            >
              {!isPendingDataBanner ? (
                <Controller
                  name="isShow"
                  control={controlUpdateInfo}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Status"
                      labelPlacement="outside"
                      variant="bordered"
                      isInvalid={errorsUpdateInfo.isShow !== undefined}
                      errorMessage={errorsUpdateInfo.isShow?.message}
                      disallowEmptySelection
                      defaultSelectedKeys={[
                        dataBanner?.isShow ? "true" : "false",
                      ]}
                    >
                      <SelectItem key="true" value="true">
                        Show
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        Hide
                      </SelectItem>
                    </Select>
                  )}
                />
              ) : (
                <div className="h-16 w-full" />
              )}
            </Skeleton>

            <Button
              type="submit"
              color="primary"
              className="mt-2 disabled:bg-default-500"
              disabled={isPendingUpdate || !dataBanner?._id}
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
