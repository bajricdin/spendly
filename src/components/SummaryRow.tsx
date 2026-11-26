import { StyleSheet, Text, View } from 'react-native';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Transaction } from '@/types';

type SummaryRowProps = {
  transactions: Transaction[];
};

// Three equal boxes above the list: total income, total expenses and the balance.
export default function SummaryRow({ transactions }: SummaryRowProps) {
  const theme = useTheme();

  // Derived values: calculated on every render with reduce, NOT kept in state.
  // reduce walks through the array and adds each amount to a running total (sum).
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  // The three boxes are the same, only the data changes, so we describe them in an array.
  const boxes = [
    { label: 'Income', value: income, color: theme.income },
    { label: 'Expenses', value: expenses, color: theme.expense },
    { label: 'Balance', value: balance, color: theme.text },
  ];

  return (
    <View style={styles.row}>
      {boxes.map((box) => (
        <View
          key={box.label}
          style={[styles.box, { backgroundColor: theme.card, borderColor: theme.border }]}
        >
          <Text style={[styles.value, { color: box.color }]} numberOfLines={1}>
            {box.value.toFixed(2)}
          </Text>
          <Text style={[styles.label, { color: theme.muted }]}>{box.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm },
  box: {
    flex: 1, // every box takes an equal share of the width
    padding: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  value: { fontSize: FontSize.title, fontWeight: 'bold' },
  label: { fontSize: FontSize.small },
});
