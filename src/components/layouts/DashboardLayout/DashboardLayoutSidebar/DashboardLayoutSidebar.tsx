import { FC, JSX } from "react";
import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import Image from "next/image";
import { useRouter } from "next/router";
import { cn } from "@/utils/cn";
import Link from "next/link";

interface SidebarItems {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface DashboardLayoutSidebarProps {
  sidebarItems: SidebarItems[];
  isOpen: boolean;
}

const DashboardLayoutSidebar: FC<DashboardLayoutSidebarProps> = ({
  sidebarItems,
  isOpen,
}) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
      )}
    >
      <div>
        <div className="flex justify-center">
          <Link href={"/"} className="mb-6 w-32 cursor-pointer">
            <Image
              src="/images/general/Tixin-Logos.svg"
              alt="Logo"
              width={180}
              height={60}
            />
          </Link>
        </div>
        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard Menu"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 text-2xl", {
                "bg-indigo-500 text-white": router.pathname.startsWith(
                  item.href,
                ),
              })}
              startContent={item.icon}
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
              as={Link}
              href={item.href}
            >
              <p className="text-small">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>
      <div className="flex items-center p-1">
        <Button
          fullWidth
          variant="light"
          size="lg"
          className="flex justify-start rounded-lg px-2 py-1.5 text-indigo-500"
          onPress={() => signOut()}
        >
          <CiLogout />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;
