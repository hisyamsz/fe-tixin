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
import useImageTab from "./useImageTab";
import { Controller } from "react-hook-form";
import { IBanner } from "@/types/Banner";

interface ImageTabProps {
  currentImage: string;
  onUpdate: (data: IBanner) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ImageTab: FC<ImageTabProps> = ({
  currentImage,
  onUpdate,
  isPendingUpdate,
  isSuccessUpdate,
}) => {
  const {
    handleDeleteImage,
    handleUploadImage,
    isPendingDeleteFile,
    isPendingUploadFile,

    controlUpdateImage,
    errorsUpdateImage,
    handleSubmitUpdateImage,
    resetUpdateImage,

    preview,
  } = useImageTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateImage();
    }
  }, [isSuccessUpdate]);

  const disabledUpdate =
    isPendingUploadFile || isPendingDeleteFile || isPendingUpdate;

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Banner Image</h1>
        <p className="w-full text-sm text-default-400">
          Manage image of this banner
        </p>
        <CardBody>
          <form
            className="mt-2 flex flex-col gap-5"
            onSubmit={handleSubmitUpdateImage(onUpdate)}
          >
            <div className="flex flex-col gap-2">
              <p className="text-center text-sm font-medium text-default-700">
                Current Image
              </p>
              <Skeleton
                isLoaded={!!currentImage}
                className={cn("aspect-auto rounded-lg", {
                  "aspect-square": !currentImage,
                })}
              >
                <Image
                  src={currentImage}
                  alt="image"
                  fill
                  className="!relative rounded-lg"
                />
              </Skeleton>
            </div>
            <Controller
              name="image"
              control={controlUpdateImage}
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeleteImage(onChange)}
                  isDeleting={isPendingDeleteFile}
                  onUpload={(files) => handleUploadImage(files, onChange)}
                  isUploading={isPendingUploadFile}
                  preview={typeof preview === "string" ? preview : ""}
                  isInvalid={errorsUpdateImage.image !== undefined}
                  errorMessage={errorsUpdateImage.image?.message}
                  isDropable
                  label={
                    <p className="mb-2 text-sm font-medium text-default-700">
                      Upload new image
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

export default ImageTab;
