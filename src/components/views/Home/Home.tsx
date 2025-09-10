import { FC } from "react";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import HomeBanner from "./HomeBanner";
import HomeEventList from "./HomeEventList";
import HomeCategoryList from "./HomeCategoryList";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  const {
    dataBanner,
    isLoadingBanner,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataCategories,
    isLoadingCategories,
  } = useHome();

  return (
    <div>
      <HomeSlider banners={dataBanner} isLoadingBanners={isLoadingBanner} />
      <HomeEventList
        title="Featured Events"
        dataEvents={dataFeaturedEvents}
        isLoadingEvents={isLoadingFeaturedEvents}
        urlMore="/event?isFeatured=true"
      />
      <HomeBanner
        src={dataBanner && dataBanner[1].image}
        isLoading={!isLoadingBanner}
      />
      <HomeEventList
        title="Latest Events"
        dataEvents={dataLatestEvents}
        isLoadingEvents={isLoadingLatestEvents}
      />
      <HomeCategoryList
        dataCategories={dataCategories}
        isLoadingCategories={isLoadingCategories}
      />
    </div>
  );
};

export default Home;
