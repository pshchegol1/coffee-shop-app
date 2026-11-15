export const FREE_SHIPPING_THRESHOLD = 50;
export const SHIPPING_FEE = 5.99;

export const getShipping = (subtotal: number) =>
  subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

export const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;
