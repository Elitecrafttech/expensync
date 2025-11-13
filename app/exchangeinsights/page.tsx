"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { fetchHistoricalRates, fetchTimeSeries, fetchChangeMetrics } from "@/lib/exchangeRate"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

export default function ExchangeInsights() {
  const [activeTab, setActiveTab] = useState("historical");
  const [selectedDate, setSelectedDate] = useState(dayjs().subtract(1, "day").format("YYYY-MM-DD"));
  const [historicalData, setHistoricalData] = useState<any>(null);

  const [timeframe, setTimeframe] = useState("7");
  const [timeseriesData, setTimeseriesData] = useState<any[]>([]);

  const [changeMetrics, setChangeMetrics] = useState<any[]>([]);

  // --- Fetch historical data for a single date
  // useEffect(() => {
  //   async function fetchHistorical() {
  //     const res = await fetch(`https://api.exchangerate.host/${selectedDate}?base=USD`);
  //     const data = await res.json();
  //     setHistoricalData(data.rates);
  //   }
  //   fetchHistorical();
  // }, [selectedDate]);

  // --- Fetch timeframe data
  // useEffect(() => {
  //   async function fetchTimeseries() {
  //     const end = dayjs().format("YYYY-MM-DD");
  //     const start = dayjs().subtract(Number(timeframe), "day").format("YYYY-MM-DD");
  //     const res = await fetch(
  //       `https://api.exchangerate.host/timeseries?start_date=${start}&end_date=${end}&base=USD&symbols=EUR,GBP,NGN`
  //     );
  //     const data = await res.json();

  //     const formatted = Object.entries(data.rates || {}).map(([date, rates]: any) => ({
  //       date,
  //       EUR: rates.EUR,
  //       GBP: rates.GBP,
  //       NGN: rates.NGN,
  //     }));
  //     setTimeseriesData(formatted);
  //   }
  //   fetchTimeseries();
  // }, [timeframe]);

  // --- Compute change metrics
  // useEffect(() => {
  //   async function computeChange() {
  //     const end = dayjs().format("YYYY-MM-DD");
  //     const start = dayjs().subtract(30, "day").format("YYYY-MM-DD");
  //     const res = await fetch(
  //       `https://api.exchangerate.host/timeseries?start_date=${start}&end_date=${end}&base=USD&symbols=EUR,GBP,NGN`
  //     );
  //     const data = await res.json();

  //     const keys = Object.keys(data.rates || {});
  //     const first = data.rates[keys[0]];
  //     const last = data.rates[keys[keys.length - 1]];

  //     const metrics = Object.keys(last).map((currency) => {
  //       const startRate = first[currency];
  //       const endRate = last[currency];
  //       const diff = endRate - startRate;
  //       const percent = ((diff / startRate) * 100).toFixed(2);
  //       return { currency, startRate, endRate, diff, percent };
  //     });
  //     setChangeMetrics(metrics);
  //   }
  //   computeChange();
  // }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Exchange Insights</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="historical">Historical Rates</TabsTrigger>
          <TabsTrigger value="timeframe">Timeframe Analysis</TabsTrigger>
          <TabsTrigger value="metrics">Change Metrics</TabsTrigger>
        </TabsList>

        {/* --- Historical Rates --- */}
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
                <Button onClick={() => setSelectedDate(selectedDate)}>Fetch</Button>
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

        {/* --- Timeframe Analysis --- */}
        <TabsContent value="timeframe">
          <Card>
            <CardHeader>
              <CardTitle>📈 Timeframe Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Select onValueChange={setTimeframe} defaultValue={timeframe}>
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
                <LineChart data={timeseriesData}>
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

        {/* --- Change Metrics --- */}
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>📊 Change Metrics (30-day change)</CardTitle>
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
                        <span className="text-green-600">▲ +{m.percent}%</span>
                      ) : (
                        <span className="text-red-600">▼ {m.percent}%</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {m.startRate.toFixed(3)} → {m.endRate.toFixed(3)}
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
