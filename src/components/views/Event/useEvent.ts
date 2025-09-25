import useChangeUrl from "@/hooks/useChangeUrl";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useEvent = () => {
  const router = useRouter();
  const {
    currentLimit,
    currentPage,
    currentSearch,
    currentCategory,
    currentIsFeatured,
    currentIsOnline,
    handleChangeLimit,
    handleChangePage,
  } = useChangeUrl();

  const getEvents = async () => {
    const params = `limit=${currentLimit}&page=${currentPage}&isPublish=true&category=${currentCategory}&isOnline=${currentIsOnline}&isFeatured=${currentIsFeatured}`;

    const { data } = await eventServices.getEvents(params);
    return data;
  };

  const {
    data: dataEvents,
    isLoading: isLoadingEvents,
    isRefetching: isRefetchingEvents,
    isSuccess: isSuccessGetEvents,
    refetch: refetchEvents,
  } = useQuery({
    queryKey: [
      "Events",
      currentLimit,
      currentPage,
      currentCategory,
      currentIsFeatured,
      currentIsOnline,
    ],
    queryFn: getEvents,
    enabled: router.isReady && !!currentLimit && !!currentPage,
  });

  return {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    isSuccessGetEvents,
    refetchEvents,
    currentLimit,
    currentPage,
    currentSearch,
    handleChangeLimit,
    handleChangePage,
  };
};

export default useEvent;
