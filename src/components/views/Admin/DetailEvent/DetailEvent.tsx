import { Tab, Tabs } from "@nextui-org/react";
import { FC } from "react";
import InfoTab from "./InfoTab";
import useDetailEvent from "./useDetailEvent";
import CoverTab from "./CoverTab";
import LocationTab from "./LocationTab";
import TicketTab from "./TicketTab";

interface DetailEventProps {}

const DetailEvent: FC<DetailEventProps> = ({}) => {
  const {
    dataEvent,
    isPendingDataEvent,

    handleUpdateEvent,
    isPendingUpdateEvent,
    isSuccessUpdateEvent,

    handleUpdateInfo,
    handleUpdateLocation,

    dataDefaultRegion,
    isPendingDefaultRegion,
  } = useDetailEvent();

  return (
    <Tabs aria-label="Options">
      <Tab key="cover" title="Cover">
        <CoverTab
          currentBanner={dataEvent?.banner}
          onUpdate={handleUpdateEvent}
          isPendingUpdate={isPendingUpdateEvent}
          isSuccessUpdate={isSuccessUpdateEvent}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataEvent={dataEvent}
          onUpdate={handleUpdateInfo}
          isPendingDataEvent={isPendingDataEvent}
          isPendingUpdate={isPendingUpdateEvent}
          isSuccessUpdate={isSuccessUpdateEvent}
        />
      </Tab>
      <Tab key="location" title="Location">
        <LocationTab
          dataEvent={dataEvent}
          isPendingDataEvent={isPendingDataEvent}
          dataDefaultRegion={dataDefaultRegion?.name}
          onUpdate={handleUpdateLocation}
          isPendingUpdate={isPendingUpdateEvent}
          isSuccessUpdate={isSuccessUpdateEvent}
          isPendingDefaultRegion={isPendingDefaultRegion}
        />
      </Tab>
      <Tab key="ticket" title="Ticket">
        <TicketTab />
      </Tab>
    </Tabs>
  );
};

export default DetailEvent;
