import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Timer from './Timer';

const STATUS_COLORS = {
  green: { bg: 'rgba(76,175,80,0.1)', text: '#4caf50', border: 'rgba(76,175,80,0.2)' },
  medium: { bg: 'rgba(255,152,0,0.1)', text: '#ff9800', border: 'rgba(255,152,0,0.2)' },
  critical: { bg: 'rgba(255,68,68,0.1)', text: '#ff4444', border: 'rgba(255,68,68,0.25)' },
};

export default function ProductCard({ item, onPress }) {
  const status = STATUS_COLORS[item.urgency] || STATUS_COLORS.medium;

  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: status.border }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Header: Category & Discount */}
      <View style={styles.header}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <View style={[styles.discountBadge, { backgroundColor: status.bg }]}>
          <Text style={[styles.discountText, { color: status.text }]}>{item.discountPct}% OFF</Text>
        </View>
      </View>

      {/* Main Info */}
      <View style={styles.mainInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.storeRow}>
          <Ionicons name="storefront-outline" size={14} color="#666" />
          <Text style={styles.storeText}>{item.storeName}</Text>
          <View style={styles.dot} />
          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>
      </View>

      {/* Price Block */}
      <View style={s.priceContainer}>
        <View style={s.priceRow}>
          <Text style={s.currentPrice}>₹{item.currentSalePrice}</Text>
          <Text style={s.mrp}>₹{item.mrp}</Text>
        </View>
        <View style={s.saveTag}>
          <Text style={s.saveLabel}>SAVE ₹{item.mrp - item.currentSalePrice}</Text>
        </View>
      </View>

      {/* Footer: Live Distribution Status */}
      <View style={styles.footer}>
        <View style={styles.timerContainer}>
          <Timer endTime={item.saleEnd} urgency={item.urgency} />
        </View>
        
        <View style={styles.distributionLine}>
          <View style={styles.channelBadge}>
            <Ionicons name="people-outline" size={12} color="#888" />
            <Text style={styles.channelText}>B2C</Text>
          </View>
          <View style={styles.channelBadge}>
            <Ionicons name="repeat-outline" size={12} color="#888" />
            <Text style={styles.channelText}>B2B</Text>
          </View>
          <View style={styles.livePulse} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },
  mrp: {
    fontSize: 14,
    color: '#444',
    textDecorationLine: 'line-through',
  },
  saveTag: {
    backgroundColor: 'rgba(76,175,80,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  saveLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#4caf50',
  },
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#141416',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1f1f23',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  discountBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '900',
  },
  mainInfo: {
    marginBottom: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  storeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#333',
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1f1f23',
    paddingTop: 12,
  },
  timerContainer: {
    flex: 1,
  },
  distributionLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  channelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  channelText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#888',
  },
  livePulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3e63dd',
    marginLeft: 4,
  },
});
