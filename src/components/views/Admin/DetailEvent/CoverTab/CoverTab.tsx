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
import useCoverTab from "./useCoverTab";
import { Controller } from "react-hook-form";
import { IEvent } from "@/types/Event";

interface CoverTabProps {
  currentBanner: string;
  onUpdate: (data: IEvent) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const CoverTab: FC<CoverTabProps> = ({
  currentBanner,
  onUpdate,
  isPendingUpdate,
  isSuccessUpdate,
}) => {
  const {
    handleDeleteCover,
    handleUploadCover,
    isPendingDeleteFile,
    isPendingUploadFile,

    controlUpdateCover,
    errorsUpdateCover,
    handleSubmitUpdateCover,
    resetUpdateCover,

    preview,
  } = useCoverTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateCover();
    }
  }, [isSuccessUpdate]);

  const disabledUpdate =
    isPendingUploadFile || isPendingDeleteFile || isPendingUpdate;

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Cover</h1>
        <p className="w-full text-sm text-default-400">
          Manage cover of this event
        </p>
        <CardBody>
          <form
            className="mt-2 flex flex-col gap-5"
            onSubmit={handleSubmitUpdateCover(onUpdate)}
          >
            <div className="flex flex-col gap-2">
              <p className="text-center text-sm font-medium text-default-700">
                Current Cover
              </p>
              <Skeleton
                isLoaded={!!currentBanner}
                className={cn("aspect-auto rounded-lg", {
                  "aspect-square": !currentBanner,
                })}
              >
                <Image
                  src={currentBanner}
                  alt="cover"
                  fill
                  className="!relative rounded-lg"
                />
              </Skeleton>
            </div>
            <Controller
              name="banner"
              control={controlUpdateCover}
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeleteCover(onChange)}
                  isDeleting={isPendingDeleteFile}
                  onUpload={(files) => handleUploadCover(files, onChange)}
                  isUploading={isPendingUploadFile}
                  preview={typeof preview === "string" ? preview : ""}
                  isInvalid={errorsUpdateCover.banner !== undefined}
                  errorMessage={errorsUpdateCover.banner?.message}
                  isDropable
                  label={
                    <p className="mb-2 text-sm font-medium text-default-700">
                      Upload New Cover
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

export default CoverTab;
