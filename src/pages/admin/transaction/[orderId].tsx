import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Admin/DetailTransaction";

const AdminDetailTransactionPage = () => {
  return (
    <DashboardLayout
      title="Detail Transaction"
      description="Information for spesific transaction"
      type="admin"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
};

export default AdminDetailTransactionPage;
