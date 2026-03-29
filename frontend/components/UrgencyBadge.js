import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const URGENCY_MAP = {
  green: { color: '#4caf50', bg: 'rgba(76,175,80,0.15)', label: 'FRESH' },
  medium: { color: '#ff9800', bg: 'rgba(255,152,0,0.15)', label: 'HURRY' },
  critical: { color: '#ff4444', bg: 'rgba(255,68,68,0.15)', label: 'LAST CHANCE' },
};

export default function UrgencyBadge({ urgency = 'green', size = 'normal' }) {
  const config = URGENCY_MAP[urgency] || URGENCY_MAP.green;

  const isSmall = size === 'small';

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }, isSmall && styles.badgeSmall]}>
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Text style={[styles.text, { color: config.color }, isSmall && styles.textSmall]}>
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  text: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  textSmall: {
    fontSize: 9,
  },
});
