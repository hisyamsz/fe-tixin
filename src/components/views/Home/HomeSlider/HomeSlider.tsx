import { IBanner } from "@/types/Banner";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Skeleton } from "@nextui-org/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

interface HomeSliderProps {
  banners: IBanner[];
  isLoadingBanners: boolean;
}

const HomeSlider: FC<HomeSliderProps> = ({ banners, isLoadingBanners }) => {
  return (
    <div className="mx-4 mb-6 h-[25vw] lg:mx-0 lg:mb-16">
      {!isLoadingBanners ? (
        <Swiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={30}
          loop
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="h-full w-full rounded-2xl"
        >
          {banners?.map((banner) => (
            <SwiperSlide key={banner._id}>
              <Image
                src={`${banner.image}`}
                alt={`${banner.title}`}
                width={1920}
                height={800}
                className="h-[80%] w-full rounded-2xl object-cover object-center lg:h-[90%]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Skeleton className="h-[90%] w-full rounded-2xl" />
      )}
    </div>
  );
};

export default HomeSlider;
