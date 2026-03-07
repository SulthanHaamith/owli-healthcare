import { CLINIC } from "./constants";

export function generateUpiUrl(amount: number, description: string): string {
  const params = new URLSearchParams({
    pa: CLINIC.upiId,
    pn: CLINIC.upiMerchantName,
    am: amount.toFixed(2),
    cu: "INR",
    tn: description,
  });
  return `upi://pay?${params.toString()}`;
}
