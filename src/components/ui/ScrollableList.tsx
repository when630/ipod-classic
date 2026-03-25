import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface ScrollableListProps {
  selectedIndex: number;
  itemHeight: number;
  visibleItems: number;
  children: React.ReactNode;
}

// How many items of margin to keep above/below the selected item before scrolling
const SCROLL_MARGIN = 2;

export function ScrollableList({
  selectedIndex,
  itemHeight,
  visibleItems,
  children,
}: ScrollableListProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollOffsetRef = useRef(0);

  useEffect(() => {
    const viewportHeight = visibleItems * itemHeight;
    let offset = scrollOffsetRef.current;

    // Top/bottom edges of the selected item
    const itemTop = selectedIndex * itemHeight;
    const itemBottom = itemTop + itemHeight;

    // Start scrolling when selection gets within SCROLL_MARGIN of the edge
    const softTop = offset + SCROLL_MARGIN * itemHeight;
    const softBottom = offset + viewportHeight - SCROLL_MARGIN * itemHeight;

    if (itemTop < softTop) {
      // Selection approaching top — keep margin above
      offset = Math.max(0, itemTop - SCROLL_MARGIN * itemHeight);
    } else if (itemBottom > softBottom) {
      // Selection approaching bottom — keep margin below
      offset = itemBottom + SCROLL_MARGIN * itemHeight - viewportHeight;
    }

    scrollOffsetRef.current = Math.max(0, offset);
    scrollViewRef.current?.scrollTo({ y: scrollOffsetRef.current, animated: true });
  }, [selectedIndex, itemHeight, visibleItems]);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
