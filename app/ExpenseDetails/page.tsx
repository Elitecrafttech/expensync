"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useExpenses } from "../context/ExpenseContext";

interface Expense {
  desc: string;
  amount: number;
  currency: string;
  converted: number;
  category: string;
}
const ExpenseDetailsPage: React.FC = () => {
  const { expenses, setExpenses } = useExpenses();
  // const [expenses, setExpenses] = useState<Expense[]>([
  //   { desc: "Lunch", amount: 15, currency: "EUR", converted: 16.2, category: "Food" },
  //   { desc: "Movie", amount: 12, currency: "USD", converted: 12, category: "Entertainment" },
  //   { desc: "Flight", amount: 5000, currency: "JPY", converted: 35.4, category: "Travel" },
  //   { desc: "Groceries", amount: 100, currency: "EUR", converted: 108, category: "Shopping" },
  //   { desc: "Bills", amount: 50, currency: "GBP", converted: 62.5, category: "Bills" },
  // ]);

  const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "JPY":
      return "¥";
    case "NGN":
      return "₦";
    default:
      return "$";
  }
};


  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Expense | null>(null);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData({ ...expenses[index] });
  };

  const handleSave = () => {
    if (editingIndex !== null && editData) {
      const updated = [...expenses];
      updated[editingIndex] = editData;
      setExpenses(updated);
      setEditingIndex(null);
      setEditData(null);
    }
  };

  const handleDelete = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-start py-10 px-4">
      <Card className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 text-left">
            Expense Details
          </CardTitle>
        </CardHeader>

        <CardContent className="w-full overflow-x-auto">
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Converted</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {expenses.map((exp, i) => (
                <TableRow key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  {editingIndex === i ? (
                    <>
                      <TableCell>
                        <Input
                          value={editData?.desc || ""}
                          onChange={(e) =>
                            setEditData({ ...editData!, desc: e.target.value })
                          }
                        />
                      </TableCell>
                   
                    <TableCell className="flex items-center gap-1">
                        <span>{getCurrencySymbol(editData?.currency || "USD")}</span>
                        <Input
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={editData?.amount || ""}
                            onChange={(e) =>
                            setEditData({
                                ...editData!,
                                amount: Number(e.target.value),
                            })
                            }
                        />
                    </TableCell>

                    <TableCell>
                        <Select
                            value={editData?.currency}
                            onValueChange={(value) =>
                            setEditData({
                                ...editData!,
                                currency: value,
                            })
                            }
                        >
                            <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                            <SelectItem value="JPY">JPY (¥)</SelectItem>
                            <SelectItem value="NGN">NGN (₦)</SelectItem>
                            </SelectContent>
                        </Select>
                    </TableCell>

                      <TableCell>
                        <Input
                          type="number"
                          value={editData?.converted || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData!,
                              converted: Number(e.target.value),
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editData?.category || ""}
                          onChange={(e) =>
                            setEditData({ ...editData!, category: e.target.value })
                          }
                        />
                      </TableCell>
                      <TableCell className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-400 dark:border-gray-600"
                          onClick={() => setEditingIndex(null)}
                        >
                          Cancel
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="text-gray-800 dark:text-gray-100">{exp.desc}</TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-100">
                        {getCurrencySymbol(exp.currency)}
                        {exp.amount}
                    </TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-100">{exp.currency}</TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-100">
                        {getCurrencySymbol("USD")}
                        {exp.converted ? exp.converted.toFixed(2) : "--"}
                    </TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-100">{exp.category}</TableCell>
                      <TableCell className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                          onClick={() => handleEdit(i)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(i)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseDetailsPage;
