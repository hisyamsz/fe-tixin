import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Event from "@/components/views/Event";
import { FC } from "react";

interface EventPageProps {}

const EventPage: FC<EventPageProps> = ({}) => {
  return (
    <LandingPageLayout title="Event">
      <Event />
    </LandingPageLayout>
  );
};

export default EventPage;
