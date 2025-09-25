import InputFile from "@/components/ui/InputFile";
import { cn } from "@/utils/cn";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import React, { FC, useEffect } from "react";
import usePictureTab from "./usePictureTab";
import { Controller } from "react-hook-form";
import { IProfile } from "@/types/Auth";

interface PictureTabProps {
  currentPicture: string;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const PictureTab: FC<PictureTabProps> = ({
  currentPicture,
  onUpdate,
  isPendingUpdate,
  isSuccessUpdate,
}) => {
  const {
    handleDeletePicture,
    handleUploadPicture,
    isPendingDeleteFile,
    isPendingUploadFile,

    controlUpdatePicture,
    errorsUpdatePicture,
    handleSubmitUpdatePicture,
    resetUpdatePicture,

    preview,
  } = usePictureTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdatePicture();
    }
  }, [isSuccessUpdate]);

  const disabledUpdate =
    isPendingUploadFile || isPendingDeleteFile || isPendingUpdate;

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Profile Picture</h1>
        <p className="w-full text-sm text-default-400">
          Manage picture for your profile
        </p>
        <CardBody>
          <form
            className="mt-2 flex flex-col gap-5"
            onSubmit={handleSubmitUpdatePicture(onUpdate)}
          >
            <div className="flex flex-col gap-2">
              <p className="text-center text-sm font-medium text-default-700">
                Current Picture
              </p>
              <Skeleton
                isLoaded={!!currentPicture}
                className={cn("mx-auto aspect-auto w-3/4 rounded-full", {
                  "aspect-square": !currentPicture,
                })}
              >
                <Avatar
                  src={currentPicture}
                  alt="picture"
                  showFallback
                  className="aspect-square h-full w-full"
                />
              </Skeleton>
            </div>
            <Controller
              name="profilePicture"
              control={controlUpdatePicture}
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeletePicture(onChange)}
                  isDeleting={isPendingDeleteFile}
                  onUpload={(files) => handleUploadPicture(files, onChange)}
                  isUploading={isPendingUploadFile}
                  preview={typeof preview === "string" ? preview : ""}
                  isInvalid={errorsUpdatePicture.profilePicture !== undefined}
                  errorMessage={errorsUpdatePicture.profilePicture?.message}
                  isDropable
                  label={
                    <p className="mb-2 text-sm font-medium text-default-700">
                      Upload New Picture
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

export default PictureTab;
