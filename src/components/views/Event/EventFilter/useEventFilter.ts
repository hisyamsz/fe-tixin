import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const eventFilterSchema = yup.object().shape({
  category: yup.string(),
  isFeatured: yup.string(),
  isOnline: yup.string(),
});

const useEventFilter = () => {
  const { control, reset, watch, getValues, setValue } = useForm({
    resolver: yupResolver(eventFilterSchema),
  });

  const {
    data: dataCategory,
    isSuccess: isSuccessGetCategory,
    isPending: isPendingGetCategory,
  } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
  });

  return {
    control,
    setValue,
    dataCategory,
    isSuccessGetCategory,
    isPendingGetCategory,
  };
};

export default useEventFilter;
