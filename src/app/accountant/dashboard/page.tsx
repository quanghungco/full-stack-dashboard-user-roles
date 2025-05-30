"use client";

import { useState } from "react";

const menu = [
  { label: "Students", key: "students" },
  {
    label: "Accounts",
    key: "accounts",
    submenu: [
      { label: "Bills", key: "bills" },
      { label: "Wallet Deposit", key: "wallet-deposit" },
      { label: "Wallet Transactions", key: "wallet-transactions" },
      { label: "Refund Request", key: "refund-request" },
      { label: "Approve Deposit", key: "approve-deposit" },
      { label: "Pending Deposit", key: "pending-deposit" },
    ],
  },
  {
    label: "Staff",
    key: "staff",
  },
  {
    label: "Payroll",
    key: "payroll",
    submenu: [
      { label: "Payroll", key: "payroll-main" },
      { label: "Payroll Report", key: "payroll-report" },
    ],
  },
];

export default function AccountantDashboard() {
  const [activeMenu, setActiveMenu] = useState<string>("students");
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const handleMenuClick = (key: string, hasSubmenu: boolean) => {
    if (hasSubmenu) {
      setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    } else {
      setActiveMenu(key);
    }
  };

  const handleSubMenuClick = (key: string) => {
    setActiveMenu(key);
  };

  // Placeholder content for each section
  const renderContent = () => {
    switch (activeMenu) {
      case "students":
        return <div>Students List/Management</div>;
      case "bills":
        return <div>Bills Management</div>;
      case "wallet-deposit":
        return <div>Wallet Deposit</div>;
      case "wallet-transactions":
        return <div>Wallet Transactions</div>;
      case "refund-request":
        return <div>Refund Requests</div>;
      case "approve-deposit":
        return <div>Approve Deposit</div>;
      case "pending-deposit":
        return <div>Pending Deposit</div>;
      case "staff":
        return <div>Staff Management</div>;
      case "payroll-main":
        return <div>Payroll Processing</div>;
      case "payroll-report":
        return <div>Payroll Report</div>;
      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6 text-blue-700">Accountant Dashboard</h2>
        <nav>
          <ul>
            {menu.map((item) => (
              <li key={item.key} className="mb-2">
                <button
                  className={`w-full text-left px-2 py-2 rounded hover:bg-blue-50 ${
                    activeMenu === item.key ? "bg-blue-100 font-semibold" : ""
                  }`}
                  onClick={() => handleMenuClick(item.key, !!item.submenu)}
                >
                  {item.label}
                  {item.submenu && (
                    <span className="float-right">{openMenus[item.key] ? "▲" : "▼"}</span>
                  )}
                </button>
                {item.submenu && openMenus[item.key] && (
                  <ul className="ml-4 mt-1">
                    {item.submenu.map((sub) => (
                      <li key={sub.key}>
                        <button
                          className={`w-full text-left px-2 py-1 rounded hover:bg-blue-50 ${
                            activeMenu === sub.key ? "bg-blue-200 font-semibold" : ""
                          }`}
                          onClick={() => handleSubMenuClick(sub.key)}
                        >
                          {sub.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
}