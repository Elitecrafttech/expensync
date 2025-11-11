"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select";
import { useExpenses } from "../context/ExpenseContext";
import { useRouter } from "next/navigation";
import { convert } from "@/lib/exchangeRate";

interface ExpenseData {
  desc: string;
  amount: string;
  currency: string;
  category: string;
  date: string;
}



const AddExpensePage: React.FC = () => {
  const { addExpense } = useExpenses();
  const router = useRouter();

  const [newExpense, setNewExpense] = useState<ExpenseData>({
    desc: "",
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

const handleAddExpense = async () => {
    try {
      // console.log("🔹 AddExpense clicked");
      // console.log("📦 New expense input:", newExpense);

      if (!newExpense.desc || !newExpense.amount || !newExpense.currency) {
        console.warn("⚠️ Missing field:", newExpense);
        return;
      }

      const amountNum = Number(newExpense.amount);
      // console.log("💰 Parsed amount:", amountNum);

      // // ✅ Attempt currency conversion
      // console.log("🌍 Converting currency...", {
      //   from: newExpense.currency,
      //   to: "USD",
      //   amount: amountNum,
      // });

      const converted = await convert(amountNum, newExpense.currency, "USD");
      // console.log("✅ Conversion result from API:", converted);

      const expense = {
        desc: newExpense.desc,
        amount: amountNum,
        currency: newExpense.currency,
        converted: converted ?? 0,
        category: newExpense.category || "Uncategorized",
      };

      // console.log("🧾 Final expense object to add:", expense);

      addExpense(expense);
      // console.log("✅ Expense added successfully to context");

      // ✅ Save to localStorage too (so it's persistent)
      const saved = JSON.parse(localStorage.getItem("expenses") || "[]");
      localStorage.setItem("expenses", JSON.stringify([...saved, expense]));
      console.log("💾 Saved to localStorage");

      // ✅ Redirect
      router.push("/ExpenseDetails");
      // console.log("➡️ Navigated to ExpenseDetailsPage");

      // ✅ Reset state
      setNewExpense({
        desc: "",
        amount: "",
        currency: "",
        category: "",
        date: "",
      });
    } catch (err) {
      console.error("❌ Error adding expense:", err);
    }
  };
  
  // const handleAddExpense = async () => {
  //   if (!newExpense.desc || !newExpense.amount) return;

  // try {
  //   // ✅ convert to USD before saving
  //   const convertedValue = await convert(
  //     Number(newExpense.amount),
  //     newExpense.currency,
  //     "USD"
  //   );

  //   const expense = {
  //     desc: newExpense.desc,
  //     amount: Number(newExpense.amount),
  //     currency: newExpense.currency,
  //     converted: convertedValue,
  //     category: newExpense.category,
  //     date: newExpense.date,
  //   };

  //   // ✅ save in context
  //   addExpense(expense);

  //   // ✅ also save locally for persistence
  //   const existing = JSON.parse(localStorage.getItem("expenses") || "[]");
  //   existing.push(expense);
  //   localStorage.setItem("expenses", JSON.stringify(existing));

  //   // ✅ reset and navigate
  //   setNewExpense({
  //     desc: "",
  //     amount: "",
  //     currency: "",
  //     category: "",
  //     date: "",
  //   });

  //   window.location.href = "/ExpenseDetails";
  // } catch (err) {
  //   console.log("Conversion failed:", err);
  // }

  // //   if (!newExpense.desc || !newExpense.amount || !newExpense.currency) return;

  // // try {
  // //   const amountNum = Number(newExpense.amount);

  // //   // 🔹 Convert to USD using ExchangeRate.host
  // //   const converted = await convert(amountNum, newExpense.currency, "USD");

  // //   addExpense({
  // //     desc: newExpense.desc,
  // //     amount: amountNum,
  // //     currency: newExpense.currency,
  // //     converted,
  // //     category: newExpense.category || "Uncategorized",
  // //   });

  // //   // reset the form
  // //   setNewExpense({
  // //     desc: "",
  // //     amount: "",
  // //     currency: "",
  // //     category: "",
  // //     date: "",
  // //   });

  // //   // ✅ redirect to ExpenseDetailsPage
  // //   router.push("/ExpenseDetails");
  // // } catch (error) {
  // //   console.error("Failed to add expense:", error);
  // //   alert("Failed to convert currency. Please try again.");
  // // }


  //   // if (!newExpense.desc || !newExpense.amount) return;

  //   // const amountNum = Number(newExpense.amount);
  //   // const converted = amountNum; // ✅ (for now, same as amount — can later link to live conversion)

  //   // addExpense({
  //   //   desc: newExpense.desc,
  //   //   amount: amountNum,
  //   //   currency: newExpense.currency || "USD",
  //   //   converted,
  //   //   category: newExpense.category || "Uncategorized",
  //   // });

  //   // setNewExpense({
  //   //   desc: "",
  //   //   amount: "",
  //   //   currency: "",
  //   //   category: "",
  //   //   date: "",
  //   // });
  //   // router.push("/ExpenseDetails");
  // };

  const handleCancel = () => {
    setNewExpense({
      desc: "",
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
            value={newExpense.desc}
            onChange={(e) =>
              setNewExpense({ ...newExpense, desc: e.target.value })
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
