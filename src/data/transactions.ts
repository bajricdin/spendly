import type { Transaction } from '@/types';

// Mock (fake) data. Every screen reads from here until Supabase in Week 13.
export const transactions: Transaction[] = [
  {
    id: '1',
    title: 'Monthly salary',
    amount: 1500,
    type: 'income',
    category: 'Salary',
    date: '2026-11-01',
  },
  {
    id: '2',
    title: 'Groceries at Bingo',
    amount: 64.3,
    type: 'expense',
    category: 'Food',
    date: '2026-11-02',
    note: 'Weekly shopping',
    receiptUrl: 'https://picsum.photos/seed/bingo/600/400',
  },
  {
    id: '3',
    title: 'GRAS monthly bus ticket',
    amount: 33,
    type: 'expense',
    category: 'Transport',
    date: '2026-11-03',
  },
  {
    id: '4',
    title: 'Electricity bill',
    amount: 78.45,
    type: 'expense',
    category: 'Bills',
    date: '2026-11-04',
    receiptUrl: 'https://picsum.photos/seed/elektro/600/400',
  },
  {
    id: '5',
    title: 'Cevapi at Zeljo',
    amount: 12,
    type: 'expense',
    category: 'Food',
    date: '2026-11-05',
    note: 'Lunch with friends after class',
  },
  {
    id: '6',
    title: 'Programming book',
    amount: 45,
    type: 'expense',
    category: 'Education',
    date: '2026-11-06',
  },
];
