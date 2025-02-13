import prisma from "@/lib/prisma";
import FinanceChart from "./FinanceChart";

const FinanceChartContainer = async () => {
  // Get current year
  const currentYear = new Date().getFullYear();

  // Fetch finance records for each month of the current year
  const financeRecords = await prisma.finance.findMany({
    where: {
      createdAt: {
        gte: new Date(currentYear, 0, 1), // Start of current year
        lt: new Date(currentYear + 1, 0, 1), // Start of next year
      },
    },
    select: {
      amount: true,
      type: true, // Assuming you have a 'type' field to distinguish income/expense
      createdAt: true,
    },
  });

  // Initialize monthly data
  const monthlyData = Array.from({ length: 12 }, (_, index) => ({
    name: new Date(currentYear, index).toLocaleString('default', { month: 'short' }),
    income: 0,
    expense: 0,
  }));

  // Calculate monthly totals
  financeRecords.forEach((record) => {
    const month = record.createdAt.getMonth();
    if (record.type === 'INCOME') {
      monthlyData[month].income += record.amount;
    } else if (record.type === 'EXPENSE') {
      monthlyData[month].expense += record.amount;
    }
  });

  return <FinanceChart data={monthlyData} />;
};

export default FinanceChartContainer; 