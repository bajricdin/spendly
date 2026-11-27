import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmptyState from '@/components/EmptyState';
import FilterChip from '@/components/FilterChip';
import SummaryRow from '@/components/SummaryRow';
import TransactionCard from '@/components/TransactionCard';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { fetchTransactions } from '@/data/api';
import { useTheme } from '@/hooks/use-theme';
import type { Transaction, TransactionType } from '@/types';

// The three states of loading: waiting, failed, or done.
type Status = 'loading' | 'error' | 'ready';
// Which transactions to show: all of them, or only one type.
type Filter = 'all' | TransactionType;

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expenses' },
];

// The first screen of the app (index = home). Shows all transactions.
export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets(); // space taken by the notch / home indicator

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [attempt, setAttempt] = useState(0); // increases on "Try again" to load again
  const [refreshing, setRefreshing] = useState(false); // pull-to-refresh spinner
  const [filter, setFilter] = useState<Filter>('all');

  // Load the transactions when the screen opens, and again when "attempt" changes.
  useEffect(() => {
    let ignore = false; // set to true if the screen closes before loading finishes

    async function load() {
      try {
        const data = await fetchTransactions();
        if (!ignore) {
          setTransactions(data);
          setStatus('ready');
        }
      } catch {
        if (!ignore) setStatus('error');
      }
    }

    load();
    return () => {
      ignore = true; // cleanup: ignore the answer of an old request
    };
  }, [attempt]);

  function retry() {
    setStatus('loading');
    setAttempt((a) => a + 1); // a new attempt number makes the effect run again
  }

  // Pull-to-refresh: the old list stays visible under the small spinner.
  async function refresh() {
    setRefreshing(true);
    try {
      setTransactions(await fetchTransactions());
    } catch {
      // keep the old list if refreshing fails
    } finally {
      setRefreshing(false); // always stop the spinner, success or not
    }
  }

  // Grid: 1 column on phones, 2 from 600 wide, 3 from 900 wide.
  const { width } = useWindowDimensions();
  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns;

  // Derived value: the list we actually show, calculated from state on every render.
  const visible = filter === 'all' ? transactions : transactions.filter((t) => t.type === filter);

  // While loading for the first time: only a spinner.
  if (status === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  // Loading failed: a message and a button to try again.
  if (status === 'error') {
    return (
      <View style={styles.center}>
        <Text style={[styles.error, { color: theme.text }]}>Could not load transactions</Text>
        <Pressable onPress={retry} style={[styles.button, { backgroundColor: theme.primary }]}>
          <Text style={{ color: theme.onPrimary, fontWeight: 'bold' }}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      key={columns} // a new list when the number of columns changes (required by FlatList)
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? { gap: Spacing.md } : undefined} // only allowed with 2+ columns
      data={visible}
      keyExtractor={(t) => t.id}
      renderItem={({ item }) => <TransactionCard transaction={item} style={{ width: cardWidth }} />}
      ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
      // above the items, scrolls together with them
      ListHeaderComponent={
        <View style={styles.header}>
          <SummaryRow transactions={transactions} />
          <View style={styles.chips}>
            {FILTERS.map((f) => (
              <FilterChip
                key={f.value}
                label={f.label}
                selected={filter === f.value}
                onPress={() => setFilter(f.value)}
              />
            ))}
          </View>
        </View>
      }
      // shown instead of the items when "visible" is empty
      ListEmptyComponent={
        filter === 'all' ? (
          <EmptyState title="No transactions yet" message="Your transactions will appear here." />
        ) : (
          <EmptyState
            title={filter === 'income' ? 'No income yet' : 'No expenses yet'}
            message="Choose another filter."
          />
        )
      }
      refreshing={refreshing}
      onRefresh={refresh}
      // flexGrow: 1 lets the empty state fill the screen so it can be centred
      contentContainerStyle={[styles.list, { paddingBottom: Spacing.md + insets.bottom }]}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.md },
  error: { fontSize: FontSize.body },
  button: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg, borderRadius: Radius.md },
  list: { padding: Spacing.md, flexGrow: 1 },
  header: { gap: Spacing.md, marginBottom: Spacing.md },
  chips: { flexDirection: 'row', gap: Spacing.sm },
});
