"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function BudgetPage() {
  const [budgets] = useState([
    { category: "Food", spent: 300, limit: 500, color: "bg-blue-500" },
    { category: "Housing", spent: 700, limit: 1000, color: "bg-green-500" },
    { category: "Transportation", spent: 450, limit: 500, color: "bg-orange-500" },
    { category: "Shopping", spent: 550, limit: 500, color: "bg-red-500" },
  ]);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card className="p-6 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Budget</CardTitle>
        </CardHeader>

        <CardContent>
          <h2 className="text-lg font-semibold mb-6">Monthly Budget</h2>

          <div className="space-y-6">
            {budgets.map((b) => {
              const percent = Math.round((b.spent / b.limit) * 100);
              const over = percent > 100;

              return (
                <div key={b.category}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${b.color}`}></span>
                      {b.category}
                    </span>
                    <span className={`${over ? "text-red-600 font-semibold" : ""}`}>
                      {percent}%
                    </span>
                  </div>

                  <Progress
                    value={percent > 100 ? 100 : percent}
                    className="h-3"
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
