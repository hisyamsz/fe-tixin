import CardEvent from "@/components/ui/CardEvent";
import { IEvent } from "@/types/Event";
import Link from "next/link";
import { FC } from "react";

interface HomeEventListProps {
  dataEvents: IEvent[];
  isLoadingEvents: boolean;
  title: string;
}

const HomeEventList: FC<HomeEventListProps> = ({
  dataEvents,
  isLoadingEvents,
  title,
}) => {
  return (
    <section className="mb-16">
      <div className="mb-2 flex items-center justify-between px-6 lg:px-0">
        <h2 className="text-2xl font-bold text-primary">{title}</h2>
        <Link
          href="/event"
          className="font-semibold text-foreground-500 hover:underline"
        >
          See More
        </Link>
      </div>
      <div className="grid auto-cols-[20rem] grid-flow-col gap-6 overflow-x-auto pb-6 pt-2 lg:grid-cols-4 lg:py-1">
        {!isLoadingEvents
          ? dataEvents?.map((event) => (
              <CardEvent
                key={`card-event-${event._id}`}
                event={event}
                className="first:ml-4 last:mr-4 lg:first:ml-1 lg:last:mr-1"
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <CardEvent
                key={`card-event-loading${index}`}
                className="first:ml-4 last:mr-4 lg:first:ml-1 lg:last:mr-1"
                isLoading={isLoadingEvents}
              />
            ))}
      </div>
    </section>
  );
};

export default HomeEventList;
