export type WheelEvent =
  | { type: 'scroll'; direction: 'up' | 'down' }
  | { type: 'tap'; zone: WheelTapZone }
  | { type: 'hold'; zone: WheelTapZone };

export type WheelTapZone = 'menu' | 'select' | 'play_pause' | 'forward' | 'back';

export interface WheelEventHandler {
  onScroll?: (direction: 'up' | 'down') => void;
  onTap?: (zone: WheelTapZone) => void;
  onHold?: (zone: WheelTapZone) => void;
}
