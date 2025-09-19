import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Member/Transaction";

const MemberTransactionPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      type="member"
      description="List of all transactions"
    >
      <Transaction />
    </DashboardLayout>
  );
};

export default MemberTransactionPage;
