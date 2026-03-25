import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { dimensions } from '@/theme/dimensions';

export function ClickWheel() {
  const { theme } = useTheme();
  const { wheel, ipod } = dimensions;

  const canvasSize = wheel.diameter + 20;
  const iconSize = 12;

  const ringShadow = Platform.OS === 'web' ? {
    boxShadow: '0px 2px 6px rgba(0,0,0,0.12), 0px 0px 0px 1px rgba(0,0,0,0.04)',
    backgroundImage: `
      radial-gradient(
        ellipse at 50% 35%,
        rgba(255,255,255,0.08) 0%,
        transparent 60%
      ),
      repeating-linear-gradient(
        180deg,
        rgba(255,255,255,0.02) 0px,
        rgba(0,0,0,0.015) 1px,
        rgba(255,255,255,0.03) 2px
      )
    `,
  } : {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  };

  const centerShadow = Platform.OS === 'web' ? {
    boxShadow: 'inset 0px 1px 2px rgba(0,0,0,0.1), 0px 0px 0px 0.5px rgba(0,0,0,0.06)',
    backgroundImage: `radial-gradient(
      ellipse at 50% 40%,
      rgba(255,255,255,0.1) 0%,
      transparent 70%
    )`,
  } : {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  };

  return (
    <View
      style={[
        styles.container,
        {
          top: wheel.top,
          left: (ipod.width - canvasSize) / 2,
          width: canvasSize,
          height: canvasSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      {/* Outer wheel ring */}
      <View
        style={[
          styles.ring,
          {
            width: wheel.diameter,
            height: wheel.diameter,
            borderRadius: wheel.radius,
            backgroundColor: theme.wheel.ring,
          },
          ringShadow as any,
        ]}
      >
        {/* MENU label (top) */}
        <Text style={[styles.label, styles.labelTop, { color: theme.wheel.text }]}>
          MENU
        </Text>

        {/* Back (left) */}
        <View style={[styles.iconContainer, styles.labelLeft]}>
          <Ionicons name="play-back" size={iconSize} color={theme.wheel.text} />
        </View>

        {/* Forward (right) */}
        <View style={[styles.iconContainer, styles.labelRight]}>
          <Ionicons name="play-forward" size={iconSize} color={theme.wheel.text} />
        </View>

        {/* Play/Pause (bottom) */}
        <View style={[styles.iconContainer, styles.labelBottom]}>
          <Ionicons name="play" size={iconSize} color={theme.wheel.text} />
          <Ionicons name="pause" size={iconSize} color={theme.wheel.text} style={{ marginLeft: -2 }} />
        </View>

        {/* Center button */}
        <View
          style={[
            styles.center,
            {
              width: wheel.centerDiameter,
              height: wheel.centerDiameter,
              borderRadius: wheel.centerRadius,
              backgroundColor: theme.wheel.center,
            },
            centerShadow as any,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {},
  label: {
    position: 'absolute',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  iconContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelTop: {
    top: '15%',
  },
  labelBottom: {
    bottom: '15%',
  },
  labelLeft: {
    left: '12%',
  },
  labelRight: {
    right: '12%',
  },
});
