import bannerServices from "@/services/banner.service";
import { useQuery } from "@tanstack/react-query";
import {
  LIMIT_BANNER,
  LIMIT_CATEGORY,
  LIMIT_EVENT,
  PAGE_DEFAULT,
} from "@/constants/list.constants";
import eventServices from "@/services/event.service";
import categoryServices from "@/services/category.service";

const useHome = () => {
  const getBanners = async () => {
    let params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;

    const { data } = await bannerServices.getBanners(params);
    return data.data;
  };

  const { data: dataBanner, isLoading: isLoadingBanner } = useQuery({
    queryKey: ["Banners"],
    queryFn: getBanners,
  });

  const currentEventQuery = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true`;

  const getEvents = async (params: string) => {
    const { data } = await eventServices.getEvents(params);
    return data.data;
  };

  const { data: dataFeaturedEvents, isLoading: isLoadingFeaturedEvents } =
    useQuery({
      queryKey: ["FeaturedEvents"],
      queryFn: () => getEvents(`${currentEventQuery}&isFeatured=true`),
    });

  const { data: dataLatestEvents, isLoading: isLoadingLatestEvents } = useQuery(
    {
      queryKey: ["LatestEvents"],
      queryFn: () => getEvents(currentEventQuery),
    },
  );

  const getCategories = async () => {
    let params = `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}`;

    const { data } = await categoryServices.getCategories(params);
    return data.data;
  };

  const { data: dataCategories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
    enabled: true,
  });

  return {
    dataBanner,
    isLoadingBanner,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataCategories,
    isLoadingCategories,
  };
};

export default useHome;
