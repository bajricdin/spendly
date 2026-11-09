// Shared TypeScript types for the whole app.

// A transaction is either money coming in or money going out.
export type TransactionType = 'income' | 'expense';

// The categories from the project proposal. A union type means
// TypeScript shows an error if we misspell a category anywhere.
export type Category =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Education'
  | 'Bills'
  | 'Salary'
  | 'Other';

// Spendly's main data: one income or expense record.
export type Transaction = {
  id: string;
  title: string;
  amount: number; // always positive, the type says if it is + or -
  type: TransactionType;
  category: Category;
  date: string; // '2026-11-03'
  note?: string; // optional: the ? means it can be missing
  receiptUrl?: string; // optional: photo of the receipt
};
