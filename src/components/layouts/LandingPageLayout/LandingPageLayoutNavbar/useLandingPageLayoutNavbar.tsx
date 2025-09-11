import { DELAY, LIMIT_EVENT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import authServices from "@/services/auth.service";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const useLandingPageLayoutNavbar = () => {
  const router = useRouter();
  const debounce = useDebounce();
  const [search, setSearch] = useState<string>("");

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: router.isReady,
  });

  const getEventsSearch = async () => {
    const params = `search=${search}&limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true`;
    const { data } = await eventServices.getEvents(params);
    return data.data;
  };

  const {
    data: dataSearchEvents,
    isLoading: isLoadingSearchEvents,
    isRefetching: isRefetchingSearchEvents,
  } = useQuery({
    queryKey: ["SearchEvents", search],
    queryFn: getEventsSearch,
    enabled: !!search,
  });

  const handleSearchEvent = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => setSearch(e.target.value), DELAY);
  };

  return {
    dataProfile,
    refetchProfile,

    handleSearchEvent,
    dataSearchEvents,
    isLoadingSearchEvents,
    isRefetchingSearchEvents,

    search,
    setSearch,
  };
};

export default useLandingPageLayoutNavbar;
