
"use client";

import { createContext, useContext, useState, useEffect } from "react";

export interface Expense {
  desc: string;
  amount: number;
  currency: string;
  converted: number;
  category: string;
  date: string;   // REQUIRED
}

interface ExpenseContextType {
  expenses: Expense[];
  setExpenses: (exp: Expense[]) => void;
  addExpense: (exp: Omit<Expense, "date">) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) {
      const parsed = JSON.parse(saved);

      // Ensure every expense has a date (important!)
      const fixed = parsed.map((e: any) => ({
        ...e,
        date: e.date ?? new Date().toISOString(),
      }));

      setExpenses(fixed);
    }
  }, []);

  // Add new expense (date auto-added here)
  function addExpense(exp: Omit<Expense, "date">) {
    const newExp: Expense = {
      ...exp,
      date: new Date().toISOString(),   // ALWAYS present
    };

    const updated = [...expenses, newExp];
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  }

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error("useExpenses must be inside ExpenseProvider");
  return ctx;
}
