"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Students", href: "/accountant/dashboard/students" },
  {
    label: "Accounts",
    submenu: [
      { label: "Bills", href: "/accountant/dashboard/accounts/bills" },
      { label: "Wallet Deposit", href: "/accountant/dashboard/accounts/wallet-deposit" },
      { label: "Wallet Transactions", href: "/accountant/dashboard/accounts/wallet-transactions" },
      { label: "Refund Request", href: "/accountant/dashboard/accounts/refund-request" },
      { label: "Approve Deposit", href: "/accountant/dashboard/accounts/approve-deposit" },
      { label: "Pending Deposit", href: "/accountant/dashboard/accounts/pending-deposit" },
    ],
  },
  { label: "Staff", href: "/accountant/dashboard/staff" },
  {
    label: "Payroll",
    submenu: [
      { label: "Payroll", href: "/accountant/dashboard/payroll" },
      { label: "Payroll Report", href: "/accountant/dashboard/payroll/report" },
    ],
  },
];

export default function AccountantDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6 text-blue-700">Accountant Dashboard</h2>
        <nav>
          <ul>
            {menu.map((item) =>
              item.submenu ? (
                <li key={item.label} className="mb-2">
                  <span className="font-semibold">{item.label}</span>
                  <ul className="ml-4 mt-1">
                    {item.submenu.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className={`block px-2 py-1 rounded hover:bg-blue-50 ${
                            pathname === sub.href ? "bg-blue-200 font-semibold" : ""
                          }`}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href} className="mb-2">
                  <Link
                    href={item.href}
                    className={`block px-2 py-2 rounded hover:bg-blue-50 ${
                      pathname === item.href ? "bg-blue-100 font-semibold" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}