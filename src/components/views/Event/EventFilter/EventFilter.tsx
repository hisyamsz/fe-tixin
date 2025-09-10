import React, { FC, useEffect } from "react";
import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import {
  Autocomplete,
  AutocompleteItem,
  Divider,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import { ICategory } from "@/types/Category";
import useChangeUrl from "@/hooks/useChangeUrl";

interface EventFilterProps {}

const EventFilter: FC<EventFilterProps> = ({}) => {
  const {
    control,
    setValue,
    dataCategory,
    isSuccessGetCategory,
    isPendingGetCategory,
  } = useEventFilter();
  const {
    handleChangeCategory,
    handleChangeIsOnline,
    handleChangeIsFeatured,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
  } = useChangeUrl();

  useEffect(() => {
    if (isSuccessGetCategory) {
      setValue("category", `${currentCategory}`);
      setValue("isOnline", `${currentIsOnline}`);
      setValue("isFeatured", `${currentIsFeatured}`);
    }
  }, [isSuccessGetCategory]);

  return (
    <div className="h-fit w-full rounded-xl border p-4 lg:sticky lg:top-10 lg:w-72">
      <h4 className="text-xl font-semibold text-primary-800">Filter</h4>
      <div className="mt-4 flex flex-col gap-4">
        <Skeleton
          isLoaded={!!dataCategory && !isPendingGetCategory}
          className="rounded-lg"
        >
          {!isPendingGetCategory ? (
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultSelectedKey={`${currentCategory}`}
                  defaultItems={dataCategory?.data?.data || []}
                  label="Category"
                  labelPlacement="outside"
                  variant="bordered"
                  onSelectionChange={(value) => {
                    onChange(value);
                    handleChangeCategory(`${value}`);
                  }}
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
            <div className="h-14 w-full" />
          )}
        </Skeleton>
        <Skeleton
          isLoaded={!!dataCategory && !isPendingGetCategory}
          className="rounded-lg"
        >
          {!isPendingGetCategory ? (
            <Controller
              name="isOnline"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Select
                  {...field}
                  label="Type"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Select Online / Offline"
                  defaultSelectedKeys={[`${currentIsOnline}`]}
                  onChange={(e) => handleChangeIsOnline(e.target.value)}
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
          ) : (
            <div className="h-14 w-full" />
          )}
        </Skeleton>
        <Skeleton
          isLoaded={!!dataCategory && !isPendingGetCategory}
          className="rounded-lg"
        >
          {!isPendingGetCategory ? (
            <Controller
              name="isFeatured"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Select
                  {...field}
                  label="Featured"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Select Featured Event"
                  defaultSelectedKeys={[`${currentIsFeatured}`]}
                  onChange={(e) => handleChangeIsFeatured(e.target.value)}
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
            <div className="h-14 w-full" />
          )}
        </Skeleton>
      </div>
    </div>
  );
};

export default EventFilter;
