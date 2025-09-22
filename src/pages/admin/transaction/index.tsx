import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Admin/Transaction";

const AdminTransactionPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      type="admin"
      description="List of all transactions"
    >
      <Transaction />
    </DashboardLayout>
  );
};

export default AdminTransactionPage;
