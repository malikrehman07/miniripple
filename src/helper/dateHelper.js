export function formatHumanDate(isoDate) {
  const date = new Date(isoDate);

  const options = {
    year: "numeric",
    month: "short",  // "short" → Aug, "long" → August
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,    // 12-hour format
  };

  return date.toLocaleString("en-US", options);
}


function formatRelativeTime(isoDate) {
  const date = new Date(isoDate);
  const now = new Date();
  const diff = (date - now) / 1000; // difference in seconds

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const divisions = [
    { amount: 60, name: "second" },
    { amount: 60, name: "minute" },
    { amount: 24, name: "hour" },
    { amount: 7, name: "day" },
    { amount: 4.34524, name: "week" },
    { amount: 12, name: "month" },
    { amount: Number.POSITIVE_INFINITY, name: "year" },
  ];

  let unit = "second";
  let value = diff;

  for (let i = 0; i < divisions.length; i++) {
    if (Math.abs(value) < divisions[i].amount) {
      unit = divisions[i].name;
      break;
    }
    value /= divisions[i].amount;
  }

  return rtf.format(Math.round(value), unit);
}

// Example usage:
console.log(formatRelativeTime("2025-08-18T00:47:29.587Z"));
// Output: "in 11 months" (depends on current date)
