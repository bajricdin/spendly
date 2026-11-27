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
import SummaryRow from '@/components/SummaryRow';
import TransactionCard from '@/components/TransactionCard';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { fetchTransactions } from '@/data/api';
import { useTheme } from '@/hooks/use-theme';
import type { Transaction } from '@/types';

// The three states of loading: waiting, failed, or done.
type Status = 'loading' | 'error' | 'ready';

// The first screen of the app (index = home). Shows all transactions.
export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets(); // space taken by the notch / home indicator

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [attempt, setAttempt] = useState(0); // increases on "Try again" to load again

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

  // Grid: 1 column on phones, 2 from 600 wide, 3 from 900 wide.
  const { width } = useWindowDimensions();
  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns;

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
      data={transactions}
      keyExtractor={(t) => t.id}
      renderItem={({ item }) => <TransactionCard transaction={item} style={{ width: cardWidth }} />}
      ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
      // above the items, scrolls together with them
      ListHeaderComponent={<SummaryRow transactions={transactions} />}
      ListHeaderComponentStyle={styles.header}
      // shown instead of the items when the list is empty
      ListEmptyComponent={
        <EmptyState title="No transactions yet" message="Your transactions will appear here." />
      }
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
  header: { marginBottom: Spacing.md },
});
