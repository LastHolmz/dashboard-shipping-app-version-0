export default function formatDate(date: Date, format: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: format.includes("YYYY") ? "numeric" : undefined,
    month: format.includes("MM") ? "2-digit" : undefined,
    day: format.includes("DD") ? "2-digit" : undefined,
    hour: format.includes("HH") ? "2-digit" : undefined,
    minute: format.includes("mm") ? "2-digit" : undefined,
    second: format.includes("ss") ? "2-digit" : undefined,
  };

  return new Intl.DateTimeFormat("ar", options).format(date);
}
