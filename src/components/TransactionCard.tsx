import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Transaction } from '@/types';
import { formatAmount } from '@/utils/format';

// Props = the inputs this component receives from its parent.
type TransactionCardProps = {
  transaction: Transaction;
};

// Shows one transaction in the list. The whole card can be pressed.
export default function TransactionCard({ transaction }: TransactionCardProps) {
  const isIncome = transaction.type === 'income';

  return (
    <Pressable
      onPress={() => console.log('Open', transaction.id)}
      // style can be a function: "pressed" is true while the finger is down
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.info}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.details}>
          {transaction.category} · {transaction.date}
        </Text>
      </View>

      {/* green for income, red for expense */}
      <Text style={[styles.amount, isIncome ? styles.income : styles.expense]}>
        {formatAmount(transaction)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // put info and amount side by side
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#E6EEF7',
  },
  pressed: { opacity: 0.6 },
  info: { flex: 1 }, // take all free space, pushing the amount to the right
  title: { fontSize: 16, fontWeight: 'bold' },
  details: { marginTop: 4, color: '#555' },
  amount: { fontSize: 16, fontWeight: 'bold' },
  income: { color: '#1E8E3E' },
  expense: { color: '#D93025' },
});
