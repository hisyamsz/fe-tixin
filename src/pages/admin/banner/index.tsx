import DashboardLayout from "@/components/layouts/DashboardLayout";
import Banner from "@/components/views/Admin/Banner";

const AdminBannerPage = () => {
  return (
    <DashboardLayout
      title="Banner"
      type="admin"
      description="List of all banners, create new banner, and manage existing banners"
    >
      <Banner />
    </DashboardLayout>
  );
};

export default AdminBannerPage;
