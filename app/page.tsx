"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis,  YAxis,  CartesianGrid, BarChart,  Bar,  Legend, AreaChart, Area} from "recharts";


export default function Home() {

  // Theme detection for chart colors
  const { theme } = useTheme();
  const isDark = theme === "dark";


    //  State management for expenses
  const [expens, setExpens] = useState<any[]>([]);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    currency: "USD",
    category: "Food",
    date: "",
  });

    //  Load stored expenses from localStorage on page load
  useEffect(() => {
    const stored = localStorage.getItem("expens");
    if (stored) setExpens(JSON.parse(stored));
  }, []);

  //  Save expenses to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("expens", JSON.stringify(expens));
  }, [expens]);


  // ➕ Add a new expense
  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount) return;
    setExpens([...expenses, { ...newExpense, id: Date.now() }]);
    setNewExpense({
      description: "",
      amount: "",
      currency: "USD",
      category: "Food",
      date: "",
    });
  };

  const [category, setCategory] = useState("All");
  const [month, setMonth] = useState("January 2024");
  const [currency, setCurrency] = useState("USD");




  const expenses = [
    { desc: "Lunch", amount: 15, currency: "EUR", converted: 16.2, category: "Food" },
    { desc: "Movie", amount: 12, currency: "USD", converted: 12, category: "Entertainment" },
    { desc: "Flight", amount: 5000, currency: "JPY", converted: 35.4, category: "Travel" },
    { desc: "Groceries", amount: 100, currency: "EUR", converted: 108, category: "Shopping" },
    { desc: "Bills", amount: 50, currency: "GBP", converted: 62.5, category: "Bills" },
  ];

  const pieData = [
    { name: "Food", value: 445 },
    { name: "Shopping", value: 805 },
    { name: "Travel", value: 200 },
    { name: "Bills", value: 120 },
  ];
  const COLORS = ["#0088FE", "#FFBB28", "#00C49F", "#FF8042", "#6366F1", "#F59E0B", "#10B981", "#EC4899", "#3B82F6" ];

  // Line chart: expenses trend over time
  const lineData = [
    { day: "Jan 1", value: 200 },
    { day: "Jan 5", value: 320 },
    { day: "Jan 10", value: 280 },
    { day: "Jan 15", value: 400 },
    { day: "Jan 20", value: 350 },
    { day: "Jan 25", value: 420 },
  ];



  // 🧾 Total calculations
  const totalExpenses = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );




  const monthlySpending = [
    { month: "Jun", value: 3.5 },
    { month: "Jul", value: 6.2 },
    { month: "Aug", value: 4.1 },
    { month: "Sep", value: 5.2 },
    { month: "Oct", value: 7.9 },
  ];

  const spendingByCategory = [
    { name: "Food", value: 400 },
    { name: "Currency", value: 300 },
    { name: "Adzl", value: 200 },
  ];



const currencyUsageData = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 600 },
  { month: "Mar", value: 300 },
  { month: "Apr", value: 700 },
  { month: "May", value: 500 },
  { month: "Jun", value: 800 },
];


const spendingTrendData = [
  { value: 20 },
  { value: 30 },
  { value: 38 },
  { value: 35 },
  { value: 42 },
  { value: 50 },
];


const budgets = [
    { name: "Food", amount: 150, percent: 65 },
    { name: "Entertainment", amount: 230, percent: 45 },
    { name: "Utilities", amount: 200, percent: 80 },
  ];


  return (
    <div  className="w-full p-[10px] lg:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col gap-8 "  >
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_300px] gap-6 min-w-0">

      {/* LEFT SIDEBAR */}
      <div className="space-y-6 flex flex-col gap-4">
        <Card  className="w-full max-w-full flex flex-col justify-start items-stretch min-w-0 overflow-x-auto" >
          <CardHeader className="pb-2">
            <CardTitle  className="text-base sm:text-lg font-semibold text-left">Filters</CardTitle>
          </CardHeader>

          <CardContent  className="flex flex-col gap-4 w-full" >
            <div className="flex flex-col w-full overflow-x-auto">
              <label  className="block text-sm text-gray-600 mb-1">Category</label>

              <Select value={category} onValueChange={setCategory} defaultValue="All">
                <SelectTrigger 
                // className="w-[180px]"
                className="w-full"
                ><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Bills">Bills</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col w-full ">
              <label 
              // className="block text-sm mb-1"
              className="block text-sm text-gray-600 mb-1"
              >Month</label>
              <Input type="month" className="w-full"/>
            </div>

            <div className="flex flex-col w-full overflow-x-auto">
              <label className="block text-sm text-gray-600 mb-1">Currency</label>
              <Select value={currency} onValueChange={setCurrency} defaultValue="USD">
                <SelectTrigger className="w-full"><SelectValue placeholder="USD" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </CardContent>
        </Card>


        {/* Add Expense */}
        <Card className="w-full max-w-full flex flex-col justify-start items-stretch min-w-0 overflow-x-auto">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg font-semibold text-left">Add Expense</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 w-full">
            <Input 
            placeholder="🧾 What did you spend on?" 
            className="w-full"
            value={newExpense.description}
              onChange={(e) =>
                setNewExpense({ ...newExpense, description: e.target.value })
              }
            />
            <div className="flex gap-2 w-full">
              <Input 
              placeholder="Amount"
               className="w-1/2" 
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
                <SelectTrigger className="w-[90px]"><SelectValue placeholder="Currency" /></SelectTrigger>
                <SelectContent>
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
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Bills">Bills</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
              </SelectContent>
            </Select>

            <Input type="date" 
            className="w-full"
              value={newExpense.date}
              onChange={(e) =>
                setNewExpense({ ...newExpense, date: e.target.value })
              }
            />
            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white overflow-x-auto text-[12px] sm:text-base lg:text-[13px]" onClick={handleAddExpense}>
              continue to Add Expense
            </Button>
          </CardContent>
        </Card>

      </div>


      {/* Middle Section - Expenses Table */}
      {/* ---------------- MIDDLE SECTION ---------------- */}
      <div  
      // className="flex flex-col gap-5 min-w-0"  
      className="flex flex-col gap-5 min-w-0 flex-1"
      >
        <Card 
        className="w-full flex flex-col justify-start items-stretch min-w-0"
        // className="w-full max-w-full flex flex-col justify-start items-stretch min-w-0 overflow-x-auto"
        >
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-semibold text-left">Expenses</CardTitle>
          </CardHeader>
          <CardContent  
          // className="flex flex-col gap-4 w-full"
          className="flex flex-col gap-4 w-full overflow-x-auto"
          >
            <Table 
            // className="w-full text-sm min-w-full"
            className="w-full min-w-full text-sm "
            >
              <TableHeader className="">
                <TableRow >
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Converted</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((exp, i) => (
                  <TableRow key={i}>
                    <TableCell>{exp.desc}</TableCell>
                    <TableCell>${exp.amount}</TableCell>
                    <TableCell>{exp.currency}</TableCell>
                    <TableCell>${exp.converted}</TableCell>
                    <TableCell>{exp.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Line Chart - Expense Trend */}
        <Card className="w-full max-w-full flex flex-col justify-start items-stretch min-w-0 overflow-x-auto">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-semibold text-left">Expenses Trend</CardTitle>
          </CardHeader>
          <CardContent  className="flex flex-col gap-4 w-full">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke={isDark ? "#A78BFA" : "#6366F1"} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ---------------- RIGHT SIDEBAR ---------------- */}   
      {/* Right Sidebar - Summary */}
      <div 
      // className="space-y-6 col-span-1 flex flex-col gap-4 order-2 lg:order-none"
      className="space-y-6 flex flex-col gap-4"
      >
        <Card className="w-full max-w-full flex flex-col min-w-0 overflow-x-auto">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-semibold text-left">Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 lg:gap-1.5 w-full">
            <p className="text-2xl font-bold">$445</p>
            <p className="text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold">$805</p>
            <p className="text-gray-600">This Month</p>
            <p className="text-lg font-semibold mt-3">Shopping</p>
            <p className="text-gray-600 text-sm">Top Category</p>
          </CardContent>

          <CardContent>
            <p className="text-lg font-bold">${totalExpenses}</p>
            <p className="text-sm text-gray-500">Total Expenses</p>
          </CardContent>
        </Card>

        <Card className="w-full max-w-full flex flex-col min-w-0 overflow-x-auto">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-semibold text-left">By Category</CardTitle>
          </CardHeader>

          <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={window.innerWidth < 640 ? 50 : 80}
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} stroke={isDark ? "#0F172A" : "#F9FAFB"} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">

        {/* Monthly Spending */}
      <Card className="shadow-none border rounded-lg w-full max-w-full flex flex-col justify-start items-stretch min-w-0 overflow-x-auto">
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg font-semibold text-left">Monthly Spending</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={monthlySpending}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid stroke="#F3F4F6" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="#6B7280"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <YAxis
                stroke="#6B7280"
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                ticks={[0, 3, 6, 9]}
                domain={[0, 9]}
                axisLine={false}
                tickLine={false}
                fontSize={12}
              />
              <Tooltip
                cursor={{ fill: "rgba(59,130,246,0.1)" }}
                formatter={(value) => [`$${value}`, "Spending"]}
              />
              <Bar
                dataKey="value"
                fill="#3B82F6"
                barSize={35}
                radius={[0, 0, 0, 0]} // flat top corners
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
        
      {/* Spending by Category */}
      <Card className="shadow-none border rounded-lg w-full max-w-full flex flex-col justify-start items-stretch min-w-0 overflow-x-auto">
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg font-semibold text-left">Spending by Category</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center p-4 sm:gap-[10px]">
          {/* <ResponsiveContainer width="60%" height={160}> */}
          <ResponsiveContainer
            width="50%"
            height={window.innerWidth < 640 ? 100 : 160} // smaller height
            className="sm:!w-[45%] sm:!h-[120px]"
          >
            <PieChart>
              <Pie
                data={spendingByCategory}
                innerRadius={window.innerWidth < 640 ? 20 : 30}
                outerRadius={window.innerWidth < 640 ? 30 : 45}
                paddingAngle={2}
                dataKey="value"
              >
                <Cell fill="#22C55E" /> 
                <Cell fill="#3B82F6" /> 
                <Cell fill="#10B981" />  
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="lg:w-[35px] sm:w-[20px] h-2 rounded-full bg-[#22C55E]" />
              <span className="text-[19px]">Food</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="lg:w-[35px] sm:w-[20px] h-2 rounded-full bg-[#3B82F6]" />
              <span className="text-[19px]">Shopping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="lg:w-[35px] sm:w-[20px] h-2 rounded-full bg-[#10B981]" />
              <span className="text-[19px]">bills</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Currency Usage */}
      <Card className="shadow-none border rounded-lg w-full max-w-full flex flex-col justify-start items-stretch min-w-0 overflow-x-auto">
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg font-semibold text-left">Currency Usage</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={currencyUsageData}>
              <defs>
                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
              <YAxis hide />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                fill="url(#colorUsage)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 w-full max-w-full flex flex-col justify-start items-stretch min-w-0 overflow-x-auto">
        <CardHeader className="pb-0">
          <CardTitle className="text-base sm:text-lg font-semibold text-left text-gray-800 dark:text-gray-100">
            Spending Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="w-full h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingTrendData}>
                <CartesianGrid
                  vertical={false}
                  horizontal={true}
                  strokeDasharray="0"
                  stroke={theme === "dark" ? "#374151" : "#D1D5DB"}
                />
                <YAxis
                  domain={[20,50]}
                  ticks={[ 50, 40, 30, 20]}
                  tickFormatter={(value) => `${value}%`}
                  tick={{
                    fontSize: 10,
                    fill: theme === "dark" ? "#9CA3AF" : "#6B7280",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#1F2937" : "#fff",
                    border: theme === "dark" ? "1px solid #374151" : "1px solid #E5E7EB",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: theme === "dark" ? "#F9FAFB" : "#111827",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={theme === "dark" ? "#60A5FA" : "#3B82F6"}
                  strokeWidth={8}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

     </div> 

        <Card className="mt-6 w-full max-w-full flex flex-col justify-start items-stretch min-w-0 overflow-x-auto">
          <CardHeader>
            <CardTitle>Budget</CardTitle>
            <p className="text-base sm:text-lg font-semibold text-left text-gray-500">Set Monthly Budget</p>
          </CardHeader>

          <CardContent className="space-y-5">
            {budgets.map((b, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">{b.name}</span>
                  <label className="lg:w-[20%] flex justify-between items-center  font-medium bg-gray-100 dark:bg-gray-700 px-[5px] lg:px-3 lg:py-1 rounded-sm lg:rounded-md">
                    <span className="text-[13px] lg:text-[30px]">=</span>
                  <span className="text-[13px] lg:text-[25px]">${b.amount}</span>
                  </label>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${b.percent}%` }}
                  />
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-fit mt-2">
              Add Category
            </Button>
          </CardContent>
        </Card>

    </div>
  )  
}