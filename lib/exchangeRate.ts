const API_BASE = process.env.NEXT_PUBLIC_EXCHANGE_API_URL!;
const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY!;

/** 🔹 1. Convert between currencies */
export async function convert(amount: number, from: string, to: string) {
  const res = await fetch(
    `${API_BASE}/convert?access_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`
  );
  if (!res.ok) throw new Error("Conversion failed");
  const data = await res.json();
  return data.result ?? 0;
}

/** 🔹 2. Fetch live rates */
export async function fetchRates(base: string = "USD") {
  const res = await fetch(`${API_BASE}/live?base=${base}&access_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch live exchange rates");
  const data = await res.json();
  return data.quotes || {};
}

/** 🔹 3. Fetch historical rates for a specific date (YYYY-MM-DD) */
export async function fetchHistoricalRates(base: string = "USD", date: string) {
  const res = await fetch(`${API_BASE}/${date}?access_key=${API_KEY}&base=${base}`);
  if (!res.ok) throw new Error("Failed to fetch historical rates");
  const data = await res.json();
  return data.rates || {};
}

/** 🔹 4. Fetch timeseries (range of historical data for trend analysis) */
export async function fetchTimeSeries(
  base: string = "USD",
  startDate: string,
  endDate: string,
  symbol: string
) {
  const res = await fetch(
    `${API_BASE}/timeseries?access_key=${API_KEY}&base=${base}&symbols=${symbol}&start_date=${startDate}&end_date=${endDate}`
  );
  if (!res.ok) throw new Error("Failed to fetch timeseries data");
  const data = await res.json();
  return data.rates || {};
}

/** 🔹 5. Fetch currency change metrics (compare between two dates) */
export async function fetchChangeMetrics(
  base: string = "USD",
  startDate: string,
  endDate: string,
  symbol: string
) {
  const res = await fetch(
    `${API_BASE}/change?access_key=${API_KEY}&base=${base}&symbols=${symbol}&start_date=${startDate}&end_date=${endDate}`
  );
  if (!res.ok) throw new Error("Failed to fetch change metrics");
  const data = await res.json();
  return data.change || {};
}
