import React, { ReactNode } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { dimensions } from '@/theme/dimensions';

interface IPodShellProps {
  children: ReactNode;
}

export function IPodShell({ children }: IPodShellProps) {
  const { theme } = useTheme();
  const { ipod, shell } = dimensions;

  const webShadow = Platform.OS === 'web' ? {
    boxShadow: '0px 8px 30px rgba(0,0,0,0.35), 0px 2px 8px rgba(0,0,0,0.2)',
  } : {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
    elevation: 12,
  };

  // Brushed metal: repeating 1px horizontal lines via stacked thin views
  const brushedLines = Platform.OS === 'web' ? {
    backgroundImage: `
      repeating-linear-gradient(
        180deg,
        rgba(255,255,255,0.03) 0px,
        rgba(0,0,0,0.02) 1px,
        rgba(255,255,255,0.04) 2px
      ),
      linear-gradient(
        180deg,
        ${theme.shell.body} 0%,
        ${theme.shell.bodyGradientEnd} 100%
      )
    `,
    backgroundColor: 'transparent',
  } : {
    backgroundColor: theme.shell.body,
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.body,
          {
            width: ipod.width,
            height: ipod.height,
            borderRadius: shell.borderRadius,
            backgroundColor: theme.shell.body,
          },
          webShadow as any,
        ]}
      >
        {/* Brushed metal texture layer */}
        <View
          style={[
            styles.metalTexture,
            { borderRadius: shell.borderRadius },
            brushedLines as any,
          ]}
        />
        {/* Thin edge highlight — simulates chamfered metal edge */}
        <View
          style={[
            styles.edgeHighlight,
            {
              borderRadius: shell.borderRadius,
              borderColor: 'rgba(255,255,255,0.2)',
              borderBottomColor: 'rgba(255,255,255,0.05)',
            },
          ]}
        />
      </View>

      <View style={[styles.content, { width: ipod.width, height: ipod.height }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    position: 'absolute',
    overflow: 'hidden',
  },
  metalTexture: {
    ...StyleSheet.absoluteFillObject,
  },
  edgeHighlight: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 0.5,
  },
  content: {
    alignItems: 'center',
  },
});
