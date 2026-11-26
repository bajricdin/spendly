import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Transaction } from '@/types';
import { formatAmount } from '@/utils/format';

type TransactionDetailsProps = {
  transaction: Transaction;
};

// Shows every field of one transaction. In Week 7 this becomes its own screen.
export default function TransactionDetails({ transaction }: TransactionDetailsProps) {
  const theme = useTheme();
  const isIncome = transaction.type === 'income';

  // The label/value rows are all the same shape, so we list them as data.
  // Optional fields (note) are only added when they have a value.
  const rows = [
    { label: 'Type', value: isIncome ? 'Income' : 'Expense' },
    { label: 'Category', value: transaction.category },
    { label: 'Date', value: transaction.date },
  ];
  if (transaction.note) {
    rows.push({ label: 'Note', value: transaction.note });
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {/* on tablets the content stops at 600 wide and sits in the middle */}
      <View style={styles.content}>
        {transaction.receiptUrl ? (
          // a remote image needs a size: full width, height from the 16:9 shape
          <Image source={{ uri: transaction.receiptUrl }} style={styles.receipt} resizeMode="cover" />
        ) : null}

        <Text style={[styles.amount, { color: isIncome ? theme.income : theme.expense }]}>
          {formatAmount(transaction)}
        </Text>
        <Text style={[styles.title, { color: theme.text }]}>{transaction.title}</Text>

        {rows.map((row) => (
          <View key={row.label} style={[styles.row, { borderColor: theme.border }]}>
            <Text style={[styles.label, { color: theme.muted }]}>{row.label}</Text>
            <Text style={[styles.value, { color: theme.text }]}>{row.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: Spacing.md },
  content: { width: '100%', maxWidth: 600, alignSelf: 'center', gap: Spacing.sm },
  receipt: { width: '100%', aspectRatio: 16 / 9, borderRadius: Radius.md },
  amount: { fontSize: FontSize.hero, fontWeight: 'bold' },
  title: { fontSize: FontSize.hero, fontWeight: 'bold' },
  row: {
    flexDirection: 'row', // label left, value right
    justifyContent: 'space-between',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  label: { fontSize: FontSize.body },
  value: { fontSize: FontSize.body, flexShrink: 1, textAlign: 'right' }, // long text wraps
});
