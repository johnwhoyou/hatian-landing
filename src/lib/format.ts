export function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-PH", { style: "currency", currency }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}
