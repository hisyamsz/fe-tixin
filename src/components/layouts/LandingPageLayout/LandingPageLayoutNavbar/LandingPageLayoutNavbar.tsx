import {
  Avatar,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Listbox,
  ListboxItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import React, { FC, Fragment, useEffect, useState } from "react";
import { BUTTON_ITEMS, NAVBAR_ITEMS } from "../LandingPageLayout.constant";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { IEvent } from "@/types/Event";

interface LandingPageLayoutNavbarProps {}

const LandingPageLayoutNavbar: FC<LandingPageLayoutNavbarProps> = ({}) => {
  const router = useRouter();
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const {
    dataProfile,
    refetchProfile,
    dataSearchEvents,
    isLoadingSearchEvents,
    isRefetchingSearchEvents,
    handleSearchEvent,
    search,
    setSearch,
  } = useLandingPageLayoutNavbar();

  useEffect(() => {
    if (router.isReady) {
      refetchProfile();
    }
  }, [router.isReady]);

  return (
    <Navbar
      maxWidth="full"
      className="mx-auto max-w-screen-2xl 2xl:container"
      isBordered
      isBlurred={false}
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
    >
      <div className="flex items-center gap-8">
        <NavbarBrand as={Link} href="/">
          <Image
            src="/images/general/Tixin-Logos.svg"
            alt="logo"
            width={100}
            height={50}
            className="cursor-pointer"
          />
        </NavbarBrand>
        <NavbarContent className="hidden lg:flex">
          {NAVBAR_ITEMS.map((item) => (
            <NavbarItem
              key={`nav-${item.label}`}
              as={Link}
              href={item.href}
              className={cn("font-medium text-default-700 hover:text-primary", {
                "font-bold text-primary-500": router.pathname === item.href,
              })}
            >
              {item.label}
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>
      <NavbarContent justify="end">
        <NavbarMenuToggle
          className="lg:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarItem className="hidden lg:relative lg:flex">
          <Input
            isClearable
            className="w-[300px]"
            placeholder="Search Event"
            startContent={<CiSearch />}
            onClear={() => setSearch("")}
            onChange={handleSearchEvent}
          />
          {search !== "" && (
            <Listbox
              items={dataSearchEvents || []}
              className="absolute right-0 top-12 rounded-xl border bg-white"
            >
              {!isRefetchingSearchEvents && !isLoadingSearchEvents ? (
                (item: IEvent) => (
                  <ListboxItem key={item._id} href={`/event/${item.slug}`}>
                    <div className="flex items-center gap-4">
                      <Image
                        src={`${item.banner}`}
                        alt={`${item.name}`}
                        width={100}
                        height={40}
                        className="w-2/5 rounded-md"
                      />
                      <p className="w-3/4 text-wrap font-medium">{item.name}</p>
                    </div>
                  </ListboxItem>
                )
              ) : (
                <ListboxItem key="loading">
                  <Spinner color="primary" size="sm" />
                </ListboxItem>
              )}
            </Listbox>
          )}
        </NavbarItem>

        {session.status === "authenticated" && (
          <NavbarItem className="hidden lg:block">
            <Dropdown>
              <DropdownTrigger title={dataProfile?.fullName}>
                <Avatar
                  isBordered
                  showFallback
                  as="button"
                  src={dataProfile?.profilePicture}
                  className="transition-transform"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="admin"
                  href="/admin/dashboard"
                  className={cn({ hidden: dataProfile?.role !== "admin" })}
                >
                  Admin
                </DropdownItem>
                <DropdownItem key="profile" href="/member/profile">
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="signOut"
                  onPress={() => signOut()}
                  className="text-danger"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
        {session.status === "unauthenticated" && (
          <div className="hidden lg:flex lg:gap-4">
            {BUTTON_ITEMS.map((item) => (
              <NavbarItem key={`button-${item.label}`}>
                <Button
                  as={Link}
                  href={item.href}
                  color="primary"
                  variant={item.variant as ButtonProps["variant"]}
                >
                  {item.label}
                </Button>
              </NavbarItem>
            ))}
          </div>
        )}

        <NavbarMenu className="gap-4">
          {NAVBAR_ITEMS.map((item) => (
            <NavbarMenuItem key={`nav-${item.label}`}>
              <Link
                href={item.href}
                className={cn(
                  "font-medium text-default-700 hover:text-primary",
                  {
                    "font-bold text-primary-500": router.pathname === item.href,
                  },
                )}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {session.status === "authenticated" && (
            <Fragment>
              <NavbarMenuItem
                className={cn(
                  "cursor-pointer font-medium text-default-700 hover:text-primary",
                  {
                    hidden: dataProfile?.role !== "admin",
                  },
                )}
              >
                <Link href="/admin/dashboard">Admin</Link>
              </NavbarMenuItem>
              <NavbarMenuItem className="cursor-pointer font-medium text-default-700 hover:text-primary">
                <Link href="/member/profile">Profile</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Button
                  onPress={() => signOut()}
                  color="danger"
                  variant="bordered"
                  className="mt-2 w-full"
                >
                  Log out
                </Button>
              </NavbarMenuItem>
            </Fragment>
          )}
          {session.status === "unauthenticated" && (
            <Fragment>
              {BUTTON_ITEMS.map((item) => (
                <NavbarMenuItem key={`button-${item.label}`}>
                  <Button
                    as={Link}
                    href={item.href}
                    color="primary"
                    variant={item.variant as ButtonProps["variant"]}
                    fullWidth
                  >
                    {item.label}
                  </Button>
                </NavbarMenuItem>
              ))}
            </Fragment>
          )}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;
