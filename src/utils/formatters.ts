/**
 * Format number as Indian Rupee (INR)
 * e.g. 1990 -> ₹1,990
 */
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const generateOrderId = (): string => {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `FRM-${randomNum}`;
};

export const calculateDiscount = (subtotal: number, couponCode: string | null): number => {
  if (!couponCode) return 0;
  const upper = couponCode.trim().toUpperCase();
  if (upper === 'FORME10') {
    return Math.round(subtotal * 0.1);
  }
  if (upper === 'WELCOME20') {
    return Math.round(subtotal * 0.2);
  }
  return 0;
};
