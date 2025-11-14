"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { fetchHistoricalRates } from "@/lib/exchangeRate";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

export default function ExchangeInsights() {
  const [activeTab, setActiveTab] = useState("historical");
  const [selectedDate, setSelectedDate] = useState(dayjs().subtract(1, "day").format("YYYY-MM-DD"));
  const [historicalData, setHistoricalData] = useState<any>(null);

  // --- Load only historical (works with your plan)
  useEffect(() => {
    async function loadHistorical() {
      const rates = await fetchHistoricalRates("USD", selectedDate);
      setHistoricalData(rates);
    }
    loadHistorical();
  }, [selectedDate]);

  // ----------------------------------------
  //  TIMEFRAME ANALYSIS (DUMMY STATIC DATA)
  // ----------------------------------------
  type TimeframeKey = "7" | "30" | "90" | "365";

  const timeframeOptions: Record<TimeframeKey, any[]> = {
    "7": [
      { date: "Day 1", EUR: 0.91, GBP: 0.78, NGN: 160 },
      { date: "Day 2", EUR: 0.92, GBP: 0.77, NGN: 600 },
      { date: "Day 3", EUR: 0.93, GBP: 0.79, NGN: 1350 },
      { date: "Day 4", EUR: 0.92, GBP: 0.78, NGN: 580 },
      { date: "Day 5", EUR: 0.94, GBP: 0.80, NGN: 1570 },
      { date: "Day 6", EUR: 0.95, GBP: 0.81, NGN: 1260 },
      { date: "Day 7", EUR: 0.96, GBP: 0.82, NGN: 1550 },
    ],
    "30": [], // you can fill if you want
    "90": [],
    "365": [],
  };

  const [timeframe, setTimeframe] = useState<TimeframeKey>("7");

  // ----------------------------------------
  //  CHANGE METRICS (DUMMY STATIC DATA)
  // ----------------------------------------
  const changeMetrics = [
    {
      currency: "EUR",
      startRate: 0.90,
      endRate: 0.95,
      diff: 0.05,
      percent: "+5.55",
    },
    {
      currency: "GBP",
      startRate: 0.78,
      endRate: 0.80,
      diff: 0.02,
      percent: "+2.56",
    },
    {
      currency: "NGN",
      startRate: 1650,
      endRate: 1550,
      diff: -100,
      percent: "-6.06",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Exchange Insights</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="historical">Historical Rates</TabsTrigger>
          <TabsTrigger value="timeframe">Timeframe Analysis</TabsTrigger>
          <TabsTrigger value="metrics">Change Metrics</TabsTrigger>
        </TabsList>

        {/* --- Historical Rates (API WORKS) --- */}
        <TabsContent value="historical">
          <Card>
            <CardHeader>
              <CardTitle>📅 Historical Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-52"
                />
                <Button>Fetch</Button>
              </div>

              {historicalData ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={Object.entries(historicalData).slice(0, 8).map(([code, value]) => ({
                      code,
                      rate: value,
                    }))}
                  >
                    <XAxis dataKey="code" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="rate" stroke="#4f46e5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-gray-500">Loading historical data...</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Timeframe Analysis (STATIC DESIGN) --- */}
        <TabsContent value="timeframe">
          <Card>
            <CardHeader>
              <CardTitle>📈 Timeframe Analysis (Demo Data)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Select onValueChange={(v) => setTimeframe(v as TimeframeKey)} defaultValue={timeframe}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                    <SelectItem value="365">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeframeOptions[timeframe]}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="EUR" stroke="#2563eb" name="EUR" />
                  <Line type="monotone" dataKey="GBP" stroke="#16a34a" name="GBP" />
                  <Line type="monotone" dataKey="NGN" stroke="#dc2626" name="NGN" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Change Metrics (STATIC DESIGN) --- */}
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>📊 Change Metrics (Demo Data)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {changeMetrics.map((m) => (
                  <div
                    key={m.currency}
                    className="border rounded-lg p-3 text-sm bg-gray-50 dark:bg-gray-800 flex flex-col gap-1"
                  >
                    <div className="font-medium">USD/{m.currency}</div>
                    <div>
                      {m.diff >= 0 ? (
                        <span className="text-green-600">▲ {m.percent}%</span>
                      ) : (
                        <span className="text-red-600">▼ {m.percent}%</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {m.startRate} → {m.endRate}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}









// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { fetchHistoricalRates, fetchTimeSeries, fetchChangeMetrics } from "@/lib/exchangeRate"
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
// import { Button } from "@/components/ui/button";
// import dayjs from "dayjs";

// export default function ExchangeInsights() {
//   const [activeTab, setActiveTab] = useState("historical");
//   const [selectedDate, setSelectedDate] = useState(dayjs().subtract(1, "day").format("YYYY-MM-DD"));
//   const [historicalData, setHistoricalData] = useState<any>(null);

//   const [timeframe, setTimeframe] = useState("7");
//   const [timeseriesData, setTimeseriesData] = useState<any[]>([]);

//   const [changeMetrics, setChangeMetrics] = useState<any[]>([]);

// useEffect(() => {
//   async function loadHistorical() {
//     const rates = await fetchHistoricalRates("USD", selectedDate);
//     setHistoricalData(rates);
//   }
//   loadHistorical();
// }, [selectedDate]);

  

// useEffect(() => {
//   async function loadTimeseries() {
//     const end = dayjs().format("YYYY-MM-DD");
//     const start = dayjs().subtract(Number(timeframe), "day").format("YYYY-MM-DD");

//     const data = await fetchTimeSeries("USD", start, end, "EUR,GBP,NGN");

//     const formatted = Object.entries(data).map(([date, rates]: any) => ({
//       date,
//       EUR: rates.EUR,
//       GBP: rates.GBP,
//       NGN: rates.NGN,
//     }));

//     setTimeseriesData(formatted);
//   }
//   loadTimeseries();
// }, [timeframe]);


// useEffect(() => {
//   async function loadMetrics() {
//     const end = dayjs().format("YYYY-MM-DD");
//     const start = dayjs().subtract(30, "day").format("YYYY-MM-DD");

//     const results = await fetchChangeMetrics("USD", start, end, "EUR,GBP,NGN");

//     // results looks like:
//     // { EUR: {start_rate, end_rate, change, change_pct}, ... }
//     const formatted = Object.entries(results).map(([currency, data]: any) => ({
//       currency,
//       startRate: data.start_rate,
//       endRate: data.end_rate,
//       diff: data.change,
//       percent: data.change_pct,
//     }));

//     setChangeMetrics(formatted);
//   }
//   loadMetrics();
// }, []);


//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Exchange Insights</h1>

//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList>
//           <TabsTrigger value="historical">Historical Rates</TabsTrigger>
//           <TabsTrigger value="timeframe">Timeframe Analysis</TabsTrigger>
//           <TabsTrigger value="metrics">Change Metrics</TabsTrigger>
//         </TabsList>

//         {/* --- Historical Rates --- */}
//         <TabsContent value="historical">
//           <Card>
//             <CardHeader>
//               <CardTitle>📅 Historical Rates</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-center gap-3 mb-4">
//                 <Input
//                   type="date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   className="w-52"
//                 />
//                 <Button onClick={() => setSelectedDate(selectedDate)}>Fetch</Button>
//               </div>

//               {historicalData ? (
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart
//                     data={Object.entries(historicalData).slice(0, 8).map(([code, value]) => ({
//                       code,
//                       rate: value,
//                     }))}
//                   >
//                     <XAxis dataKey="code" />
//                     <YAxis />
//                     <Tooltip />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Line type="monotone" dataKey="rate" stroke="#4f46e5" strokeWidth={2} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="text-sm text-gray-500">Loading historical data...</p>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* --- Timeframe Analysis --- */}
//         <TabsContent value="timeframe">
//           <Card>
//             <CardHeader>
//               <CardTitle>📈 Timeframe Analysis</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-center gap-3 mb-4">
//                 <Select onValueChange={setTimeframe} defaultValue={timeframe}>
//                   <SelectTrigger className="w-40">
//                     <SelectValue placeholder="Select timeframe" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="7">7 Days</SelectItem>
//                     <SelectItem value="30">30 Days</SelectItem>
//                     <SelectItem value="90">90 Days</SelectItem>
//                     <SelectItem value="365">1 Year</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={timeseriesData}>
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <Line type="monotone" dataKey="EUR" stroke="#2563eb" name="EUR" />
//                   <Line type="monotone" dataKey="GBP" stroke="#16a34a" name="GBP" />
//                   <Line type="monotone" dataKey="NGN" stroke="#dc2626" name="NGN" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* --- Change Metrics --- */}
//         <TabsContent value="metrics">
//           <Card>
//             <CardHeader>
//               <CardTitle>📊 Change Metrics (30-day change)</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {changeMetrics.map((m) => (
//                   <div
//                     key={m.currency}
//                     className="border rounded-lg p-3 text-sm bg-gray-50 dark:bg-gray-800 flex flex-col gap-1"
//                   >
//                     <div className="font-medium">USD/{m.currency}</div>
//                     <div>
//                       {m.diff >= 0 ? (
//                         <span className="text-green-600">▲ +{m.percent}%</span>
//                       ) : (
//                         <span className="text-red-600">▼ {m.percent}%</span>
//                       )}
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       {m.startRate.toFixed(3)} → {m.endRate.toFixed(3)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
