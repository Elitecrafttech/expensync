"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select";

interface ExpenseData {
  description: string;
  amount: string;
  currency: string;
  category: string;
  date: string;
}

const AddExpensePage: React.FC = () => {
  const [newExpense, setNewExpense] = useState<ExpenseData>({
    description: "",
    amount: "",
    currency: "",
    category: "",
    date: "",
  });

  useEffect(() => {
  const saved = localStorage.getItem("pendingExpense");
  if (saved) {
    setNewExpense(JSON.parse(saved));
    localStorage.removeItem("pendingExpense"); // optional: clear after loading
  }
}, []);


  
  const handleAddExpense = () => {
    console.log("Expense added:", newExpense);
    // navigate or save logic here
  };

  const handleCancel = () => {
    setNewExpense({
      description: "",
      amount: "",
      currency: "",
      category: "",
      date: "",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-start py-10 px-4 transition-colors">
      <Card className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 text-left">
            Add / Edit Expense
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-5 w-full">
          <Input
            placeholder="🧾 What did you spend on?"
            className="w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-400"
            value={newExpense.description}
            onChange={(e) =>
              setNewExpense({ ...newExpense, description: e.target.value })
            }
          />

          <div className="flex gap-2 w-full">
            <Input
              placeholder="Amount"
              inputMode="numeric"
              className="w-1/2 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-400 appearance-none"
              type="number"
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense({ ...newExpense, amount: e.target.value })
              }
            />
            <Select
              value={newExpense.currency}
              onValueChange={(v) =>
                setNewExpense({ ...newExpense, currency: v })
              }
            >
              <SelectTrigger className="w-[150px] bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700">
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="JPY">JPY</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select
            value={newExpense.category}
            onValueChange={(v) =>
              setNewExpense({ ...newExpense, category: v })
            }
          >
            <SelectTrigger className="bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700">
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Bills">Bills</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            className="w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            value={newExpense.date}
            onChange={(e) =>
              setNewExpense({ ...newExpense, date: e.target.value })
            }
          />

          <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
            <Button
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
              onClick={handleAddExpense}
            >
              Add Expense
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddExpensePage;
