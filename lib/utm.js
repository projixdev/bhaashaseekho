const STORAGE_KEY = "bs_utm_params";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"];

// Reads utm_* params from the current URL (if present) and persists them to
// sessionStorage so they survive client-side navigation between the page the
// visitor landed on and whichever page they eventually submit a form from.
// Call once, client-side only, on initial mount (see components/UtmCapture.jsx).
export function captureUtmParams() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const found = {};
  let hasAny = false;

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      found[key] = value;
      hasAny = true;
    }
  });

  if (hasAny) {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  }
}

// Reads back whatever UTM params were captured earlier in the session.
// Returns an object with utmSource/utmMedium/utmCampaign, defaulting to "".
export function getStoredUtmParams() {
  if (typeof window === "undefined") {
    return { utmSource: "", utmMedium: "", utmCampaign: "" };
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const stored = raw ? JSON.parse(raw) : {};
    return {
      utmSource: stored.utm_source || "",
      utmMedium: stored.utm_medium || "",
      utmCampaign: stored.utm_campaign || "",
    };
  } catch {
    return { utmSource: "", utmMedium: "", utmCampaign: "" };
  }
}
