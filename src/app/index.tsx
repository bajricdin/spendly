import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SummaryRow from '@/components/SummaryRow';
import TransactionCard from '@/components/TransactionCard';
import { FontSize, Spacing } from '@/constants/theme';
import { transactions } from '@/data/transactions';
import { useTheme } from '@/hooks/use-theme';

// The first screen of the app (index = home). Shows all transactions.
export default function HomeScreen() {
  const theme = useTheme();

  // insets = how much space the system bars take (notch, home indicator...)
  const insets = useSafeAreaInsets();

  // The window width changes when the phone rotates or the browser is resized.
  const { width } = useWindowDimensions();
  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  // screen width - padding on both sides - gaps between columns, split by columns
  const cardWidth = (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns;

  return (
    <ScrollView
      // extra bottom padding so the last card is not hidden behind the home indicator
      contentContainerStyle={[styles.container, { paddingBottom: Spacing.md + insets.bottom }]}
    >
      <SummaryRow transactions={transactions} />

      {/* a derived value: calculated from the data, not stored anywhere */}
      <Text style={[styles.count, { color: theme.muted }]}>
        {transactions.length} transactions
      </Text>

      {/* cards wrap into 1, 2 or 3 columns depending on the width */}
      <View style={styles.grid}>
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            style={{ width: cardWidth }}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.md, gap: Spacing.md },
  count: { fontSize: FontSize.small },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
});
