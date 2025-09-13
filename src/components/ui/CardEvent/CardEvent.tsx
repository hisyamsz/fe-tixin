import { IEvent } from "@/types/Event";
import { cn } from "@/utils/cn";
import { convertTime } from "@/utils/date";
import { Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, Fragment } from "react";

interface CardEventProps {
  className?: string;
  event?: IEvent;
  key?: string;
  isLoading?: boolean;
}

const CardEvent: FC<CardEventProps> = ({
  className,
  event,
  key,
  isLoading,
}) => {
  const router = useRouter();

  return (
    <Card
      key={key}
      className={cn(className, "cursor-pointer")}
      shadow="sm"
      isPressable
      onPress={() => router.push(`event/${event?.slug}`)}
    >
      {!isLoading ? (
        <Fragment>
          <CardBody>
            <Image
              src={`${event?.banner}`}
              alt="cover"
              width={1920}
              height={1080}
              key={key}
              className="aspect-video w-full rounded-lg object-cover"
            />
          </CardBody>
          <CardFooter className="flex-col items-start pt-0 text-left">
            <h2 className="line-clamp-1 text-lg font-bold text-primary">
              {event?.name}
            </h2>
            <p className="mb-2 line-clamp-2">{event?.description}</p>
            <p className="text-sm text-foreground-500">
              {convertTime(`${event?.startDate}`)}
            </p>
          </CardFooter>
        </Fragment>
      ) : (
        <Fragment>
          <CardBody>
            <Skeleton className="mb-2 aspect-video w-full rounded-lg bg-default-300" />
          </CardBody>
          <CardFooter className="flex flex-col items-start space-y-3 pt-0">
            <Skeleton className="h-3 w-3/5 rounded-lg bg-default-200" />
            <Skeleton className="h-3 w-4/5 rounded-lg bg-default-200" />
            <Skeleton className="h-3 w-2/5 rounded-lg bg-default-200" />
          </CardFooter>
        </Fragment>
      )}
    </Card>
  );
};

export default CardEvent;
