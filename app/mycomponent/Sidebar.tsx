"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  Wallet,
  Settings,
  PlusCircle,
  List,
  Target,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function Sidebar() {

    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, href: "/" },
        { name: "Budget", icon: Target, href: "/" },
        { name: "Analytics / Insights", icon: BarChart3, href: "/" },
        { name: "Expense Details", icon: List, href: "/" },
        { name: "Add / Edit Expense", icon: PlusCircle, href: "/" },
        { name: "Settings", icon: Settings, href: "/" },
    ];

    return (
        <aside
            className={cn(
                " bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out flex flex-col",

                collapsed 
                ? "w-15 sm:w-16" 
                : "w-35 sm:w-56" ,
                
                "shrink-0"
            )}
        >

            <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-3 flex justify-end hover:bg-gray-200 dark:hover:bg-gray-800"
            >
                {collapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-500" />
                ) : (
                <ChevronLeft className="h-5 w-5 text-gray-500" />
                )}
            </button>


            <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
                {menuItems.map(({ name, icon: Icon, href }) => (
                <Link
                    key={name}
                    href={href}
                    className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800",
                    collapsed && "justify-center"
                    )}
                >
                    <Icon className="h-5 w-5" />
                    {!collapsed && <span>{name}</span>}
                </Link>
                ))}
            </nav>
        </aside>
    )
}