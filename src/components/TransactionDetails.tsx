import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { Transaction } from '@/types';
import { formatAmount } from '@/utils/format';

type TransactionDetailsProps = {
  transaction: Transaction;
};

// Shows every field of one transaction. In Week 7 this becomes its own screen.
export default function TransactionDetails({ transaction }: TransactionDetailsProps) {
  const isIncome = transaction.type === 'income';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.amount, isIncome ? styles.income : styles.expense]}>
        {formatAmount(transaction)}
      </Text>
      <Text style={styles.title}>{transaction.title}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Type</Text>
        <Text>{isIncome ? 'Income' : 'Expense'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Category</Text>
        <Text>{transaction.category}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date</Text>
        <Text>{transaction.date}</Text>
      </View>

      {/* optional fields: only shown when they have a value */}
      {transaction.note ? (
        <View style={styles.row}>
          <Text style={styles.label}>Note</Text>
          <Text>{transaction.note}</Text>
        </View>
      ) : null}

      {transaction.receiptUrl ? (
        // a remote image MUST have a width and height, or it is not shown
        <Image source={{ uri: transaction.receiptUrl }} style={styles.receipt} resizeMode="cover" />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  amount: { fontSize: 32, fontWeight: 'bold' },
  income: { color: '#1E8E3E' },
  expense: { color: '#D93025' },
  title: { fontSize: 20, fontWeight: 'bold' },
  row: { gap: 2 },
  label: { fontSize: 12, color: '#777' },
  receipt: { width: '100%', height: 220, borderRadius: 12 },
});
