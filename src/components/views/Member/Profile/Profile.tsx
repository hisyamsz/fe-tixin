import { Tab, Tabs } from "@nextui-org/react";
import React, { FC } from "react";
import PictureTab from "./PictureTab";
import useProfile from "./useProfile";
import InfoTab from "./InfoTab";
import SecurityTab from "./SecurityTab";

interface ProfileProps {}

const Profile: FC<ProfileProps> = ({}) => {
  const {
    dataProfile,
    isPendingUpdateProfile,
    isSuccessUpdateProfile,
    handleUpdateProfile,
  } = useProfile();

  return (
    <Tabs aria-label="Options">
      <Tab key="profile" title="Profile">
        <PictureTab
          currentPicture={dataProfile?.profilePicture}
          onUpdate={handleUpdateProfile}
          isPendingUpdate={isPendingUpdateProfile}
          isSuccessUpdate={isSuccessUpdateProfile}
        />
      </Tab>
      <Tab key="profileInfo" title="Info">
        <InfoTab
          dataProfile={dataProfile}
          onUpdate={handleUpdateProfile}
          isPendingUpdate={isPendingUpdateProfile}
          isSuccessUpdate={isSuccessUpdateProfile}
        />
      </Tab>
      <Tab key="updatePassword" title="Security">
        <SecurityTab />
      </Tab>
    </Tabs>
  );
};

export default Profile;
