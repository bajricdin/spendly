import type { Transaction } from '@/types';
import { transactions } from './transactions';

// A fake API: it waits a bit and then returns the mock data, like a real server would.
// Supabase replaces this in Week 13.

// wait(800) = a Promise that finishes after 800 milliseconds
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// async = this function returns a Promise; await pauses inside it until the wait is over.
// Pass { fail: true } to test the error state.
export async function fetchTransactions(options: { fail?: boolean } = {}): Promise<Transaction[]> {
  await wait(800);
  if (options.fail) throw new Error('Could not load transactions');
  return transactions;
}
