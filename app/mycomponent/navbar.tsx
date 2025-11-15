"use client";

import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";


export default function Navbar() {

     const [currency, setCurrency] = useState("USD");
     const { theme, setTheme } = useTheme();
     const [mounted, setMounted] = useState(false);

     useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
    return (
      <nav className="flex items-center justify-between px-4 py-2 border-b">
        <h1 className="font-semibold">Expense Tracker</h1>
      </nav>
    );
  }

    return (
        <nav className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300 w-full">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">ExpenSync</h1>

            <div className="flex items-center gap-4">
                <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="USD" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                    </SelectContent>
                </Select>

                <div className="text-lg font-medium">$200,450</div>

                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle theme"
                    >
                    {theme === "dark" ? (
                        <Sun className="h-5 w-5 text-yellow-400" />
                    ) : (
                        <Moon className="h-5 w-5 text-gray-400" />
                    )}
                </button>
            </div>

        </nav>
    )
}