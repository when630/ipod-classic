import React, { useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { dimensions, wheelGesture } from '@/theme/dimensions';
import { getAngle, getDistance, angleDelta, getTapZone, degToRad } from '@/utils/angle';
import { tickHaptic, selectHaptic } from '@/utils/haptics';
import type { WheelEventHandler, WheelTapZone } from '@/types';

interface ClickWheelGestureProps {
  onScroll?: (direction: 'up' | 'down') => void;
  onTap?: (zone: WheelTapZone) => void;
  onHold?: (zone: WheelTapZone) => void;
}

export function ClickWheelGesture({ onScroll, onTap, onHold }: ClickWheelGestureProps) {
  const { wheel, ipod } = dimensions;
  const canvasSize = wheel.diameter + 20;
  const cx = canvasSize / 2;
  const cy = canvasSize / 2;

  const tickThreshold = degToRad(wheelGesture.tickThresholdDegrees);

  // Shared values for worklet-based gesture processing
  const previousAngle = useSharedValue(0);
  const accumulatedAngle = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  // Long press timer
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const emitScrollUp = useCallback(() => {
    tickHaptic();
    onScroll?.('up');
  }, [onScroll]);

  const emitScrollDown = useCallback(() => {
    tickHaptic();
    onScroll?.('down');
  }, [onScroll]);

  const emitTap = useCallback((zone: WheelTapZone) => {
    selectHaptic();
    onTap?.(zone);
  }, [onTap]);

  // Pan gesture for circular scrolling
  const panGesture = Gesture.Pan()
    .onStart((e) => {
      const dist = getDistance(e.x, e.y, cx, cy);

      // Only start scrolling if touch is on the ring (not center, not outside)
      if (dist < wheel.centerRadius || dist > wheel.radius) {
        isScrolling.value = false;
        return;
      }

      isScrolling.value = true;
      previousAngle.value = getAngle(e.x, e.y, cx, cy);
      accumulatedAngle.value = 0;
    })
    .onUpdate((e) => {
      if (!isScrolling.value) return;

      const currentAngle = getAngle(e.x, e.y, cx, cy);
      const delta = angleDelta(currentAngle, previousAngle.value);

      accumulatedAngle.value += delta;

      // Emit ticks when accumulated angle exceeds threshold
      while (accumulatedAngle.value >= tickThreshold) {
        accumulatedAngle.value -= tickThreshold;
        runOnJS(emitScrollDown)();
      }
      while (accumulatedAngle.value <= -tickThreshold) {
        accumulatedAngle.value += tickThreshold;
        runOnJS(emitScrollUp)();
      }

      previousAngle.value = currentAngle;
    })
    .onEnd(() => {
      isScrolling.value = false;
    });

  // Tap gesture for button zones
  const tapGesture = Gesture.Tap()
    .onEnd((e) => {
      const dist = getDistance(e.x, e.y, cx, cy);

      if (dist <= wheel.centerRadius) {
        // Center button = select
        runOnJS(emitTap)('select');
      } else if (dist <= wheel.radius) {
        // Ring area = directional buttons
        const angle = getAngle(e.x, e.y, cx, cy);
        const zone = getTapZone(angle);
        runOnJS(emitTap)(zone);
      }
    });

  // Long press gesture
  const longPressGesture = Gesture.LongPress()
    .minDuration(wheelGesture.longPressMs)
    .onEnd((e) => {
      const dist = getDistance(e.x, e.y, cx, cy);

      if (dist <= wheel.centerRadius) {
        runOnJS(onHold ?? (() => {}))('select');
      } else if (dist <= wheel.radius) {
        const angle = getAngle(e.x, e.y, cx, cy);
        const zone = getTapZone(angle);
        runOnJS(onHold ?? (() => {}))(zone);
      }
    });

  // Combine gestures: tap and long press are exclusive, pan is simultaneous
  const composed = Gesture.Race(
    longPressGesture,
    Gesture.Simultaneous(panGesture, tapGesture)
  );

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        style={[
          styles.gestureArea,
          {
            width: canvasSize,
            height: canvasSize,
            top: wheel.top,
            left: (ipod.width - canvasSize) / 2,
          },
        ]}
      />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  gestureArea: {
    position: 'absolute',
    // Transparent - gestures only, no visual
  },
});
