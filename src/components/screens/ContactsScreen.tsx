import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { useTheme } from '@/theme/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';
import { usePlayerStore } from '@/stores/usePlayerStore';

const MOCK_CONTACTS = [
  { id: 'c1', name: 'Steve Jobs', phone: '(408) 555-1976' },
  { id: 'c2', name: 'Jony Ive', phone: '(408) 555-1997' },
  { id: 'c3', name: 'Tim Cook', phone: '(408) 555-2011' },
  { id: 'c4', name: 'Craig Federighi', phone: '(408) 555-2014' },
  { id: 'c5', name: 'Phil Schiller', phone: '(408) 555-2001' },
];

interface ContactsScreenProps {
  selectedIndex: number;
}

export function ContactsScreen({ selectedIndex }: ContactsScreenProps) {
  const { theme } = useTheme();
  const uiStyle = useUIStore((s) => s.uiStyle);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const contact = MOCK_CONTACTS[selectedIndex];
  const isModern = uiStyle === 'modern';
  const m = theme.modern;

  const bg = isModern ? m.background : theme.screen.background;
  const textColor = isModern ? m.text : theme.screen.text;
  const subColor = isModern ? m.secondaryText : theme.screen.text;

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <IPodStatusBar title="Contacts" isPlaying={isPlaying} />
      {!isModern && <View style={styles.divider} />}
      <View style={styles.content}>
        {contact && (
          <>
            <View style={[styles.avatar, { backgroundColor: isModern ? m.accent + '20' : textColor + '15' }]}>
              <Ionicons name="person" size={28} color={isModern ? m.accent : textColor + '40'} />
            </View>
            <Text style={[styles.name, { color: textColor }]}>{contact.name}</Text>
            <View style={styles.row}>
              <Ionicons name="call-outline" size={11} color={subColor} />
              <Text style={[styles.phone, { color: subColor }]}>{contact.phone}</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

export const CONTACTS_LIST = MOCK_CONTACTS;

const styles = StyleSheet.create({
  container: { flex: 1 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(0,0,0,0.2)' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 },
  avatar: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 15, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  phone: { fontSize: 12, opacity: 0.6 },
});
