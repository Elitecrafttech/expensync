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

export async function fetchHistoricalRates(
  base: string = "USD",
  date: string
) {
  const url = `${API_BASE}/historical?access_key=${API_KEY}&date=${date}&base=${base}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch historical rates (${res.status}): ${text}`);
  }
  const data = await res.json();
  return data.quotes || data.rates || {};
}

export async function fetchTimeSeries(
  base: string = "USD",
  startDate: string,
  endDate: string,
  symbols: string
) {
  const url = `${API_BASE}/timeseries?access_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}&base=${base}&symbols=${symbols}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch timeseries data (${res.status}): ${text}`);
  }
  const data = await res.json();
  return data.rates || {};
}

export async function fetchChangeMetrics(
  base: string = "USD",
  startDate: string,
  endDate: string,
  symbols: string
) {
  const url = `${API_BASE}/fluctuation?access_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}&base=${base}&symbols=${symbols}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch change metrics (${res.status}): ${text}`);
  }
  const data = await res.json();
  return data.rates || {};
}