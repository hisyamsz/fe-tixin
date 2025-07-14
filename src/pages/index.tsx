import { Button } from "@nextui-org/react";
import PageHead from "@/components/commons/PageHead";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center gap-10">
      <PageHead title="Acara | Home" />
      <Link href={"/auth/login"}>Login</Link>
      <Link href={"/auth/register"}>Register</Link>
      <Button as={Link} href="/member" variant="bordered" color="primary">
        Dashboard
      </Button>
    </main>
  );
}
