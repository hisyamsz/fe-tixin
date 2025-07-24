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
          <h2 className="text-3xl font-bold text-primary">
            {status === "success" ? "Activation Success" : " Activation Failed"}
          </h2>
          <p className="text-xl font-bold text-default-500">
            {status === "success"
              ? "Thank you for register account in Tixin"
              : "Confirmation code is invalid"}
          </p>
          <Button
            className="mt-4 w-fit border-primary text-primary"
            variant="bordered"
            type="button"
            onPress={() =>
              status === "success"
                ? router.push("/auth/login")
                : router.push("/")
            }
          >
            {status === "success" ? "Proceed to login" : "Back To Home"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Activation;
