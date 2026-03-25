import { Platform } from 'react-native';

export function tickHaptic() {
  if (Platform.OS === 'web') return;
  // Lazy import to avoid web bundling issues
  import('expo-haptics').then((Haptics) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  });
}

export function selectHaptic() {
  if (Platform.OS === 'web') return;
  import('expo-haptics').then((Haptics) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  });
}
