import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, Key, ReactNode, useCallback, useEffect } from "react";

import useChangeUrl from "@/hooks/useChangeUrl";
import useEvent from "./useEvent";
import { COLUMN_LIST_EVENTS } from "./Event.constants";
import DropdownAction from "@/components/commons/DropdownAction";
import AddEventModal from "./AddEventModal";

interface EventProps {}

const Event: FC<EventProps> = ({}) => {
  const { push, isReady, query } = useRouter();

  const {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    refetchEvents,
    selectedId,
    setSelectedId,
  } = useEvent();

  const disclosureAddEventModal = useDisclosure();
  const disclosureDeleteEventModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              src={`${cellValue}`}
              alt="icon"
              width={200}
              height={100}
              className="aspect-video w-44 rounded-lg object-cover"
            />
          );
        case "isPublish":
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
              onPressButtonDetail={() => push(`/admin/event/${event._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${event._id}`);
                disclosureDeleteEventModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Event"
          columns={COLUMN_LIST_EVENTS}
          data={dataEvents?.data || []}
          emptyContent="Event is empty"
          isLoading={isLoadingEvents || isRefetchingEvents}
          onClickButtonTopContent={disclosureAddEventModal.onOpen}
          renderCell={renderCell}
          totalPages={dataEvents?.pagination.totalPage}
        />
      )}
      <AddEventModal
        {...disclosureAddEventModal}
        refetchEvents={refetchEvents}
      />
    </section>
  );
};

export default Event;
