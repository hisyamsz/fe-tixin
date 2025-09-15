import React, { FC, useEffect } from "react";
import useDetailEvent from "./useDetailEvent";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  Skeleton,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { convertTime } from "@/utils/date";
import Image from "next/image";
import { ITicket } from "@/types/Ticket";
import DetailEventTicket from "./DetailEventTicket";
import DetailEventCart from "./DetailEventCart";

interface DetailEventProps {}

const DetailEvent: FC<DetailEventProps> = ({}) => {
  const {
    dataDetailEvent,
    isPendingDetailEvent,
    dataTicket,
    isPendingTicket,
    dataTicketInCart,
    cart,
    handleAddToCart,
    handleChangeQuantity,
  } = useDetailEvent();

  return (
    <div className="px-8 md:px-0">
      <Skeleton
        isLoaded={!!dataDetailEvent?.name}
        className="h-6 w-full rounded-lg"
      >
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/event">Event</BreadcrumbItem>
          <BreadcrumbItem>
            {dataDetailEvent?.name.length > 25
              ? `${dataDetailEvent?.name.slice(0, 25)}...`
              : dataDetailEvent?.name}
          </BreadcrumbItem>
        </Breadcrumbs>
      </Skeleton>

      <section className="mt-4 flex flex-col gap-10 lg:flex-row">
        <div className="w-full lg:w-4/6">
          <div className="flex flex-col gap-2">
            <Skeleton isLoaded={!!dataDetailEvent?.name} className="rounded-lg">
              {!isPendingDetailEvent ? (
                <h2 className="text-2xl font-semibold text-primary lg:text-start">
                  {dataDetailEvent?.name}
                </h2>
              ) : (
                <div className="h-12 w-full" />
              )}
            </Skeleton>
            <Skeleton
              isLoaded={
                !!dataDetailEvent?.startDate && !!dataDetailEvent?.endDate
              }
              className="rounded-lg"
            >
              {!isPendingDetailEvent ? (
                <div className="flex items-center gap-2 text-foreground-500">
                  <FaClock width={16} />
                  <p className="w-fit">
                    {convertTime(dataDetailEvent?.startDate)} -{" "}
                    {convertTime(dataDetailEvent?.endDate)}
                  </p>
                </div>
              ) : (
                <div className="h-6 w-full" />
              )}
            </Skeleton>
            <Skeleton
              isLoaded={!!dataDetailEvent && !!dataDetailEvent?.location}
              className="rounded-lg"
            >
              {!isPendingDetailEvent ? (
                <div className="flex items-center gap-2 text-foreground-500">
                  <FaLocationDot width={16} />
                  <p>
                    {dataDetailEvent?.isOnline ? "Online" : "Offline"}{" "}
                    {dataDetailEvent?.isOnline
                      ? ""
                      : `- ${dataDetailEvent?.location?.address}`}
                  </p>
                </div>
              ) : (
                <div className="h-6 w-full" />
              )}
            </Skeleton>
            <Skeleton
              isLoaded={!!dataDetailEvent?.banner && !isPendingDetailEvent}
              className="mb-2 aspect-square w-full rounded-lg lg:w-11/12"
            >
              <Image
                src={dataDetailEvent?.banner}
                alt="cover"
                width={1920}
                height={1080}
                className="mb-2 aspect-auto w-full rounded-lg object-cover"
              />
            </Skeleton>
            <Tabs aria-label="Tab Detail Event" fullWidth>
              <Tab key="Description" title="Description">
                <Skeleton
                  isLoaded={!!dataDetailEvent?.description}
                  className="rounded-lg"
                >
                  <h2 className="mb-2 text-xl font-semibold text-foreground-700">
                    About Event
                  </h2>
                  {!isPendingDetailEvent ? (
                    <p className="text-justify text-foreground-500">
                      {dataDetailEvent?.description}
                    </p>
                  ) : (
                    <div className="h-32 w-full" />
                  )}
                </Skeleton>
              </Tab>
              <Tab key="Ticket" title="Ticket">
                <Skeleton
                  isLoaded={!!dataDetailEvent?.description}
                  className="rounded-lg"
                >
                  <h2 className="mb-2 text-xl font-semibold text-foreground-700">
                    Ticket Event
                  </h2>
                </Skeleton>
                <div className="mt-2 flex flex-col gap-8">
                  {dataTicket?.length > 0 && !isPendingTicket ? (
                    dataTicket?.map((ticket: ITicket) => (
                      <DetailEventTicket
                        key={`ticket-${ticket._id}`}
                        ticket={ticket}
                        cart={cart}
                        handldeAddToCart={() =>
                          handleAddToCart(`${ticket._id}`)
                        }
                      />
                    ))
                  ) : (
                    <Card className="flex w-full flex-col items-center justify-center gap-8 py-10">
                      <Image
                        src="/images/illustration/empty.svg"
                        alt="no-data"
                        width={200}
                        height={200}
                      />
                      <h2 className="text-center text-xl font-semibold text-primary-800">
                        No Ticket Available
                      </h2>
                    </Card>
                  )}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className="w-full lg:w-2/6">
          <DetailEventCart
            cart={cart}
            dataTicketInCart={dataTicketInCart}
            onChangeQuantity={handleChangeQuantity}
          />
        </div>
      </section>
    </div>
  );
};

export default DetailEvent;
