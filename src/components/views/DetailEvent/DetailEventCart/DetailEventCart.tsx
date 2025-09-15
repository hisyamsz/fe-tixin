import { ICart, ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import { Button, Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { FaCartShopping } from "react-icons/fa6";

interface DetailEventCartProps {
  cart: ICart;
  dataTicketInCart: ITicket;
  onChangeQuantity: (type: "increment" | "decrement") => void;
}

const DetailEventCart: FC<DetailEventCartProps> = ({
  cart,
  dataTicketInCart,
  onChangeQuantity,
}) => {
  return (
    <Card radius="lg" className="border-none p-6 lg:sticky lg:top-[80px]">
      <CardBody className="gap-4">
        <h2 className="text-xl font-semibold text-primary-800">
          <FaCartShopping className="inline-block" /> Cart
        </h2>
        {cart.ticket === "" ? (
          <p className="text-center text-lg text-foreground-500">
            Your cart is empty..
          </p>
        ) : (
          <div className="flex items-center justify-between">
            <div className="font-bold">
              <h4 className="text-lg text-foreground-800">
                {dataTicketInCart.name}
              </h4>
              <p className="text-primary">
                {convertIDR(Number(dataTicketInCart.price) * cart.quantity)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="md"
                variant="bordered"
                className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-800"
                onPress={() => onChangeQuantity("decrement")}
              >
                -
              </Button>
              <span className="text-lg font-bold">{cart.quantity}</span>
              <Button
                size="md"
                variant="bordered"
                className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-800"
                onPress={() => onChangeQuantity("increment")}
              >
                +
              </Button>
            </div>
          </div>
        )}
        <Divider />
      </CardBody>
      <CardFooter>
        <Button
          color="primary"
          disabled={cart.quantity === 0}
          fullWidth
          className="bg-primary-400 disabled:bg-primary-200"
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DetailEventCart;
