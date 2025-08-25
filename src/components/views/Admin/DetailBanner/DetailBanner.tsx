import { Tab, Tabs } from "@nextui-org/react";
import React, { FC } from "react";
import ImageTab from "./ImageTab";
import InfoTab from "./InfoTab";
import useDetailBanner from "./useDetailBanner";

interface DetailBannerProps {}

const DetailBanner: FC<DetailBannerProps> = ({}) => {
  const {
    dataBanner,
    isPendingDataBanner,
    handleUpdateBanner,
    isPendingUpdateBanner,
    isSuccessUpdateBanner,
  } = useDetailBanner();

  return (
    <Tabs aria-label="Options">
      <Tab key="image" title="Image">
        <ImageTab
          currentImage={dataBanner?.image}
          onUpdate={handleUpdateBanner}
          isPendingUpdate={isPendingUpdateBanner}
          isSuccessUpdate={isSuccessUpdateBanner}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataBanner={dataBanner}
          onUpdate={handleUpdateBanner}
          isPendingDataBanner={isPendingDataBanner}
          isPendingUpdate={isPendingUpdateBanner}
          isSuccessUpdate={isSuccessUpdateBanner}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailBanner;
