export interface IPodTheme {
  name: string;
  shell: {
    body: string;
    bodyGradientEnd: string;
    bezel: string;
  };
  screen: {
    background: string;
    text: string;
    highlight: string;
    highlightText: string;
    statusBar: string;
    statusBarText: string;
  };
  modern: {
    background: string;
    secondaryBackground: string;
    text: string;
    secondaryText: string;
    accent: string;
    separator: string;
    groupedBackground: string;
  };
  wheel: {
    ring: string;
    ringGradientEnd: string;
    center: string;
    centerPressed: string;
    text: string;
  };
}

const modernLight = {
  background: '#F2F2F7',
  secondaryBackground: '#FFFFFF',
  text: '#000000',
  secondaryText: '#8E8E93',
  accent: '#007AFF',
  separator: '#C6C6C8',
  groupedBackground: '#FFFFFF',
};

const modernDark = {
  background: '#1C1C1E',
  secondaryBackground: '#2C2C2E',
  text: '#FFFFFF',
  secondaryText: '#8E8E93',
  accent: '#0A84FF',
  separator: '#38383A',
  groupedBackground: '#2C2C2E',
};

export const themes: Record<string, IPodTheme> = {
  'classic-silver': {
    name: 'Classic Silver',
    shell: {
      body: '#E8E8E8',
      bodyGradientEnd: '#C0C0C0',
      bezel: '#8A8A8A',
    },
    screen: {
      background: '#B8C8B8',
      text: '#1A1A1A',
      highlight: '#3478F6',
      highlightText: '#FFFFFF',
      statusBar: '#A8B8A8',
      statusBarText: '#1A1A1A',
    },
    modern: modernLight,
    wheel: {
      ring: '#F0F0F0',
      ringGradientEnd: '#D0D0D0',
      center: '#E8E8E8',
      centerPressed: '#D0D0D0',
      text: '#6E6E6E',
    },
  },
  'u2-black': {
    name: 'U2 Black',
    shell: {
      body: '#1A1A1A',
      bodyGradientEnd: '#0A0A0A',
      bezel: '#333333',
    },
    screen: {
      background: '#B8C8B8',
      text: '#1A1A1A',
      highlight: '#E53935',
      highlightText: '#FFFFFF',
      statusBar: '#A8B8A8',
      statusBarText: '#1A1A1A',
    },
    modern: { ...modernDark, accent: '#FF453A' },
    wheel: {
      ring: '#E53935',
      ringGradientEnd: '#B71C1C',
      center: '#1A1A1A',
      centerPressed: '#333333',
      text: '#FFFFFF',
    },
  },
  'classic-white': {
    name: 'Classic White',
    shell: {
      body: '#FFFFFF',
      bodyGradientEnd: '#E8E8E8',
      bezel: '#C0C0C0',
    },
    screen: {
      background: '#CFDFCF',
      text: '#1A1A1A',
      highlight: '#3478F6',
      highlightText: '#FFFFFF',
      statusBar: '#BFCFBF',
      statusBarText: '#1A1A1A',
    },
    modern: modernLight,
    wheel: {
      ring: '#FFFFFF',
      ringGradientEnd: '#E0E0E0',
      center: '#F5F5F5',
      centerPressed: '#E0E0E0',
      text: '#8E8E8E',
    },
  },
  'classic-black': {
    name: 'Classic Black',
    shell: {
      body: '#2A2A2A',
      bodyGradientEnd: '#1A1A1A',
      bezel: '#444444',
    },
    screen: {
      background: '#B8C8B8',
      text: '#1A1A1A',
      highlight: '#3478F6',
      highlightText: '#FFFFFF',
      statusBar: '#A8B8A8',
      statusBarText: '#1A1A1A',
    },
    modern: modernDark,
    wheel: {
      ring: '#2A2A2A',
      ringGradientEnd: '#1A1A1A',
      center: '#333333',
      centerPressed: '#444444',
      text: '#999999',
    },
  },
};

export const defaultThemeKey = 'classic-silver';
