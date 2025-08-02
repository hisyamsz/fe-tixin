import { Tab, Tabs } from "@nextui-org/react";
import { FC } from "react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";

interface DetailCategoryProps {}

const DetailCategory: FC<DetailCategoryProps> = ({}) => {
  const {
    dataCategory,
    handleUpdateCategory,
    isPendingUpdateCategory,
    isSuccessUpdateCategory,
  } = useDetailCategory();

  return (
    <Tabs aria-label="Options">
      <Tab key="icon" title="Icon">
        <IconTab
          currentIcon={dataCategory?.icon}
          onUpdate={handleUpdateCategory}
          isPendingUpdate={isPendingUpdateCategory}
          isSuccessUpdate={isSuccessUpdateCategory}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataCategory={dataCategory}
          onUpdate={handleUpdateCategory}
          isPendingUpdate={isPendingUpdateCategory}
          isSuccessUpdate={isSuccessUpdateCategory}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailCategory;
