import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// iPod Classic aspect ratio: roughly 2.4" wide x 4.1" tall (about 0.585 ratio)
// Screen takes about 45% of front face, wheel takes about 38%

const IPOD_WIDTH = Math.min(SCREEN_WIDTH * 0.85, 320);
const IPOD_HEIGHT = IPOD_WIDTH * 1.75;

// LCD screen dimensions (inside the iPod shell)
const LCD_WIDTH = IPOD_WIDTH * 0.82;
const LCD_HEIGHT = IPOD_HEIGHT * 0.38;
const LCD_TOP = IPOD_HEIGHT * 0.08;
const LCD_BORDER_RADIUS = 4;

// Click wheel dimensions
const WHEEL_DIAMETER = IPOD_WIDTH * 0.72;
const WHEEL_RADIUS = WHEEL_DIAMETER / 2;
const WHEEL_CENTER_DIAMETER = WHEEL_DIAMETER * 0.38;
const WHEEL_CENTER_RADIUS = WHEEL_CENTER_DIAMETER / 2;
const WHEEL_TOP = LCD_TOP + LCD_HEIGHT + IPOD_HEIGHT * 0.06;

// Shell dimensions
const SHELL_BORDER_RADIUS = 20;

export const dimensions = {
  screen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  ipod: {
    width: IPOD_WIDTH,
    height: IPOD_HEIGHT,
  },
  lcd: {
    width: LCD_WIDTH,
    height: LCD_HEIGHT,
    top: LCD_TOP,
    borderRadius: LCD_BORDER_RADIUS,
  },
  wheel: {
    diameter: WHEEL_DIAMETER,
    radius: WHEEL_RADIUS,
    centerDiameter: WHEEL_CENTER_DIAMETER,
    centerRadius: WHEEL_CENTER_RADIUS,
    top: WHEEL_TOP,
  },
  shell: {
    borderRadius: SHELL_BORDER_RADIUS,
  },
} as const;

// Click wheel gesture constants
export const wheelGesture = {
  tickThresholdDegrees: 30,
  tapDeadZone: 5,
  longPressMs: 500,
} as const;
