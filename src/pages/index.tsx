import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Home from "@/components/views/Home";
import { FC } from "react";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <LandingPageLayout title="Home">
      <Home />
    </LandingPageLayout>
  );
};

export default HomePage;
