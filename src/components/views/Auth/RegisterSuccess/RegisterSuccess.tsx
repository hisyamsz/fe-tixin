import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  const router = useRouter();

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
          src="/images/illustration/authentication.svg"
          alt="success"
          width={250}
          height={250}
        />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold text-indigo-500">
            Create Account Success
          </h2>
          <p className="text-xl font-bold text-default-500">
            Check your email for account activation
          </p>
          <Button
            className="mt-4 w-fit border-indigo-500 text-indigo-500"
            variant="bordered"
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

export default RegisterSuccess;
