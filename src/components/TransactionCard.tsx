import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Category, Transaction } from '@/types';
import { formatAmount } from '@/utils/format';

// One emoji per category. Record<Category, string> means: every category
// must have exactly one string, so TypeScript complains if we forget one.
const CATEGORY_ICONS: Record<Category, string> = {
  Food: '🍔',
  Transport: '🚌',
  Shopping: '🛍️',
  Education: '📚',
  Bills: '💡',
  Salary: '💼',
  Other: '📦',
};

// Props = the inputs this component receives from its parent.
type TransactionCardProps = {
  transaction: Transaction;
  style?: StyleProp<ViewStyle>; // optional: lets the screen set the card's width
};

// Shows one transaction in the list. The whole card can be pressed.
export default function TransactionCard({ transaction, style }: TransactionCardProps) {
  const theme = useTheme(); // colours for light or dark mode
  const isIncome = transaction.type === 'income';
  const amountColor = isIncome ? theme.income : theme.expense;

  return (
    <Pressable
      onPress={() => console.log('Open', transaction.id)}
      // layout from styles, colours from the theme, "style" prop LAST so it wins
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        pressed && styles.pressed,
        style,
      ]}
    >
      {/* the icon box, with a small badge over its top-right corner */}
      <View style={[styles.icon, { backgroundColor: theme.background }]}>
        <Text style={styles.emoji}>{CATEGORY_ICONS[transaction.category]}</Text>
        <Text style={[styles.badge, { backgroundColor: amountColor, color: theme.onPrimary }]}>
          {isIncome ? '+' : '−'}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {transaction.title}
        </Text>
        <Text style={[styles.details, { color: theme.muted }]}>
          {transaction.category} · {transaction.date}
        </Text>
      </View>

      <Text style={[styles.amount, { color: amountColor }]}>{formatAmount(transaction)}</Text>
    </Pressable>
  );
}

// Only LAYOUT here (sizes, spacing). No colours: those depend on the theme,
// and useTheme() can only be called inside the component, not here.
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // icon, info and amount side by side
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  pressed: { opacity: 0.6 },
  icon: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: FontSize.title },
  badge: {
    position: 'absolute', // taken out of the normal layout and placed on top
    top: -Spacing.xs,
    right: -Spacing.xs,
    minWidth: 18,
    paddingHorizontal: Spacing.xs,
    borderRadius: Radius.pill,
    fontSize: FontSize.small,
    fontWeight: 'bold',
    textAlign: 'center',
    overflow: 'hidden', // needed on iOS for the rounded corners on Text
  },
  info: { flex: 1 }, // take all free space, pushing the amount to the right
  title: { fontSize: FontSize.body, fontWeight: 'bold' },
  details: { marginTop: Spacing.xs, fontSize: FontSize.small },
  amount: { fontSize: FontSize.body, fontWeight: 'bold' },
});
