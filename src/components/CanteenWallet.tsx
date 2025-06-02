import React from "react";

type Props = {
  studentId: number | string;
};

const CanteenWallet: React.FC<Props> = ({ studentId }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Canteen Wallet</h2>
      <p>Show canteen wallet balance and transactions for student ID: {studentId}</p>
      {/* Add wallet balance and transaction list here */}
    </div>
  );
};

export default CanteenWallet;