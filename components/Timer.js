import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const URGENCY_TEXT_COLORS = {
  green: '#4caf50',
  medium: '#ff9800',
  critical: '#ff4444',
};

export default function Timer({ endTime, urgency = 'medium' }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [dynamicColor, setDynamicColor] = useState(URGENCY_TEXT_COLORS[urgency]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(endTime);
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('EXPIRED');
        setDynamicColor('#444');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      if (hours < 1) {
        setDynamicColor('#ff4444');
      } else if (hours < 6) {
        setDynamicColor('#ff9800');
      } else {
        setDynamicColor(URGENCY_TEXT_COLORS[urgency]);
      }

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}h ${mins
          .toString()
          .padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`
      );
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endTime, urgency]);

  return (
    <View style={styles.container}>
      <Ionicons name="time-outline" size={14} color={dynamicColor} />
      <Text style={[styles.timerText, { color: dynamicColor }]}>
        {timeLeft}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerText: {
    fontWeight: '900',
    fontSize: 13,
    fontVariant: ['tabular-nums'],
    letterSpacing: 0.5,
  },
});
