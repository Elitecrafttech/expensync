

"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useExpenses } from "../context/ExpenseContext";

const saveToLocalStorage = (list: any[]) => {
  localStorage.setItem("expenses", JSON.stringify(list));
};

// MOCK simple conversion (replace with your real API)
const mockRates: any = {
  USD: 1,
  EUR: 1.08,
  GBP: 1.25,
  JPY: 0.0071,
  NGN: 0.00078,
};

interface Expense {
  desc: string;
  amount: number;
  currency: string;
  converted: number;
  category: string;
  date: string;
}

const ExpenseDetailsPage: React.FC = () => {
  const { expenses, setExpenses } = useExpenses();

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

  // DELETE POPUP
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);

  // Auto-calculate converted price on edit
  useEffect(() => {
    if (editData) {
      const rate = mockRates[editData.currency] || 1;
      const updated = editData.amount * rate;

      setEditData((prev: any) =>
        prev
          ? {
              ...prev,
              converted: Number(updated.toFixed(2)),
            }
          : prev
      );
    }
  }, [editData?.currency, editData?.amount]);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData({ ...expenses[index] });
  };

  const handleSave = () => {
    if (editingIndex !== null && editData) {
      const updated = [...expenses];
      updated[editingIndex] = editData;
      setExpenses(updated);
      saveToLocalStorage(updated);
      setEditingIndex(null);
      setEditData(null);
    }
  };

  const handleDelete = () => {
    if (confirmDeleteIndex !== null) {
     const updated = expenses.filter((_, i) => i !== confirmDeleteIndex);
      setExpenses(updated);
      saveToLocalStorage(updated);
      setConfirmDeleteIndex(null);
    }
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
                          onChange={(e) => setEditData({ ...editData!, desc: e.target.value })}
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
                        <Input type="number" value={editData?.converted || ""} disabled />
                      </TableCell>

                      {/* CATEGORY DROPDOWN */}
                      <TableCell>
                        <Select
                          value={editData?.category}
                          onValueChange={(value) =>
                            setEditData({
                              ...editData!,
                              category: value,
                            })
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Food">Food</SelectItem>
                            <SelectItem value="Entertainment">Entertainment</SelectItem>
                            <SelectItem value="Shopping">Shopping</SelectItem>
                            <SelectItem value="Travel">Travel</SelectItem>
                            <SelectItem value="Bills">Bills</SelectItem>
                          </SelectContent>
                        </Select>
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
                      <TableCell>{exp.desc}</TableCell>
                      <TableCell>
                        {getCurrencySymbol(exp.currency)}
                        {exp.amount}
                      </TableCell>
                      <TableCell>{exp.currency}</TableCell>
                      <TableCell>
                        {getCurrencySymbol("USD")}
                        {exp.converted.toFixed(2)}
                      </TableCell>
                      <TableCell>{exp.category}</TableCell>

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
                          onClick={() => setConfirmDeleteIndex(i)}
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

      {/* DELETE CONFIRM POPUP */}
      {confirmDeleteIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-[320px]">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Are you sure?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Do you really want to delete this expense?
            </p>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setConfirmDeleteIndex(null)}>
                Cancel
              </Button>
              <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={handleDelete}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseDetailsPage;









// "use client";

// import React, { useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent, } from "@/components/ui/card";
// import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, } from "@/components/ui/table";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useExpenses } from "../context/ExpenseContext";

// interface Expense {
//   desc: string;
//   amount: number;
//   currency: string;
//   converted: number;
//   category: string;
// }
// const ExpenseDetailsPage: React.FC = () => {
//   const { expenses, setExpenses } = useExpenses();
//   // const [expenses, setExpenses] = useState<Expense[]>([
//   //   { desc: "Lunch", amount: 15, currency: "EUR", converted: 16.2, category: "Food" },
//   //   { desc: "Movie", amount: 12, currency: "USD", converted: 12, category: "Entertainment" },
//   //   { desc: "Flight", amount: 5000, currency: "JPY", converted: 35.4, category: "Travel" },
//   //   { desc: "Groceries", amount: 100, currency: "EUR", converted: 108, category: "Shopping" },
//   //   { desc: "Bills", amount: 50, currency: "GBP", converted: 62.5, category: "Bills" },
//   // ]);

//   const getCurrencySymbol = (currency: string) => {
//   switch (currency) {
//     case "USD":
//       return "$";
//     case "EUR":
//       return "€";
//     case "GBP":
//       return "£";
//     case "JPY":
//       return "¥";
//     case "NGN":
//       return "₦";
//     default:
//       return "$";
//   }
// };


//   const [editingIndex, setEditingIndex] = useState<number | null>(null);
//   const [editData, setEditData] = useState<Expense | null>(null);

//   const handleEdit = (index: number) => {
//     setEditingIndex(index);
//     setEditData({ ...expenses[index] });
//   };

//   const handleSave = () => {
//     if (editingIndex !== null && editData) {
//       const updated = [...expenses];
//       updated[editingIndex] = editData;
//       setExpenses(updated);
//       setEditingIndex(null);
//       setEditData(null);
//     }
//   };

//   const handleDelete = (index: number) => {
//     setExpenses(expenses.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-start py-10 px-4">
//       <Card className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
//         <CardHeader>
//           <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 text-left">
//             Expense Details
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="w-full overflow-x-auto">
//           <Table className="w-full text-sm">
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Amount</TableHead>
//                 <TableHead>Currency</TableHead>
//                 <TableHead>Converted</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead className="text-center">Actions</TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {expenses.map((exp, i) => (
//                 <TableRow key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
//                   {editingIndex === i ? (
//                     <>
//                       <TableCell>
//                         <Input
//                           value={editData?.desc || ""}
//                           onChange={(e) =>
//                             setEditData({ ...editData!, desc: e.target.value })
//                           }
//                         />
//                       </TableCell>
                   
//                     <TableCell className="flex items-center gap-1">
//                         <span>{getCurrencySymbol(editData?.currency || "USD")}</span>
//                         <Input
//                             type="number"
//                             inputMode="numeric"
//                             pattern="[0-9]*"
//                             value={editData?.amount || ""}
//                             onChange={(e) =>
//                             setEditData({
//                                 ...editData!,
//                                 amount: Number(e.target.value),
//                             })
//                             }
//                         />
//                     </TableCell>

//                     <TableCell>
//                         <Select
//                             value={editData?.currency}
//                             onValueChange={(value) =>
//                             setEditData({
//                                 ...editData!,
//                                 currency: value,
//                             })
//                             }
//                         >
//                             <SelectTrigger className="w-[100px]">
//                             <SelectValue placeholder="Currency" />
//                             </SelectTrigger>
//                             <SelectContent>
//                             <SelectItem value="USD">USD ($)</SelectItem>
//                             <SelectItem value="EUR">EUR (€)</SelectItem>
//                             <SelectItem value="GBP">GBP (£)</SelectItem>
//                             <SelectItem value="JPY">JPY (¥)</SelectItem>
//                             <SelectItem value="NGN">NGN (₦)</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </TableCell>

//                       <TableCell>
//                         <Input
//                           type="number"
//                           value={editData?.converted || ""}
//                           onChange={(e) =>
//                             setEditData({
//                               ...editData!,
//                               converted: Number(e.target.value),
//                             })
//                           }
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Input
//                           value={editData?.category || ""}
//                           onChange={(e) =>
//                             setEditData({ ...editData!, category: e.target.value })
//                           }
//                         />
//                       </TableCell>
//                       <TableCell className="flex gap-2 justify-center">
//                         <Button
//                           size="sm"
//                           className="bg-green-500 hover:bg-green-600 text-white"
//                           onClick={handleSave}
//                         >
//                           Save
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="border-gray-400 dark:border-gray-600"
//                           onClick={() => setEditingIndex(null)}
//                         >
//                           Cancel
//                         </Button>
//                       </TableCell>
//                     </>
//                   ) : (
//                     <>
//                       <TableCell className="text-gray-800 dark:text-gray-100">{exp.desc}</TableCell>
//                       <TableCell className="text-gray-800 dark:text-gray-100">
//                         {getCurrencySymbol(exp.currency)}
//                         {exp.amount}
//                     </TableCell>
//                       <TableCell className="text-gray-800 dark:text-gray-100">{exp.currency}</TableCell>
//                       <TableCell className="text-gray-800 dark:text-gray-100">
//                         {getCurrencySymbol("USD")}
//                         {exp.converted ? exp.converted.toFixed(2) : "--"}
//                     </TableCell>
//                       <TableCell className="text-gray-800 dark:text-gray-100">{exp.category}</TableCell>
//                       <TableCell className="flex gap-2 justify-center">
//                         <Button
//                           size="sm"
//                           className="bg-blue-500 hover:bg-blue-600 text-white"
//                           onClick={() => handleEdit(i)}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => handleDelete(i)}
//                         >
//                           Delete
//                         </Button>
//                       </TableCell>
//                     </>
//                   )}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ExpenseDetailsPage;
