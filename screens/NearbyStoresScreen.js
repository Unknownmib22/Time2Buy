import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StoreCard from '../components/StoreCard';

const MOCK_STORES = [
  {
    id: 's1', name: 'Sharma Provisions', distance: '0.8 km',
    rating: 4.5, activeDeals: 3,
    topProducts: ['Dairy', 'Snacks', 'Beverages'],
  },
  {
    id: 's2', name: 'Daily Fresh Mart', distance: '0.3 km',
    rating: 4.2, activeDeals: 2,
    topProducts: ['Bakery', 'Dairy'],
  },
  {
    id: 's3', name: 'Kirana Corner', distance: '1.2 km',
    rating: 4.7, activeDeals: 4,
    topProducts: ['Beverages', 'Cooking', 'Spices'],
  },
];

export default function NearbyStoresScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Merchant Radar</Text>
            <Text style={styles.headerSub}>Anna Nagar, Chennai</Text>
          </View>
          <View style={styles.rangeBadge}>
            <Text style={styles.rangeText}>2KM RADIUS</Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{MOCK_STORES.length}</Text>
            <Text style={styles.statLbl}>Active Hubs</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statVal, { color: '#4caf50' }]}>
              {MOCK_STORES.reduce((s, st) => s + st.activeDeals, 0)}
            </Text>
            <Text style={styles.statLbl}>Live Deals</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.mapEntry}
          onPress={() => navigation.navigate('MapTab')}
        >
          <View style={styles.mapIcon}>
            <Ionicons name="map-outline" size={32} color="#3e63dd" />
          </View>
          <View style={styles.mapInfo}>
            <Text style={styles.mapTitle}>Visual Radar Map</Text>
            <Text style={styles.mapSub}>View merchants and demand heatmaps</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PARTNER MERCHANTS</Text>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>SIGNAL ACTIVE</Text>
          </View>
        </View>

        {MOCK_STORES.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            onPress={() => navigation.navigate('Deals')}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0c' },
  safeHeader: { borderBottomWidth: 1, borderBottomColor: '#1f1f23' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  headerSub: { color: '#444', fontSize: 12, marginTop: 2 },
  rangeBadge: { backgroundColor: 'rgba(62,99,221,0.1)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  rangeText: { color: '#3e63dd', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  scroll: { flex: 1 },
  content: { padding: 24 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statBox: { flex: 1, backgroundColor: '#141416', padding: 16, borderRadius: 16, borderWIdth: 1, borderColor: '#1f1f23', alignItems: 'center' },
  statVal: { color: '#fff', fontSize: 22, fontWeight: '800' },
  statLbl: { color: '#444', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', marginTop: 4 },
  mapEntry: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#141416', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#1f1f23', marginBottom: 32 },
  mapIcon: { width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(62,99,221,0.05)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  mapInfo: { flex: 1 },
  mapTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 2 },
  mapSub: { color: '#666', fontSize: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { color: '#333', fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  liveIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4caf50' },
  liveText: { color: '#4caf50', fontSize: 9, fontWeight: '900' },
});
