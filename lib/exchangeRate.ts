const API_BASE = process.env.NEXT_PUBLIC_EXCHANGE_API_URL!;
const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY!;

/** 🔹 Convert directly using API (Free, no key required) */
export async function convert(amount: number, from: string, to: string) {
  const res = await fetch(`${API_BASE}/convert?access_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`)

  if (!res.ok) throw new Error("Conversion failed");
  const data = await res.json();

  return data.result ?? 0;
}

// /** 🔹 Fetch live rates */
// export async function fetchRates(base: string = "USD") {
//   const res = await fetch(`${API_BASE}/live?base=${base}&access_key=${API_KEY}`);
//   if (!res.ok) throw new Error("Failed to fetch live exchange rates");
//   const data = await res.json();
//   return data.rates;
// }


// /** 🔹 Cache rates locally */
// export function saveRates(base: string, rates: Record<string, number>) {
//   localStorage.setItem(
//     `rates_${base}`,
//     JSON.stringify({ rates, timestamp: Date.now() })
//   );
// }


// /** 🔹 Load cached or new rates */
// export async function getRates(base: string = "USD") {
//   const cached = localStorage.getItem(`rates_${base}`);
//   if (cached) {
//     const { rates, timestamp } = JSON.parse(cached);
//     if (Date.now() - timestamp < 12 * 60 * 60 * 1000) return rates; // valid 12h
//   }
//   const freshRates = await fetchRates(base);
//   saveRates(base, freshRates);
//   return freshRates;
// }


