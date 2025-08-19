import { ToasterContext } from "@/contexts/ToasterContext";
import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/Ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const addTicketSchema = yup.object().shape({
  name: yup.string().required("Please input name"),
  price: yup.string().required("Please input price"),
  description: yup.string().required("Please input description"),
  quantity: yup.string().required("Please input quantity"),
});

const useAddTicketModal = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);
  const {
    control,
    handleSubmit: handleSubmitFormAddTicket,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addTicketSchema),
  });

  const addTicket = async (payload: ITicket) => {
    const res = await ticketServices.addTicket(payload);
    return res;
  };

  const {
    mutate: mutateAddTicket,
    isPending: isPendingAddTicket,
    isSuccess: isSuccessAddTicket,
  } = useMutation({
    mutationFn: addTicket,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add ticket",
      });
      reset();
    },
  });

  const handleAddTicket = (data: ITicket) => {
    data.events = `${router.query.id}`;
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);
    mutateAddTicket(data);
  };

  return {
    control,
    errors,
    reset,
    handleAddTicket,
    handleSubmitFormAddTicket,
    isPendingAddTicket,
    isSuccessAddTicket,
  };
};

export default useAddTicketModal;
