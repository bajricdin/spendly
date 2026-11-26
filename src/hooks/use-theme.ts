import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

// A custom hook: returns the light or dark colours, following the phone's setting.
// When the user switches dark mode on or off, components using it re-render.
export function useTheme() {
  const scheme = useColorScheme(); // 'light', 'dark' or null
  return Colors[scheme === 'dark' ? 'dark' : 'light'];
}
