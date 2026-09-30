// Verified against VendeClip public pricing bundle and billing country resolver, 2026-09-29.
export const regionalPrices = {
  "USD": [
    {
      "monthly": 39,
      "annual": 374
    },
    {
      "monthly": 99,
      "annual": 950
    },
    {
      "monthly": 179,
      "annual": 1718
    }
  ],
  "EUR": [
    {
      "monthly": 39,
      "annual": 374
    },
    {
      "monthly": 99,
      "annual": 950
    },
    {
      "monthly": 179,
      "annual": 1718
    }
  ],
  "GBP": [
    {
      "monthly": 39,
      "annual": 374
    },
    {
      "monthly": 99,
      "annual": 950
    },
    {
      "monthly": 179,
      "annual": 1718
    }
  ],
  "DKK": [
    {
      "monthly": 299,
      "annual": 2870
    },
    {
      "monthly": 749,
      "annual": 7190
    },
    {
      "monthly": 1349,
      "annual": 12950
    }
  ],
  "ZAR": [
    {
      "monthly": 699,
      "annual": 6710
    },
    {
      "monthly": 1799,
      "annual": 17270
    },
    {
      "monthly": 3199,
      "annual": 30710
    }
  ],
  "BRL": [
    {
      "monthly": 199,
      "annual": 1910
    },
    {
      "monthly": 499,
      "annual": 4790
    },
    {
      "monthly": 899,
      "annual": 8630
    }
  ],
  "TRY": [
    {
      "monthly": 1699,
      "annual": 16310
    },
    {
      "monthly": 4299,
      "annual": 41270
    },
    {
      "monthly": 7699,
      "annual": 73910
    }
  ],
  "SGD": [
    {
      "monthly": 49,
      "annual": 470
    },
    {
      "monthly": 129,
      "annual": 1238
    },
    {
      "monthly": 229,
      "annual": 2198
    }
  ],
  "JPY": [
    {
      "monthly": 5900,
      "annual": 56600
    },
    {
      "monthly": 14900,
      "annual": 143000
    },
    {
      "monthly": 26900,
      "annual": 258000
    }
  ]
} as const;
export type BillingCurrency = keyof typeof regionalPrices;
export const pricingCountries = ["AD", "AE", "AG", "AL", "AM", "AR", "AT", "AU", "AX", "AZ", "BA", "BB", "BE", "BG", "BO", "BR", "BS", "BY", "BZ", "CA", "CH", "CL", "CO", "CR", "CU", "CY", "CZ", "DE", "DK", "DM", "DO", "EC", "EE", "ES", "FI", "FO", "FR", "GB", "GD", "GE", "GG", "GI", "GR", "GT", "GY", "HN", "HR", "HT", "HU", "IE", "IM", "IS", "IT", "JE", "JM", "JP", "KN", "LC", "LI", "LT", "LU", "LV", "MC", "MD", "ME", "MK", "MT", "MX", "NI", "NL", "NO", "PA", "PE", "PL", "PT", "PY", "RO", "RS", "RU", "SE", "SG", "SI", "SJ", "SK", "SM", "SR", "SV", "TR", "TT", "UA", "US", "UY", "VA", "VC", "VE", "XK", "ZA"];
const europe = new Set(["AD", "AL", "AM", "AT", "AX", "AZ", "BA", "BE", "BG", "BY", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FO", "FR", "GB", "GE", "GG", "GI", "GR", "HR", "HU", "IE", "IM", "IS", "IT", "JE", "LI", "LT", "LU", "LV", "MC", "MD", "ME", "MK", "MT", "NL", "NO", "PL", "PT", "RO", "RS", "RU", "SE", "SI", "SJ", "SK", "SM", "TR", "UA", "VA", "XK"]);
const special: Record<string, BillingCurrency> = { GB: "GBP", DK: "DKK", ZA: "ZAR", BR: "BRL", TR: "TRY", SG: "SGD", JP: "JPY" };
export function currencyForCountry(country: string): BillingCurrency { return special[country] ?? (europe.has(country) ? "EUR" : "USD"); }
