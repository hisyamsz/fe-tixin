import { Skeleton } from "@nextui-org/react";
import Image from "next/image";
import React, { FC } from "react";

interface HomeBannerProps {
  isLoading: boolean;
  src: string;
}

const HomeBanner: FC<HomeBannerProps> = ({ src, isLoading }) => {
  return (
    <div className="mx-4 mb-16">
      <Skeleton
        isLoaded={isLoading}
        className="h-[20vw] w-full rounded-2xl object-cover object-center"
      >
        <Image
          src={src}
          alt="banner"
          className="h-[20vw] w-full rounded-2xl object-cover object-center"
          width={1920}
          height={800}
        />
      </Skeleton>
    </div>
  );
};

export default HomeBanner;
