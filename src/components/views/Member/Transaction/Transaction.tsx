import { useRouter } from "next/router";
import { FC, Key, ReactNode, useCallback, useEffect } from "react";
import useTransaction from "./useTransaction";
import { Chip, useDisclosure } from "@nextui-org/react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_TRANSACTION } from "./Transaction.constant";
import { convertIDR } from "@/utils/currency";

interface TransactionProps {}

const Transaction: FC<TransactionProps> = ({}) => {
  const { push, isReady, query } = useRouter();

  const { dataTransactions, isLoadingTransactions, isRefetchingTransactions } =
    useTransaction();

  const disclosureAddBannerModal = useDisclosure();
  const disclosureDeleteBannerModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction];

      switch (columnKey) {
        case "total":
          return `${convertIDR(cellValue as number)}`;
        case "status":
          return (
            <Chip
              color={
                cellValue === "completed"
                  ? "success"
                  : cellValue === "pending"
                    ? "default"
                    : "danger"
              }
              size="sm"
              variant="flat"
            >
              {typeof cellValue === "string" &&
                ((cellValue.charAt(0).toUpperCase() +
                  cellValue.slice(1)) as ReactNode)}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/member/transaction/${transaction._id}`)
              }
              hideButtonDelete
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LIST_TRANSACTION}
          data={dataTransactions?.data || []}
          emptyContent="Transaction is empty"
          isLoading={isLoadingTransactions || isRefetchingTransactions}
          onClickButtonTopContent={disclosureAddBannerModal.onOpen}
          renderCell={renderCell}
          totalPages={dataTransactions?.pagination.totalPage}
        />
      )}

      {/* <DeleteBannerModal
        {...disclosureDeleteBannerModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchBanner={refetchBanner}
      /> */}
    </section>
  );
};

export default Transaction;
