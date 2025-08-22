import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { FC, useEffect } from "react";
import { Controller } from "react-hook-form";
import useAddBannerModal from "./useAddBannerModal";

interface AddBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBanner: () => void;
}

const AddBannerModal: FC<AddBannerModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchBanner,
}) => {
  const {
    control,
    errors,
    reset,
    handleSubmitFormAddBanner,
    handleAddBanner,
    isPendingAddBanner,
    isSuccessAddBanner,

    handleUploadImage,
    isPendingUploadFile,
    handleDeleteImage,
    isPendingDeleteFile,
    handleOnClose,
    preview,
  } = useAddBannerModal();

  const disabledSubmit =
    isPendingAddBanner || isPendingUploadFile || isPendingDeleteFile;

  useEffect(() => {
    if (isSuccessAddBanner) {
      onClose();
      refetchBanner();
    }
  }, [isSuccessAddBanner]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      onClose={() => handleOnClose(onClose)}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitFormAddBanner(handleAddBanner)}>
        <ModalContent className="m-4 p-2">
          <ModalHeader>Create Banner</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Title"
                    variant="bordered"
                    type="text"
                    autoComplete="off"
                    isInvalid={errors.title !== undefined}
                    errorMessage={errors.title?.message}
                  />
                )}
              />
              <Controller
                name="isShow"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    variant="bordered"
                    isInvalid={errors.isShow !== undefined}
                    errorMessage={errors.isShow?.message}
                    disallowEmptySelection
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
              <p className="text-sm font-bold">Image</p>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteImage(onChange)}
                    isDeleting={isPendingDeleteFile}
                    onUpload={(files) => handleUploadImage(files, onChange)}
                    isUploading={isPendingUploadFile}
                    preview={typeof preview === "string" ? preview : ""}
                    isInvalid={errors.image !== undefined}
                    errorMessage={errors.image?.message}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={() => handleOnClose(onClose)}
              color="primary"
              variant="bordered"
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={disabledSubmit}>
              {disabledSubmit ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Add Banner"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddBannerModal;
