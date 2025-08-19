import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import React, { FC, useEffect } from "react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
}

const AddCategoryModal: FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchCategory,
}) => {
  const {
    control,
    errors,
    handleSubmitFormAddCategory,
    handleAddCategory,
    isPendingAddCategory,
    isSuccessAddCategory,

    handleUploadIcon,
    isPendingUploadFile,
    handleDeleteIcon,
    isPendingDeleteFile,
    handleOnClose,
    preview,
  } = useAddCategoryModal();

  const disabledSubmit =
    isPendingAddCategory || isPendingUploadFile || isPendingDeleteFile;

  useEffect(() => {
    if (isSuccessAddCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessAddCategory]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      onClose={() => handleOnClose(onClose)}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitFormAddCategory(handleAddCategory)}>
        <ModalContent className="m-4 p-2">
          <ModalHeader>Create Category</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    type="text"
                    autoComplete="off"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
              <p className="text-sm font-bold">Icon</p>
              <Controller
                name="icon"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteIcon(onChange)}
                    isDeleting={isPendingDeleteFile}
                    onUpload={(files) => handleUploadIcon(files, onChange)}
                    isUploading={isPendingUploadFile}
                    preview={typeof preview === "string" ? preview : ""}
                    isInvalid={errors.icon !== undefined}
                    errorMessage={errors.icon?.message}
                    isDropable
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
                "Add Category"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
