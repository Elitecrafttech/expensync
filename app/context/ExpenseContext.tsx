"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface Expense {
  desc: string;
  amount: number;
  currency: string;
  converted: number;
  category: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({ children }: { children: React.ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { desc: "Lunch", amount: 15, currency: "EUR", converted: 16.2, category: "Food" },
    { desc: "Movie", amount: 12, currency: "USD", converted: 12, category: "Entertainment" },
    { desc: "Flight", amount: 5000, currency: "JPY", converted: 35.4, category: "Travel" },
    { desc: "Groceries", amount: 100, currency: "EUR", converted: 108, category: "Shopping" },
    { desc: "Bills", amount: 50, currency: "GBP", converted: 62.5, category: "Bills" },
  ]);

  // ✅ Load localStorage *after* mount to avoid SSR mismatch
  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  // ✅ Save back to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Expense) => setExpenses((prev) => [...prev, expense]);

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error("useExpenses must be used within ExpenseProvider");
  return context;
};
