import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import React, { FC, useEffect } from "react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { IEventForm } from "@/types/Event";
import { ICategory } from "@/types/Category";
import { toInputDate } from "@/utils/date";

interface InfoTabProps {
  dataEvent: IEventForm;
  isPendingDataEvent: boolean;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  onUpdate: (data: IEventForm) => void;
}

const InfoTab: FC<InfoTabProps> = ({
  dataEvent,
  isPendingDataEvent,
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

    dataCategory,
    isPendingDataCategory,
  } = useInfoTab();

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateInfo("name", `${dataEvent?.name}`);
      setValueUpdateInfo("slug", `${dataEvent?.slug}`);
      setValueUpdateInfo("category", `${dataEvent?.category}`);
      setValueUpdateInfo("startDate", toInputDate(`${dataEvent?.startDate}`));
      setValueUpdateInfo("endDate", toInputDate(`${dataEvent?.endDate}`));
      setValueUpdateInfo("isPublish", `${dataEvent?.isPublish}`);
      setValueUpdateInfo("isFeatured", `${dataEvent?.isFeatured}`);
      setValueUpdateInfo("description", `${dataEvent?.description}`);
    }
  }, [dataEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Information</h1>
        <p className="w-full text-sm text-default-400">
          Manage information of this event
        </p>
        <CardBody>
          <form
            className="mt-2 flex flex-col gap-4"
            onSubmit={handleSubmitUpdateInfo(onUpdate)}
          >
            <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
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
            <Skeleton isLoaded={!!dataEvent?.slug} className="rounded-lg">
              <Controller
                name="slug"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoComplete="off"
                    errorMessage={errorsUpdateInfo.slug?.message}
                    isInvalid={errorsUpdateInfo.slug !== undefined}
                    label="Slug"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                  />
                )}
              />
            </Skeleton>
            <Skeleton
              isLoaded={!!dataEvent?.category && !isPendingDataCategory}
              className="rounded-lg"
            >
              {!isPendingDataCategory ? (
                <Controller
                  name="category"
                  control={controlUpdateInfo}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultSelectedKey={dataEvent?.category}
                      defaultItems={dataCategory?.data.data || []}
                      label="Category"
                      labelPlacement="outside"
                      variant="bordered"
                      isInvalid={errorsUpdateInfo.category !== undefined}
                      errorMessage={errorsUpdateInfo.category?.message}
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
              ) : (
                <div className="h-16 w-full" />
              )}
            </Skeleton>
            <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-lg">
              <Controller
                name="startDate"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Start Date"
                    labelPlacement="outside"
                    variant="bordered"
                    hideTimeZone
                    showMonthAndYearPickers
                    isInvalid={errorsUpdateInfo.startDate !== undefined}
                    errorMessage={errorsUpdateInfo.startDate?.message}
                  />
                )}
              />
            </Skeleton>
            <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-lg">
              <Controller
                name="endDate"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="End Date"
                    labelPlacement="outside"
                    variant="bordered"
                    hideTimeZone
                    showMonthAndYearPickers
                    isInvalid={errorsUpdateInfo.endDate !== undefined}
                    errorMessage={errorsUpdateInfo.endDate?.message}
                  />
                )}
              />
            </Skeleton>
            <Skeleton
              isLoaded={!!dataEvent && !isPendingDataEvent}
              className="rounded-lg"
            >
              {!isPendingDataEvent ? (
                <Controller
                  name="isPublish"
                  control={controlUpdateInfo}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Status"
                      variant="bordered"
                      isInvalid={errorsUpdateInfo.isPublish !== undefined}
                      errorMessage={errorsUpdateInfo.isPublish?.message}
                      defaultSelectedKeys={[
                        dataEvent?.isPublish ? "true" : "false",
                      ]}
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
              ) : (
                <div className="h-16 w-full" />
              )}
            </Skeleton>
            <Skeleton
              isLoaded={!!dataEvent && !isPendingDataEvent}
              className="rounded-lg"
            >
              {!isPendingDataEvent ? (
                <Controller
                  name="isFeatured"
                  control={controlUpdateInfo}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Featured"
                      variant="bordered"
                      isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                      errorMessage={errorsUpdateInfo.isFeatured?.message}
                      disallowEmptySelection
                      defaultSelectedKeys={[
                        dataEvent?.isFeatured ? "true" : "false",
                      ]}
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
              ) : (
                <div className="h-16 w-full" />
              )}
            </Skeleton>
            <Skeleton
              isLoaded={!!dataEvent?.description}
              className="rounded-lg"
            >
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
              disabled={isPendingUpdate || !dataEvent?._id}
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
