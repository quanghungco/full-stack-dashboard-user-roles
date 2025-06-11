import { useState as useStateReact } from 'react';
import ReactToPrint from 'react-to-print';

"use client";

// Removed duplicate Transaction type to avoid shadowing the correct one below

type Student = {
  id: string;
  name: string;
  totalBill: number;
  paid: number;
};

type Transaction = {
  id: number;
  date: string;
  account: string;
  description: string;
  amount: number;
  type: "Income" | "Expense";
  studentId?: string;
};

const studentsData: Student[] = [
  { id: "1", name: "John Doe", totalBill: 1000, paid: 0 },
  { id: "2", name: "Jane Smith", totalBill: 1200, paid: 0 },
  { id: "3", name: "Alice Johnson", totalBill: 900, paid: 0 },
];

const accounts = [
  "Cash",
  "Bank",
  "Tuition Fees",
  "Salaries",
  "Supplies",
  "Utilities",
  "Other",
];

export default function AccountantPage() {
  const [students, setStudents] = useState<Student[]>(studentsData);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [receipt, setReceipt] = useState<Transaction | null>(null);
  const [voucher, setVoucher] = useState<Transaction | null>(null);

  // Fee Payment Form
  const [paymentForm, setPaymentForm] = useState({
    studentId: "",
    amount: "",
    date: "",
  });

  // Expense Voucher Form
  const [voucherForm, setVoucherForm] = useState({
    account: "",
    description: "",
    amount: "",
    date: "",
  });

  const receiptRef = useRef<HTMLDivElement>(null);

  // Example backend endpoint
  const BACKEND_URL = "http://localhost:4000/api/transactions";

  // Update handlePayment to send data to backend
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.id === paymentForm.studentId);
    if (!student) return;

    const amountNum = Number(paymentForm.amount);

    // Update student's paid amount locally
    setStudents((prev) =>
      prev.map((s) =>
        s.id === student.id
          ? { ...s, paid: s.paid + amountNum }
          : s
      )
    );

    // Record transaction
    const txn: Transaction = {
      id: Date.now(),
      date: paymentForm.date,
      account: "Tuition Fees",
      description: `Fee payment by ${student.name}`,
      amount: amountNum,
      type: "Income",
      studentId: student.id,
    };
    setTransactions((prev) => [...prev, txn]);
    setReceipt(txn);
    setPaymentForm({ studentId: "", amount: "", date: "" });

    // Send to backend
    try {
      await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(txn),
      });
    } catch (err) {
      alert("Failed to save transaction to backend.");
    }
  };

  // Handle Expense Voucher
  const handleVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(voucherForm.amount);
    const txn: Transaction = {
      id: Date.now(),
      date: voucherForm.date,
      account: voucherForm.account,
      description: voucherForm.description,
      amount: amountNum,
      type: "Expense",
    };
    setTransactions((prev) => [...prev, txn]);
    setVoucher(txn);
    setVoucherForm({ account: "", description: "", amount: "", date: "" });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Accountant Dashboard</h1>

      {/* Fee Payment Form */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Record Fee Payment</h2>
        <form onSubmit={handlePayment} className="flex flex-wrap gap-4 items-end">
          <select
            name="studentId"
            value={paymentForm.studentId}
            onChange={e => setPaymentForm(f => ({ ...f, studentId: e.target.value }))}
            required
            className="p-2 border rounded"
          >
            <option value="">Select Student</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} (Owes ${s.totalBill - s.paid})
              </option>
            ))}
          </select>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={paymentForm.amount}
            onChange={e => setPaymentForm(f => ({ ...f, amount: e.target.value }))}
            required
            min={1}
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="date"
            value={paymentForm.date}
            onChange={e => setPaymentForm(f => ({ ...f, date: e.target.value }))}
            required
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            Generate Receipt
          </button>
        </form>
        {receipt && (
          <div>
            <div ref={receiptRef} className="mt-4 p-4 border rounded bg-green-50">
              <h3 className="font-bold mb-2">Receipt</h3>
              <div>Date: {receipt.date}</div>
              <div>Student: {students.find(s => s.id === receipt.studentId)?.name}</div>
              <div>Amount Paid: ${receipt.amount}</div>
              <div>Description: {receipt.description}</div>
              <div>Receipt No: {receipt.id}</div>
            <ReactToPrint
              trigger={() => (
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Print Receipt
                </button>
              )}
              content={() => receiptRef.current}
            />
            />
          </div>
        )}
      </div>

      {/* Expense Voucher Form */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Record Expense / Payment Voucher</h2>
        <form onSubmit={handleVoucher} className="flex flex-wrap gap-4 items-end">
          <select
            name="account"
            value={voucherForm.account}
            onChange={e => setVoucherForm(f => ({ ...f, account: e.target.value }))}
            required
            className="p-2 border rounded"
          >
            <option value="">Select Account</option>
            {accounts.map(acc => (
              <option key={acc} value={acc}>{acc}</option>
            ))}
          </select>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={voucherForm.description}
            onChange={e => setVoucherForm(f => ({ ...f, description: e.target.value }))}
            required
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={voucherForm.amount}
            onChange={e => setVoucherForm(f => ({ ...f, amount: e.target.value }))}
            required
            min={1}
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="date"
            value={voucherForm.date}
            onChange={e => setVoucherForm(f => ({ ...f, date: e.target.value }))}
            required
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Generate Voucher
          </button>
        </form>
        {voucher && (
          <div className="mt-4 p-4 border rounded bg-blue-50">
            <h3 className="font-bold mb-2">Payment Voucher</h3>
            <div>Date: {voucher.date}</div>
            <div>Account: {voucher.account}</div>
            <div>Amount: ${voucher.amount}</div>
            <div>Description: {voucher.description}</div>
            <div>Voucher No: {voucher.id}</div>
          </div>
        )}
      </div>

      {/* Students Bill Table */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Students Outstanding Bills</h2>
        <table className="min-w-full border text-sm mb-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-2 py-1">Student</th>
              <th className="border px-2 py-1">Total Bill</th>
              <th className="border px-2 py-1">Paid</th>
              <th className="border px-2 py-1">Outstanding</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td className="border px-2 py-1">{s.name}</td>
                <td className="border px-2 py-1">${s.totalBill}</td>
                <td className="border px-2 py-1">${s.paid}</td>
                <td className="border px-2 py-1">${s.totalBill - s.paid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* All Transactions Table */}
      <h2 className="text-lg font-semibold mb-2">All Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Account</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Type</th>
              <th className="border px-2 py-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">
                  No transactions recorded.
                </td>
              </tr>
            ) : (
              transactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="border px-2 py-1">{txn.date}</td>
                  <td className="border px-2 py-1">{txn.account}</td>
                  <td className="border px-2 py-1">{txn.description}</td>
                  <td className={`border px-2 py-1 font-semibold ${txn.type === "Income" ? "text-green-600" : "text-red-600"}`}>
                    {txn.type}
                  </td>
                  <td className="border px-2 py-1">
                    {txn.type === "Expense" ? "-" : "+"}${txn.amount.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function useState<T>(initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  return useStateReact<T>(initialValue);
}
function useState<T>(studentsData: Student[]): [any, any] {
  throw new Error("Function not implemented.");
}
function useRef<T>(initialValue: T | null): { current: T | null } {
  return useStateReact({ current: initialValue })[0];
}

