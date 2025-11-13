"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { fetchRates } from "@/lib/exchangeRate"

const budgetpage: React.FC = () => {
     const [rates, setRates] = useState<Record<string, number> | null>(null);
    
      useEffect(() => {
        async function loadRates() {
          try {
            const data = await fetchRates("USD");
            console.log("homepage data in useeffect", data);
            
            setRates(data);
          } catch (err) {
            console.log(" Failed to fetch live rates:", err);
          }
        }
        loadRates();
      }, []);


      fetch("https://api.exchangerate.host/live?access_key=c3d10c5e906ab3eebd8d7bd335cd3d0a&base=USD&symbols=BTC")
  .then(res => res.json())
  .then(data => {
    console.log("BTC rate:", data.quotes.USDBTC);
  })
  .catch(err => console.error(err));

    
    return (
        <Card 
  className="w-full max-w-full flex flex-col justify-start items-stretch min-w-0 overflow-x-auto"
>
  <CardHeader className="pb-2">
    <CardTitle className="text-base sm:text-lg font-semibold text-left">
      🌍 Live Exchange Rates
    </CardTitle>
  </CardHeader>

  <CardContent className="flex flex-col gap-4 w-full">
    {rates && Object.keys(rates).length > 0 ? (
      <div
        className="max-h-64 overflow-y-auto pr-1"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#9ca3af transparent",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 6px;
          }
          div::-webkit-scrollbar-thumb {
            background-color: #9ca3af;
            border-radius: 4px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background-color: #6b7280;
          }
        `}</style>

        <div className="grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-3 gap-3">
          {(() => {
            const priority = [
              "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "NGN",
            ];

            // Fallback symbols for currencies Intl may not cover
            const fallbackSymbols: Record<string, string> = {
              AFN: "؋",
              ALL: "L",
              AMD: "֏",
              ANG: "ƒ",
              AOA: "Kz",
              ARS: "$",
              BDT: "৳",
              BHD: ".د.ب",
              BND: "$",
              BRL: "R$",
              CLP: "$",
              COP: "$",
              CRC: "₡",
              CZK: "Kč",
              DKK: "kr",
              EGP: "£",
              HUF: "Ft",
              IDR: "Rp",
              ILS: "₪",
              KES: "KSh",
              KRW: "₩",
              LKR: "Rs",
              MAD: "د.م.",
              MXN: "$",
              MYR: "RM",
              NOK: "kr",
              PHP: "₱",
              PKR: "₨",
              PLN: "zł",
              RUB: "₽",
              SEK: "kr",
              SGD: "$",
              THB: "฿",
              TRY: "₺",
              TWD: "NT$",
              UAH: "₴",
              ZAR: "R",
            };

            const entries = Object.entries(rates).map(([pair, value]) => ({
              code: pair.replace("USD", ""),
              value,
            }));

            const sorted = entries.sort((a, b) => {
              const aIndex = priority.indexOf(a.code);
              const bIndex = priority.indexOf(b.code);
              if (aIndex === -1 && bIndex === -1)
                return a.code.localeCompare(b.code);
              if (aIndex === -1) return 1;
              if (bIndex === -1) return -1;
              return aIndex - bIndex;
            });

            return sorted.map(({ code, value }) => {
              let symbol = "";
              try {
                symbol =
                  new Intl.NumberFormat("en", {
                    style: "currency",
                    currency: code,
                  })
                    .formatToParts(1)
                    .find((p) => p.type === "currency")?.value || "";
              } catch {
                symbol = "";
              }

              // fallback to manual symbol if missing
              if (!symbol || symbol === code) {
                symbol = fallbackSymbols[code] || "";
              }

              return (
                <div
                  key={code}
                  className="flex justify-between items-center border rounded-lg p-2 text-sm bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-medium">USD/{code}</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {symbol}
                    {value.toFixed(3)}
                  </span>
                </div>
              );
            });
          })()}
        </div>
      </div>
    ) : (
      <p className="text-sm text-gray-500">Loading live rates...</p>
    )}
  </CardContent>
</Card>

    );
};

export default budgetpage;
