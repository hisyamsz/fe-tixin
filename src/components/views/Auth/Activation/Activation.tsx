import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface PropType {
  status: "success" | "failed";
}

const Activation = (props: PropType) => {
  const router = useRouter();
  const { status } = props;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="Logo"
          width={130}
          height={130}
        />
        <Image
          src={
            status === "success"
              ? "/images/illustration/success.svg"
              : "/images/illustration/pending.svg"
          }
          alt="success"
          width={350}
          height={350}
        />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold text-danger-500">
            {status === "success" ? "Activation Success" : " Activation Failed"}
          </h2>
          <p className="text-xl font-bold text-default-500">
            {status === "success"
              ? "Thank you for register account in Acara"
              : "Confirmation code is invalid"}
          </p>
          <Button
            className="mt-4 w-fit"
            variant="bordered"
            color="danger"
            type="button"
            onClick={() => router.push("/")}
          >
            Back To Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Activation;
