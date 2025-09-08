import PageHead from "@/components/commons/PageHead";
import { FC, Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageLayoutFooter from "./LandingPageLayoutFooter";

interface LandingPageLayoutProps {
  children: ReactNode;
  title: string;
}

const LandingPageLayout: FC<LandingPageLayoutProps> = ({ children, title }) => {
  return (
    <Fragment>
      <PageHead title={title} />
      <LandingPageLayoutNavbar />
      <div className="mx-auto max-w-screen-2xl py-10 2xl:container md:p-6">
        {children}
      </div>
      <LandingPageLayoutFooter />
    </Fragment>
  );
};

export default LandingPageLayout;
