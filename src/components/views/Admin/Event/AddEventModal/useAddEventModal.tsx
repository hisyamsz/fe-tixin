import { DELAY } from "@/constants/list.constants";
import { ToasterContext } from "@/contexts/ToasterContext";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateValue } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const addEventSchema = yup.object().shape({
  name: yup.string().required("Please input name"),
  slug: yup.string().required("Please input slug"),
  category: yup.string().required("Please input category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  isPublish: yup.string().required("Please select status"),
  isFeatured: yup.string().required("Please select featured"),
  description: yup.string().required("Please input description"),
  isOnline: yup.string().required("Please select online or offline"),
  region: yup.string().required("Please select location"),
  latitude: yup.string().required("Please input latitude coordinate"),
  longitude: yup.string().required("Please input longitude coordinate"),
  address: yup.string().required("Please input address"),
  banner: yup.mixed<FileList | string>().required("Please input banner"),
});

const useAddEventModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const debounce = useDebounce();
  const {
    isPendingUploadFile,
    isPendingDeleteFile,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitFormAddEvent,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(addEventSchema),
  });

  const preview = watch("banner");
  const fileUrl = getValues("banner");

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("banner", fileUrl);
      }
    });
  };

  const handleDeleteBanner = async (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: true,
  });

  const [searchRegency, setSearchRegency] = useState<string>("");

  const { data: dataRegion } = useQuery({
    queryKey: ["Region", searchRegency],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  const addEvent = async (payload: IEvent) => {
    const result = await eventServices.addEvent(payload);
    return result;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingAddEvent,
    isSuccess: isSuccessAddEvent,
  } = useMutation({
    mutationFn: addEvent,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add event",
      });
      reset();
    },
  });

  const handleAddEvent = (data: IEventForm) => {
    const payload = {
      ...data,
      isFeatured: data.isFeatured === "true",
      isPublish: data.isPublish === "true",
      isOnline: data.isOnline === "true",
      startDate: toDateStandard(data.startDate as DateValue),
      endDate: toDateStandard(data.endDate as DateValue),
      location: {
        region: `${data.region}`,
        address: `${data.address}`,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
      banner: data.banner,
    };

    mutateAddEvent(payload);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitFormAddEvent,
    handleAddEvent,
    isPendingAddEvent,
    isSuccessAddEvent,
    setValue,

    handleUploadBanner,
    isPendingUploadFile,
    handleDeleteBanner,
    isPendingDeleteFile,
    handleOnClose,
    preview,

    dataCategory,
    dataRegion,
    handleSearchRegion,
  };
};

export default useAddEventModal;
