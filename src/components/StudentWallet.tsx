import React from "react";

type Props = {
  studentId: number | string;
};

const StudentWallet: React.FC<Props> = ({ studentId }) => {
  // Replace with real data fetching logic
  const walletBalance = 150.0;
  const transactions = [
    { id: 1, date: "2024-06-01", type: "Deposit", amount: 100 },
    { id: 2, date: "2024-06-05", type: "Purchase", amount: -20 },
    { id: 3, date: "2024-06-10", type: "Deposit", amount: 70 },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Student Wallet</h2>
      <div className="mb-2">
        <span className="font-bold">Balance:</span> ${walletBalance.toFixed(2)}
      </div>
      <h3 className="font-semibold mt-4 mb-2">Recent Transactions</h3>
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Type</th>
            <th className="border px-2 py-1">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td className="border px-2 py-1">{txn.date}</td>
              <td className="border px-2 py-1">{txn.type}</td>
              <td className="border px-2 py-1">
                {txn.amount > 0 ? "+" : ""}
                {txn.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentWallet;