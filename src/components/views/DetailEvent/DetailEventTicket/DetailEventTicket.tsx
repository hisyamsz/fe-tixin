import { ICart, ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  Chip,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { FC, Fragment } from "react";

interface DetailEventTicketProps {
  key?: string;
  ticket?: ITicket;
  cart: ICart;
  handldeAddToCart: () => void;
}

const DetailEventTicket: FC<DetailEventTicketProps> = ({
  key,
  ticket,
  cart,
  handldeAddToCart,
}) => {
  const session = useSession();

  return (
    <Card key={key} className="px-4 pb-4">
      <Fragment>
        <Accordion>
          <AccordionItem
            key={ticket?._id}
            aria-label={ticket?.name}
            className="border-b-2 border-dashed"
            title={
              <div className="flex items-center gap-2 pb-0">
                <h2 className="text-2xl font-bold text-foreground-800">
                  {ticket?.name}
                </h2>
                {Number(ticket?.quantity) > 0 ? (
                  <Chip size="sm" variant="bordered" color="success">
                    Available
                  </Chip>
                ) : (
                  <Chip size="sm" variant="bordered" color="danger">
                    Sold Out
                  </Chip>
                )}
              </div>
            }
          >
            <p>{ticket?.description}</p>
          </AccordionItem>
        </Accordion>
        <div className="mt-4 flex items-center justify-between px-2">
          <h2 className="text-lg font-semibold text-foreground-700">
            {convertIDR(Number(ticket?.price))}
          </h2>
          {session.status === "authenticated" && (
            <Button
              color="warning"
              variant="bordered"
              className="font-semibold hover:font-semibold disabled:opacity-30"
              disabled={cart?.ticket === ticket?._id}
              onPress={handldeAddToCart}
            >
              Add To Cart
            </Button>
          )}
        </div>
      </Fragment>
    </Card>
  );
};

export default DetailEventTicket;
