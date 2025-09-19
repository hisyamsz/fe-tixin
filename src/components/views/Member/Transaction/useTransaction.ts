import useChangeUrl from "@/hooks/useChangeUrl";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTransaction = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getPaymentHistory = async () => {
    const params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;
    const { data } = await orderServices.getMemberOrder(params);

    return data;
  };

  const {
    data: dataTransactions,
    isLoading: isLoadingTransactions,
    isRefetching: isRefetchingTransactions,
  } = useQuery({
    queryKey: ["MemberTransaction", currentLimit, currentPage, currentSearch],
    queryFn: getPaymentHistory,
    enabled: router.isReady && !!currentLimit && !!currentPage,
  });

  return {
    dataTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
  };
};

export default useTransaction;
