import React, { FC, useEffect } from "react";
import useLocationTab from "./useLocationTab";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { IEventForm, IRegency } from "@/types/Event";

interface LocationTabProps {
  dataEvent: IEventForm;
  isPendingDataEvent: boolean;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  dataDefaultRegion: string;
  isPendingDefaultRegion: boolean;
  onUpdate: (data: IEventForm) => void;
}

const LocationTab: FC<LocationTabProps> = ({
  dataEvent,
  isPendingDataEvent,
  isPendingUpdate,
  isSuccessUpdate,
  onUpdate,
  dataDefaultRegion,
  isPendingDefaultRegion,
}) => {
  const {
    controlUpdateLocation,
    errorsUpdateLocation,
    handleSubmitUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,

    dataRegion,
    handleSearchRegion,
  } = useLocationTab();

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateLocation("isOnline", `${dataEvent?.isOnline}`);
      setValueUpdateLocation("region", `${dataEvent?.location?.region}`);
      setValueUpdateLocation(
        "latitude",
        `${dataEvent?.location?.coordinates[0]}`,
      );
      setValueUpdateLocation(
        "longitude",
        `${dataEvent?.location?.coordinates[1]}`,
      );
      setValueUpdateLocation("address", `${dataEvent?.location?.address}`);
    }
  }, [dataEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateLocation();
      setValueUpdateLocation("isOnline", `${dataEvent?.isOnline}`);
      setValueUpdateLocation("region", `${dataEvent?.location?.region}`);
      setValueUpdateLocation(
        "latitude",
        `${dataEvent?.location?.coordinates[0]}`,
      );
      setValueUpdateLocation(
        "longitude",
        `${dataEvent?.location?.coordinates[1]}`,
      );
      setValueUpdateLocation("address", `${dataEvent?.location?.address}`);
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Location</h1>
        <p className="w-full text-sm text-default-400">
          Manage location of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateLocation(onUpdate)}
        >
          <Skeleton
            isLoaded={!!dataEvent && !isPendingDataEvent}
            className="rounded-lg"
          >
            {!isPendingDataEvent ? (
              <Controller
                name="isOnline"
                control={controlUpdateLocation}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Type"
                    labelPlacement="outside"
                    variant="bordered"
                    isInvalid={errorsUpdateLocation.isOnline !== undefined}
                    errorMessage={errorsUpdateLocation.isOnline?.message}
                    disallowEmptySelection
                    defaultSelectedKeys={[
                      dataEvent?.isOnline ? "true" : "false",
                    ]}
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
              <div className="h-16 w-full" />
            )}
          </Skeleton>

          <Skeleton
            isLoaded={!!dataEvent?.location?.coordinates[0]}
            className="rounded-lg"
          >
            <Controller
              name="latitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  errorMessage={errorsUpdateLocation.latitude?.message}
                  isInvalid={errorsUpdateLocation.latitude !== undefined}
                  label="Latitude"
                  labelPlacement="outside"
                  type="text"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={!!dataEvent?.location?.coordinates[1]}
            className="rounded-lg"
          >
            <Controller
              name="longitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  errorMessage={errorsUpdateLocation.longitude?.message}
                  isInvalid={errorsUpdateLocation.longitude !== undefined}
                  label="Longitude"
                  labelPlacement="outside"
                  type="text"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={!!dataEvent?.location?.region && !isPendingDefaultRegion}
            className="rounded-lg"
          >
            {!isPendingDefaultRegion ? (
              <Controller
                name="region"
                control={controlUpdateLocation}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    defaultInputValue={dataDefaultRegion}
                    defaultItems={dataRegion?.data.data || []}
                    label="City"
                    labelPlacement="outside"
                    variant="bordered"
                    onInputChange={(search) => handleSearchRegion(search)}
                    isInvalid={errorsUpdateLocation.region !== undefined}
                    errorMessage={errorsUpdateLocation.region?.message}
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
            ) : (
              <div className="h-16 w-full" />
            )}
          </Skeleton>

          <Skeleton
            isLoaded={!!dataEvent?.location?.address}
            className="rounded-lg"
          >
            <Controller
              name="address"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Address"
                  labelPlacement="outside"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errorsUpdateLocation.address !== undefined}
                  errorMessage={errorsUpdateLocation.address?.message}
                />
              )}
            />
          </Skeleton>

          <Button
            type="submit"
            color="primary"
            className="mt-2 disabled:bg-default-500"
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
    </Card>
  );
};

export default LocationTab;
