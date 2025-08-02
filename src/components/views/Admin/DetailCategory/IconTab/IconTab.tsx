import InputFile from "@/components/ui/InputFile";
import { cn } from "@/utils/cn";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import React, { FC, useEffect } from "react";
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { ICategory } from "@/types/Category";

interface IconTabProps {
  currentIcon: string;
  onUpdate: (data: ICategory) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const IconTab: FC<IconTabProps> = ({
  currentIcon,
  onUpdate,
  isPendingUpdate,
  isSuccessUpdate,
}) => {
  const {
    handleDeleteIcon,
    handleUploadIcon,
    isPendingDeleteFile,
    isPendingUploadFile,

    controlUpdateIcon,
    errorsUpdateIcon,
    handleSubmitUpdateIcon,
    resetUpdateIcon,

    preview,
  } = useIconTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateIcon();
    }
  }, [isSuccessUpdate]);

  const disabledUpdate =
    isPendingUploadFile || isPendingDeleteFile || isPendingUpdate;

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Icon</h1>
        <p className="w-full text-sm text-default-400">
          Manage icon of this category
        </p>
        <CardBody>
          <form
            className="mt-2 flex flex-col gap-5"
            onSubmit={handleSubmitUpdateIcon(onUpdate)}
          >
            <div className="flex flex-col gap-2">
              <p className="text-center text-sm font-medium text-default-700">
                Current Icon
              </p>
              <Skeleton
                isLoaded={!!currentIcon}
                className={cn("aspect-auto rounded-lg", {
                  "aspect-square": !currentIcon,
                })}
              >
                <Image
                  src={currentIcon}
                  alt="icon"
                  fill
                  className="!relative"
                />
              </Skeleton>
            </div>
            <Controller
              name="icon"
              control={controlUpdateIcon}
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeleteIcon(onChange)}
                  isDeleting={isPendingDeleteFile}
                  onUpload={(files) => handleUploadIcon(files, onChange)}
                  isUploading={isPendingUploadFile}
                  preview={typeof preview === "string" ? preview : ""}
                  isInvalid={errorsUpdateIcon.icon !== undefined}
                  errorMessage={errorsUpdateIcon.icon?.message}
                  isDropable
                  label={
                    <p className="mb-2 text-sm font-medium text-default-700">
                      Upload new icon
                    </p>
                  }
                />
              )}
            />
            <Button
              type="submit"
              color="primary"
              className="disabled:bg-default-500"
              disabled={disabledUpdate || !preview}
            >
              {disabledUpdate ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Save Change"
              )}
            </Button>
          </form>
        </CardBody>
      </CardHeader>
    </Card>
  );
};

export default IconTab;
