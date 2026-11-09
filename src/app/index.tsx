import { ScrollView, StyleSheet, Text } from 'react-native';
import TransactionCard from '@/components/TransactionCard';
import { transactions } from '@/data/transactions';

// The first screen of the app (index = home). Shows all transactions.
export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* a derived value: calculated from the data, not stored anywhere */}
      <Text style={styles.count}>{transactions.length} transactions</Text>

      {/* .map turns every transaction into a card; key helps React track each one */}
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  count: { fontSize: 14, color: '#555' },
});
