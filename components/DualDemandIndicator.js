import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DualDemandIndicator({ b2cActive = true, b2bActive = true, compact = false }) {
  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <View style={[styles.dot, b2cActive && styles.dotActive]} />
        <Text style={styles.compactText}>👥+🏪</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parallel Demand</Text>
      <View style={styles.row}>
        <View style={styles.channel}>
          <Text style={styles.icon}>👥</Text>
          <Text style={styles.label}>B2C</Text>
          <View style={[styles.statusBadge, b2cActive ? styles.active : styles.inactive]}>
            <View style={[styles.statusDot, b2cActive ? styles.activeDot : styles.inactiveDot]} />
            <Text style={[styles.statusText, b2cActive ? styles.activeText : styles.inactiveText]}>
              {b2cActive ? 'LIVE' : 'OFF'}
            </Text>
          </View>
        </View>

        <View style={styles.connector}>
          <View style={styles.connectorLine} />
          <Text style={styles.connectorPlus}>+</Text>
          <View style={styles.connectorLine} />
        </View>

        <View style={styles.channel}>
          <Text style={styles.icon}>🏪</Text>
          <Text style={styles.label}>B2B</Text>
          <View style={[styles.statusBadge, b2bActive ? styles.active : styles.inactive]}>
            <View style={[styles.statusDot, b2bActive ? styles.b2bDot : styles.inactiveDot]} />
            <Text style={[styles.statusText, b2bActive ? styles.b2bText : styles.inactiveText]}>
              {b2bActive ? 'LIVE' : 'OFF'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  title: {
    fontSize: 11,
    color: '#777',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  channel: {
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: '600',
    marginBottom: 8,
  },
  connector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  connectorLine: {
    width: 12,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  connectorPlus: {
    color: '#555',
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  active: {
    backgroundColor: 'rgba(76,175,80,0.15)',
  },
  inactive: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: 5,
  },
  activeDot: {
    backgroundColor: '#4caf50',
  },
  b2bDot: {
    backgroundColor: '#4db8ff',
  },
  inactiveDot: {
    backgroundColor: '#555',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  activeText: {
    color: '#4caf50',
  },
  b2bText: {
    color: '#4db8ff',
  },
  inactiveText: {
    color: '#555',
  },
  // Compact mode
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(77,184,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(77,184,255,0.2)',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#555',
    marginRight: 5,
  },
  dotActive: {
    backgroundColor: '#4caf50',
  },
  compactText: {
    fontSize: 12,
    color: '#4db8ff',
    fontWeight: '700',
  },
});
