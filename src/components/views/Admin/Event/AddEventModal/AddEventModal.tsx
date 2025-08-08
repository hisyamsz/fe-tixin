import InputFile from "@/components/ui/InputFile";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import React, { FC, useEffect } from "react";
import { Controller } from "react-hook-form";
import useAddEventModal from "./useAddEventModal";
import { ICategory } from "@/types/Category";
import { IRegency } from "@/types/Event";
import { getLocalTimeZone, now } from "@internationalized/date";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchEvents: () => void;
}

const AddEventModal: FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchEvents,
}) => {
  const {
    control,
    errors,
    handleAddEvent,
    handleDeleteBanner,
    handleOnClose,
    handleSubmitFormAddEvent,
    handleUploadBanner,
    isPendingAddEvent,
    isPendingDeleteFile,
    isPendingUploadFile,
    isSuccessAddEvent,
    preview,
    dataCategory,
    dataRegion,
    handleSearchRegion,
  } = useAddEventModal();

  const disabledSubmit =
    isPendingAddEvent || isPendingUploadFile || isPendingDeleteFile;

  useEffect(() => {
    if (isSuccessAddEvent) {
      onClose();
      refetchEvents();
    }
  }, [isSuccessAddEvent]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      onClose={() => handleOnClose(onClose)}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitFormAddEvent(handleAddEvent)}>
        <ModalContent className="m-4 p-2">
          <ModalHeader>Create Event</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <div className="mb-2 flex flex-col gap-y-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      type="text"
                      label="Name"
                      variant="bordered"
                      autoComplete="off"
                      isInvalid={errors.name !== undefined}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />
                <Controller
                  name="slug"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      label="Slug"
                      variant="bordered"
                      autoComplete="off"
                      isInvalid={errors.slug !== undefined}
                      errorMessage={errors.slug?.message}
                    />
                  )}
                />
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataCategory?.data.data || []}
                      label="Category"
                      variant="bordered"
                      isInvalid={errors.category !== undefined}
                      errorMessage={errors.category?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Search category here.."
                    >
                      {(category: ICategory) => (
                        <AutocompleteItem key={category._id}>
                          {category.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Start Date"
                      variant="bordered"
                      defaultValue={now(getLocalTimeZone())}
                      hideTimeZone
                      showMonthAndYearPickers
                      isInvalid={errors.startDate !== undefined}
                      errorMessage={errors.startDate?.message}
                    />
                  )}
                />
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="End Date"
                      variant="bordered"
                      defaultValue={now(getLocalTimeZone())}
                      hideTimeZone
                      showMonthAndYearPickers
                      isInvalid={errors.endDate !== undefined}
                      errorMessage={errors.endDate?.message}
                    />
                  )}
                />
                <Controller
                  name="isPublish"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Status"
                      variant="bordered"
                      isInvalid={errors.isPublish !== undefined}
                      errorMessage={errors.isPublish?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true" value="true">
                        Publish
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        Draft
                      </SelectItem>
                    </Select>
                  )}
                />

                <Controller
                  name="isFeatured"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Featured"
                      variant="bordered"
                      isInvalid={errors.isFeatured !== undefined}
                      errorMessage={errors.isFeatured?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true" value="true">
                        Yes
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        No
                      </SelectItem>
                    </Select>
                  )}
                />
                <Controller
                  name="isOnline"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Type"
                      variant="bordered"
                      isInvalid={errors.isOnline !== undefined}
                      errorMessage={errors.isOnline?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true" value="true">
                        Online
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        Offline
                      </SelectItem>
                    </Select>
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
              </div>
              <p className="text-sm font-bold">Location</p>
              <div className="mb-2 flex flex-col gap-y-4">
                <Controller
                  name="region"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataRegion?.data.data || []}
                      label="City"
                      variant="bordered"
                      onInputChange={(search) => handleSearchRegion(search)}
                      isInvalid={errors.region !== undefined}
                      errorMessage={errors.region?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Search city here.."
                    >
                      {(regency: IRegency) => (
                        <AutocompleteItem key={regency.id}>
                          {regency.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="latitude"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      label="Latitude"
                      variant="bordered"
                      autoComplete="off"
                      isInvalid={errors.latitude !== undefined}
                      errorMessage={errors.latitude?.message}
                    />
                  )}
                />
                <Controller
                  name="longitude"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      label="Longitude"
                      variant="bordered"
                      autoComplete="off"
                      isInvalid={errors.longitude !== undefined}
                      errorMessage={errors.longitude?.message}
                    />
                  )}
                />
              </div>
              <p className="text-sm font-bold">Cover</p>
              <Controller
                name="banner"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteBanner(onChange)}
                    isDeleting={isPendingDeleteFile}
                    onUpload={(files) => handleUploadBanner(files, onChange)}
                    isUploading={isPendingUploadFile}
                    preview={typeof preview === "string" ? preview : ""}
                    isInvalid={errors.banner !== undefined}
                    errorMessage={errors.banner?.message}
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
                "Add Event"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddEventModal;
