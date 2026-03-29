import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StoreCard({ store, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Ionicons name="storefront" size={20} color="#3e63dd" />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{store.name}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={12} color="#444" />
            <Text style={styles.meta}>{store.distance} • {store.activeDeals} Active Deals</Text>
          </View>
        </View>
        <View style={styles.ratingBox}>
          <Ionicons name="star" size={10} color="#ffdd57" />
          <Text style={styles.ratingText}>{store.rating}</Text>
        </View>
      </View>
      
      <View style={styles.tagRow}>
        {store.topProducts?.map((label, i) => (
          <View key={i} style={styles.tag}>
            <Text style={styles.tagText}>{label}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#141416', borderRadius: 20, padding: 20, marginBottom: 12, borderWidth: 1, borderColor: '#1f1f23' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  iconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(62,99,221,0.05)', justifyContent: 'center', alignItems: 'center' },
  info: { flex: 1 },
  name: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  meta: { color: '#444', fontSize: 12, fontWeight: '500' },
  ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,221,87,0.05)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { color: '#ffdd57', fontSize: 11, fontWeight: '800' },
  tagRow: { flexDirection: 'row', gap: 6, marginTop: 16 },
  tag: { backgroundColor: '#111113', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#1f1f23' },
  tagText: { color: '#666', fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
});
