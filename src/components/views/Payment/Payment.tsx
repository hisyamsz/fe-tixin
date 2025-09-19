import React, { FC, useEffect } from "react";
import usePayment from "./usePayment";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

interface PaymentProps {}

const Payment: FC<PaymentProps> = ({}) => {
  const router = useRouter();
  const { order_id, status } = router.query;
  const { mutateUpdateOrderStatus } = usePayment();

  useEffect(() => {
    if (router.isReady) {
      mutateUpdateOrderStatus();
    }
  }, [router.isReady]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/Tixin-Logos.svg"
          alt="Logo"
          width={130}
          height={130}
        />
        <Image
          src={
            status === "success"
              ? "/images/illustration/done.svg"
              : "/images/illustration/denied.svg"
          }
          alt="success"
          width={250}
          height={250}
        />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold capitalize text-primary">
            Payment {status}
          </h2>

          <Button
            className="mt-4 w-fit border-primary text-primary"
            variant="bordered"
            type="button"
            onPress={() => router.push(`/member/transaction/${order_id}`)}
          >
            Check your transaction
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
