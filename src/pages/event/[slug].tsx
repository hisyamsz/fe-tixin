import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import DetailEvent from "@/components/views/DetailEvent";
import { FC } from "react";

interface DetailEventPageProps {}

const DetailEventPage: FC<DetailEventPageProps> = ({}) => {
  return (
    <LandingPageLayout title="Detail Event">
      <DetailEvent />
    </LandingPageLayout>
  );
};

export default DetailEventPage;
