import { ICategory } from "@/types/Category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import React, { FC, useEffect } from "react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";

interface InfoTabProps {
  dataCategory: ICategory;
  onUpdate: (data: ICategory) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab: FC<InfoTabProps> = ({
  dataCategory,
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
    setValueUpdateInfo("name", `${dataCategory?.name}`);
    setValueUpdateInfo("description", `${dataCategory?.description}`);
  }, [dataCategory]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Information</h1>
        <p className="w-full text-sm text-default-400">
          Manage information of this category
        </p>
        <CardBody>
          <form
            className="mt-2 flex flex-col gap-4"
            onSubmit={handleSubmitUpdateInfo(onUpdate)}
          >
            <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
              <Controller
                name="name"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoComplete="off"
                    errorMessage={errorsUpdateInfo.name?.message}
                    isInvalid={errorsUpdateInfo.name !== undefined}
                    label="Name"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                  />
                )}
              />
            </Skeleton>
            <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
              <Controller
                name="description"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    autoComplete="off"
                    errorMessage={errorsUpdateInfo.description?.message}
                    isInvalid={errorsUpdateInfo.description !== undefined}
                    label="Description"
                    labelPlacement="outside"
                    variant="bordered"
                  />
                )}
              />
            </Skeleton>

            <Button
              type="submit"
              color="primary"
              className="disabled:bg-default-500"
              disabled={isPendingUpdate || !dataCategory?._id}
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
