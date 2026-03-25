import React, { ReactNode } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { dimensions } from '@/theme/dimensions';

interface LCDScreenProps {
  children: ReactNode;
}

export function LCDScreen({ children }: LCDScreenProps) {
  const { theme } = useTheme();
  const { lcd, ipod } = dimensions;

  const bezelShadow = Platform.OS === 'web' ? {
    boxShadow: [
      // Inset shadow for sunken bezel
      'inset 0px 1px 3px rgba(0,0,0,0.4)',
      'inset 0px 0px 1px rgba(0,0,0,0.2)',
      // Outer subtle lift
      '0px 1px 0px rgba(255,255,255,0.15)',
    ].join(', '),
  } : {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  };

  const screenShadow = Platform.OS === 'web' ? {
    boxShadow: 'inset 0px 1px 4px rgba(0,0,0,0.3), inset 0px 0px 2px rgba(0,0,0,0.15)',
  } : {};

  return (
    <View
      style={[
        styles.bezel,
        {
          width: lcd.width + 6,
          height: lcd.height + 6,
          top: lcd.top,
          left: (ipod.width - lcd.width - 6) / 2,
          borderRadius: lcd.borderRadius + 2,
          backgroundColor: theme.shell.bezel,
        },
        bezelShadow as any,
      ]}
    >
      <View
        style={[
          styles.screen,
          {
            width: lcd.width,
            height: lcd.height,
            borderRadius: lcd.borderRadius,
            backgroundColor: theme.screen.background,
          },
          screenShadow as any,
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bezel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    overflow: 'hidden',
    flex: 1,
  },
});
