import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { convertIDR } from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FC, Key, ReactNode, useCallback, useState } from "react";
import { COLUMN_LIST_TICKETS } from "./TicketTab.constant";
import useTicketTab from "./useTicketTab";
import AddTicketModal from "./AddTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";
import UpdateTicketModal from "./UpdateTicketModal";
import { ITicket } from "@/types/Ticket";

interface TicketTabProps {}

const TicketTab: FC<TicketTabProps> = ({}) => {
  const {
    dataTicket,
    isLoadingDataTicket,
    isPendingDataTicket,
    isRefetchingDataTicket,
    refetchTicket,
  } = useTicketTab();

  const disclosureAddTicketModal = useDisclosure();
  const disclosureDeleteTicketModal = useDisclosure();
  const disclosureUpdateTicketModal = useDisclosure();

  const [selectedDataTicket, setSelectedDataTicket] = useState<ITicket | null>(
    null,
  );

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "price":
          return `${convertIDR(cellValue as number)}`;
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => {
                setSelectedDataTicket(ticket as ITicket);
                disclosureUpdateTicketModal.onOpen();
              }}
              onPressButtonDelete={() => {
                setSelectedDataTicket(ticket as ITicket);
                disclosureDeleteTicketModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <section>
      <Card className="w-full px-4 py-2">
        <CardHeader className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <h1 className="w-full text-xl font-bold">Event Ticket</h1>
            <p className="w-full text-sm text-default-400">
              Manage ticket of this event
            </p>
          </div>
          <Button color="primary" onPress={disclosureAddTicketModal.onOpen}>
            Add New Ticket
          </Button>
        </CardHeader>
        <CardBody className="pt-0">
          <DataTable
            columns={COLUMN_LIST_TICKETS}
            data={dataTicket || []}
            emptyContent="Ticket is empty"
            isLoading={
              isLoadingDataTicket ||
              isPendingDataTicket ||
              isRefetchingDataTicket
            }
            renderCell={renderCell}
            totalPages={1}
            showLimit={false}
            showSearch={false}
          />
        </CardBody>
      </Card>
      <AddTicketModal
        {...disclosureAddTicketModal}
        refetchTicket={refetchTicket}
      />
      <DeleteTicketModal
        {...disclosureDeleteTicketModal}
        refetchTicket={refetchTicket}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
      />
      <UpdateTicketModal
        {...disclosureUpdateTicketModal}
        refetchTicket={refetchTicket}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
      />
    </section>
  );
};

export default TicketTab;
