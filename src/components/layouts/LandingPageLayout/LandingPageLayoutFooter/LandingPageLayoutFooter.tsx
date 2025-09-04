import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { NAVBAR_ITEMS, SOCIAL_ITEMS } from "../LandingPageLayout.constant";

interface LandingPageLayoutFooterProps {}

const LandingPageLayoutFooter: FC<LandingPageLayoutFooterProps> = ({}) => {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-6 bg-slate-900 px-4 py-10 text-center lg:flex-row lg:text-left xl:p-20">
      <Image
        src="/images/general/Tixin-Logos.svg"
        alt="logo"
        width={200}
        height={100}
        className="w-32 lg:w-52"
      />
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="text-xl text-white">Customer Service</h4>
          <p className="text-gray-600">
            <Link href="mailto:hello@tixin.id" className="hover:text-white">
              hello@tixin.id
            </Link>{" "}
            |{" "}
            <Link href="tel:+621234567809" className="hover:text-white">
              +62 1234 5678 09
            </Link>
          </p>
        </div>
        <div>
          <h4 className="text-xl text-white">Office</h4>
          <p className="text-gray-600">Jl. Ahmad Yani No. 26 Tangerang</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-xl text-white">Menu</h4>
        {NAVBAR_ITEMS.map((item) => (
          <Link
            key={`footer-nav-${item.label}`}
            href={item.href}
            className="text-gray-600 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-8 text-gray-600">
        <div className="flex items-center justify-between gap-8">
          {SOCIAL_ITEMS.map((item) => (
            <Link
              key={`social-media-${item.label}`}
              href={item.href}
              className="text-3xl hover:text-white"
            >
              {item.icon}
            </Link>
          ))}
        </div>
        <p>Copyright &copy; 2025 Tixin. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPageLayoutFooter;
