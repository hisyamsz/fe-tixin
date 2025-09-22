import useChangeUrl from "@/hooks/useChangeUrl";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useTransaction = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>("");
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getPaymentHistory = async () => {
    const params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;
    const { data } = await orderServices.getOrders(params);

    return data;
  };

  const {
    data: dataTransactions,
    isLoading: isLoadingTransactions,
    isRefetching: isRefetchingTransactions,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ["AdminTransaction", currentLimit, currentPage, currentSearch],
    queryFn: getPaymentHistory,
    enabled: router.isReady && !!currentLimit && !!currentPage,
  });

  return {
    dataTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
    refetchTransactions,
    selectedId,
    setSelectedId,
  };
};

export default useTransaction;
