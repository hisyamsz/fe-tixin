import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Chip, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_BANNERS } from "./Banner.constant";
import useBanner from "./useBanner";
import AddBannerModal from "./AddBannerModal";
import DeleteBannerModal from "./DeleteBannerModal";

interface BannerProps {}

const Banner: FC<BannerProps> = ({}) => {
  const { push, isReady, query } = useRouter();

  const {
    dataBanner,
    isLoadingBanner,
    isRefetchingBanner,
    refetchBanner,
    selectedId,
    setSelectedId,
  } = useBanner();

  const disclosureAddBannerModal = useDisclosure();
  const disclosureDeleteBannerModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  const renderCell = useCallback(
    (banner: Record<string, unknown>, columnKey: Key) => {
      const cellValue = banner[columnKey as keyof typeof banner];

      switch (columnKey) {
        case "image":
          return (
            <Image
              src={`${cellValue}`}
              alt="image"
              width={300}
              height={200}
              className="aspect-video w-44 rounded-lg object-cover"
            />
          );
        case "isShow":
          return (
            <Chip
              color={cellValue ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {cellValue ? "Published" : "Not Published"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/banner/${banner._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${banner._id}`);
                disclosureDeleteBannerModal.onOpen();
              }}
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
          buttonTopContentLabel="Create Banner"
          columns={COLUMN_LIST_BANNERS}
          data={dataBanner?.data || []}
          emptyContent="Banner is empty"
          isLoading={isLoadingBanner || isRefetchingBanner}
          onClickButtonTopContent={disclosureAddBannerModal.onOpen}
          renderCell={renderCell}
          totalPages={dataBanner?.pagination.totalPage}
        />
      )}
      <AddBannerModal
        {...disclosureAddBannerModal}
        refetchBanner={refetchBanner}
      />
      <DeleteBannerModal
        {...disclosureDeleteBannerModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchBanner={refetchBanner}
      />
    </section>
  );
};

export default Banner;
