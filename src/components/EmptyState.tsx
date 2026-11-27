import { StyleSheet, Text, View } from 'react-native';
import { FontSize, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type EmptyStateProps = {
  title: string;
  message: string;
};

// Shown by the FlatList instead of the items when there is nothing to show.
export default function EmptyState({ title, message }: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.box}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.message, { color: theme.muted }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // flex: 1 + centring = the text sits in the middle of the free space
  box: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.xs, padding: Spacing.lg },
  title: { fontSize: FontSize.title, fontWeight: 'bold' },
  message: { fontSize: FontSize.body, textAlign: 'center' },
});
