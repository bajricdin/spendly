import type { Transaction } from '@/types';

// Turns a transaction into text like "-64.30 KM" or "+1500.00 KM".
export function formatAmount(transaction: Transaction): string {
  const sign = transaction.type === 'income' ? '+' : '-';
  return `${sign}${transaction.amount.toFixed(2)} KM`;
}
