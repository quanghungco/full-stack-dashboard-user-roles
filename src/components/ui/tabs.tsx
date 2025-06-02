import React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => (
  <div
    className={`bg-white rounded shadow p-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...props }) => (
  <div className={`mb-2 font-bold text-lg ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...props }) => (
  <div className={`text-xl font-semibold ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...props }) => (
  <div className={`mt-2 ${className}`} {...props}>
    {children}
  </div>
);

import { createContext, useContext, useState, ReactNode } from "react";

// Context to share active tab value
type TabsContextType = {
  value: string;
  setValue: (value: string) => void;
};
const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Tabs root component
type TabsProps = {
  defaultValue: string;
  children: ReactNode;
  className?: string;
};
export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

// TabsList component
type TabsListProps = {
  children: ReactNode;
  className?: string;
};
export const TabsList: React.FC<TabsListProps> = ({ children, className }) => (
  <div className={`flex border-b ${className ?? ""}`}>{children}</div>
);

// TabsTrigger component
type TabsTriggerProps = {
  value: string;
  children: ReactNode;
  className?: string;
};
export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs");
  const isActive = ctx.value === value;
  return (
    <button
      type="button"
      className={`px-4 py-2 font-semibold border-b-2 focus:outline-none ${
        isActive ? "border-blue-600 text-blue-700" : "border-transparent text-gray-500"
      } ${className ?? ""}`}
      onClick={() => ctx.setValue(value)}
    >
      {children}
    </button>
  );
};

// TabsContent component
type TabsContentProps = {
  value: string;
  children: ReactNode;
  className?: string;
};
export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used within Tabs");
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
};