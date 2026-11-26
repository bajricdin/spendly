import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/hooks/use-theme';

// The root layout wraps every screen. A Stack shows one screen at a time
// with a header at the top. Its colours now come from the theme.
export default function RootLayout() {
  const theme = useTheme();

  return (
    <>
      {/* "auto" = dark status bar icons in light mode, light icons in dark mode */}
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Transactions' }} />
      </Stack>
    </>
  );
}
