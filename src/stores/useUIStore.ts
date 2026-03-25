import { create } from 'zustand';

export type UIStyle = 'classic' | 'modern';

interface UIState {
  uiStyle: UIStyle;
  setUIStyle: (style: UIStyle) => void;
}

export const useUIStore = create<UIState>((set) => ({
  uiStyle: 'classic',
  setUIStyle: (style) => set({ uiStyle: style }),
}));
