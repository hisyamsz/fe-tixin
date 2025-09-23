import { Button, Card, CardBody, Chip, Skeleton } from "@nextui-org/react";
import React, { FC } from "react";
import useDetailTransaction from "./useDetailTransaction";
import { convertIDR } from "@/utils/currency";
import { QRCodeSVG } from "qrcode.react";
import { convertTime } from "@/utils/date";
import Link from "next/link";
import Script from "next/script";
import environment from "@/config/environment";
import { cn } from "@/utils/cn";

interface DetailTransactionProps {}

const DetailTransaction: FC<DetailTransactionProps> = ({}) => {
  const { dataTransaction, dataEvents, isPendingEvents, dataTickets } =
    useDetailTransaction();

  return (
    <Card className="p-4">
      <CardBody className="gap-8">
        <div className="flex flex-col gap-2">
          <h4 className="font-bold">Order:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm lg:grid-cols-4">
            <div>
              <h5 className="font-semibold">Order ID:</h5>
              <Skeleton
                isLoaded={!!dataTransaction?.orderId}
                className="h-4 rounded-md"
              >
                <p>{dataTransaction?.orderId}</p>
              </Skeleton>
            </div>
            <div>
              <h5 className="font-semibold">Ticket:</h5>
              <Skeleton
                isLoaded={
                  !!dataTickets?.name &&
                  !!dataTickets?.price &&
                  !!dataTransaction?.quantity
                }
                className="h-4 rounded-md"
              >
                <p>
                  {dataTickets?.name} ({convertIDR(Number(dataTickets?.price))})
                  x {dataTransaction?.quantity}
                </p>
              </Skeleton>
            </div>
            <div>
              <h5 className="font-semibold">Total:</h5>
              <Skeleton
                isLoaded={!!dataTransaction?.total}
                className="h-4 rounded-md"
              >
                <p>{convertIDR(Number(dataTransaction?.total))}</p>
              </Skeleton>
            </div>
            <div>
              <h5 className="font-semibold">Status:</h5>
              <Skeleton
                isLoaded={!!dataTransaction?.status}
                className="h-4 rounded-md"
              >
                <Chip
                  color={
                    dataTransaction?.status === "completed"
                      ? "success"
                      : dataTransaction?.status === "pending"
                        ? "warning"
                        : "danger"
                  }
                  size="sm"
                  variant="flat"
                  className="capitalize"
                >
                  {dataTransaction?.status}
                </Chip>
              </Skeleton>
            </div>
          </div>
        </div>
        {dataTransaction?.status === "completed" && (
          <div className="flex flex-col gap-4">
            <h4 className="font-bold">Ticket:</h4>
            <div className="flex flex-col gap-4">
              {dataTransaction?.vouchers.map(
                (voucher: { voucherId: string }) => (
                  <Card
                    key={`voucer-${voucher.voucherId}`}
                    shadow="sm"
                    className="p-4 pt-6 lg:p-2"
                  >
                    <CardBody className="gap-8 lg:flex-row">
                      <div className="mx-auto w-2/3 lg:m-0 lg:w-3/12">
                        <QRCodeSVG
                          value={voucher.voucherId}
                          className="!h-full !w-full"
                        />
                      </div>
                      <div className="h-full space-y-2 font-bold">
                        {!isPendingEvents ? (
                          <h2
                            className={cn("text-2xl text-primary", {
                              "text-lg": dataEvents?.name.length > 50,
                            })}
                          >
                            {dataEvents?.name}
                          </h2>
                        ) : (
                          <Skeleton className="h-8 w-full rounded-md" />
                        )}
                        <div className="text-sm">
                          <p className="text-foreground-500">Date</p>
                          <Skeleton
                            isLoaded={
                              !!dataEvents?.startDate && !!dataEvents?.endDate
                            }
                            className="h-full w-full rounded-md"
                          >
                            <p className="text-primary">
                              {convertTime(dataEvents?.startDate)} -{" "}
                              {convertTime(dataEvents?.endDate)}
                            </p>
                          </Skeleton>
                        </div>
                        <div className="text-sm">
                          <p className="text-foreground-500">Location</p>
                          <Skeleton
                            isLoaded={!!dataEvents?.location}
                            className="h-full w-full rounded-md"
                          >
                            <p className="text-primary">
                              {dataEvents?.isOnline ? "Online" : "Offline"}
                            </p>
                          </Skeleton>

                          {!dataEvents?.isOnline && (
                            <p className="text-foreground-400">
                              {dataEvents?.location?.address}
                            </p>
                          )}
                        </div>
                        {dataEvents?.isOnline && (
                          <Button
                            variant="bordered"
                            color="primary"
                            as={Link}
                            href={dataEvents?.location?.address}
                            className="w-fit"
                          >
                            Join Now
                          </Button>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                ),
              )}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default DetailTransaction;
