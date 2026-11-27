import { FlatList, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmptyState from '@/components/EmptyState';
import SummaryRow from '@/components/SummaryRow';
import TransactionCard from '@/components/TransactionCard';
import { Spacing } from '@/constants/theme';
import { transactions } from '@/data/transactions';

// The first screen of the app (index = home). Shows all transactions.
export default function HomeScreen() {
  const insets = useSafeAreaInsets(); // space taken by the notch / home indicator

  // Grid: 1 column on phones, 2 from 600 wide, 3 from 900 wide.
  const { width } = useWindowDimensions();
  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns;

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
      ListHeaderComponentStyle={{ marginBottom: Spacing.md }}
      // shown instead of the items when the list is empty
      ListEmptyComponent={
        <EmptyState title="No transactions yet" message="Your transactions will appear here." />
      }
      // flexGrow: 1 lets the empty state fill the screen so it can be centred
      contentContainerStyle={{ padding: Spacing.md, paddingBottom: Spacing.md + insets.bottom, flexGrow: 1 }}
    />
  );
}
