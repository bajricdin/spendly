import { Stack } from 'expo-router';

// The root layout wraps every screen. A Stack shows one screen at a time
// with a header at the top.
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Transactions' }} />
    </Stack>
  );
}
