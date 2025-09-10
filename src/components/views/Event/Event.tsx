import { FC, useEffect } from "react";
import useEvent from "./useEvent";
import CardEvent from "@/components/ui/CardEvent";
import { IEvent } from "@/types/Event";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import EventFooter from "./EventFooter";
import EventFilter from "./EventFilter";
import Image from "next/image";

interface EventProps {}

const Event: FC<EventProps> = ({}) => {
  const router = useRouter();
  const { setUrlExplore } = useChangeUrl();
  const { dataEvents, isLoadingEvents, isRefetchingEvents } = useEvent();

  useEffect(() => {
    if (router.isReady) {
      setUrlExplore();
    }
  }, [router.isReady]);

  return (
    <div className="flex w-full flex-col justify-center gap-6 px-4 lg:flex-row lg:px-0">
      <EventFilter />
      <div className="min-h-[70vh] w-full flex-1">
        <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!isLoadingEvents && !isRefetchingEvents
            ? dataEvents?.data?.map((event: IEvent) => (
                <CardEvent key={`card-event-${event._id}`} event={event} />
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <CardEvent
                  key={`card-event-loading-${index}`}
                  isLoading={true}
                />
              ))}
        </div>
        {!isLoadingEvents &&
          !isRefetchingEvents &&
          dataEvents?.data?.length < 1 && (
            <div className="flex w-full flex-col items-center justify-center gap-8 py-20">
              <Image
                src="images/illustration/no-data.svg"
                alt="no-data"
                width={200}
                height={200}
              />
              <h2 className="text-center text-xl font-semibold text-primary-800">
                Event is empty
              </h2>
            </div>
          )}
        {!isLoadingEvents && dataEvents?.data?.length > 0 && (
          <EventFooter totalPages={dataEvents?.pagination?.totalPage} />
        )}
      </div>
    </div>
  );
};

export default Event;
