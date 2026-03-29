import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAP_SIZE = Math.min(SCREEN_WIDTH - 40, 380);
const CENTER = MAP_SIZE / 2;
const RADIUS_PX = MAP_SIZE / 2 - 20;

const STORES_ON_MAP = [
  { id: 's1', name: 'Sharma Provisions', dist: 0.8, deals: 3, color: '#ff9800' },
  { id: 's2', name: 'Daily Fresh Mart', dist: 0.3, deals: 2, color: '#ff4444' },
  { id: 's3', name: 'Kirana Corner', dist: 1.2, deals: 4, color: '#4caf50' },
  { id: 's4', name: 'Quick Stop', dist: 1.8, deals: 1, color: '#ff9800' },
  { id: 's5', name: 'RS General Store', dist: 0.5, deals: 2, color: '#ff4444' },
];

function storeToPixel(store, index) {
  const angle = (index / STORES_ON_MAP.length) * 2 * Math.PI - Math.PI / 2;
  const distRatio = store.dist / 2;
  const r = distRatio * RADIUS_PX;
  return {
    x: CENTER + r * Math.cos(angle),
    y: CENTER + r * Math.sin(angle),
  };
}

export default function MapViewScreen({ navigation }) {
  const [selectedStore, setSelectedStore] = useState(null);
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scanAnim, { toValue: 1, duration: 4000, useNativeDriver: false })
    ).start();
  }, []);

  const scanRotation = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={s.container}>
      <SafeAreaView style={s.safeHeader}>
        <View style={s.header}>
          <View>
            <Text style={s.headerTitle}>Inventory Radar</Text>
            <Text style={s.headerSub}>Scanning 2km radius around you</Text>
          </View>
          <View style={s.liveBadge}>
            <View style={s.liveDot} />
            <Text style={s.liveText}>LIVE</Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={s.content}>
        <View style={s.mapBox}>
          <View style={[s.map, { width: MAP_SIZE, height: MAP_SIZE }]}>
            {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
              <View key={i} style={[s.ring, {
                width: RADIUS_PX * 2 * ratio,
                height: RADIUS_PX * 2 * ratio,
                borderRadius: RADIUS_PX * ratio,
                left: CENTER - RADIUS_PX * ratio,
                top: CENTER - RADIUS_PX * ratio,
              }]} />
            ))}
            
            <Animated.View style={[s.scan, { left: CENTER, top: CENTER, transform: [{ rotate: scanRotation }] }]}>
              <View style={s.scanLine} />
            </Animated.View>

            <View style={[s.userDot, { left: CENTER - 6, top: CENTER - 6 }]} />

            {STORES_ON_MAP.map((store, idx) => {
              const pos = storeToPixel(store, idx);
              return (
                <TouchableOpacity
                  key={store.id}
                  style={[s.pin, { left: pos.x - 16, top: pos.y - 16, borderColor: store.color }]}
                  onPress={() => setSelectedStore(store)}
                >
                  <Ionicons name="storefront" size={14} color={store.color} />
                  <View style={[s.badge, { backgroundColor: store.color }]}>
                    <Text style={s.badgeText}>{store.deals}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {selectedStore ? (
          <View style={s.detailCard}>
            <View style={s.detailTop}>
              <View>
                <Text style={s.detailName}>{selectedStore.name}</Text>
                <Text style={s.detailDist}>Approx. {selectedStore.dist}km from your location</Text>
              </View>
              <TouchableOpacity style={s.viewBtn} onPress={() => navigation.navigate('Deals')}>
                <Text style={s.viewBtnText}>View Store</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={s.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color="#444" />
            <Text style={s.infoText}>Tap a merchant pin to view active surplus inventory and expiration timers.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0c' },
  safeHeader: { borderBottomWidth: 1, borderBottomColor: '#1f1f23' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  headerSub: { color: '#444', fontSize: 12, marginTop: 2 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(76,175,80,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4caf50' },
  liveText: { color: '#4caf50', fontSize: 10, fontWeight: '800' },
  content: { padding: 20 },
  mapBox: { alignItems: 'center', marginVertical: 30 },
  map: { backgroundColor: '#141416', borderRadius: 200, borderWidth: 1, borderColor: '#1f1f23', overflow: 'hidden' },
  ring: { position: 'absolute', borderWidth: 1, borderColor: '#1f1f23', borderStyle: 'dashed' },
  scan: { position: 'absolute' },
  scanLine: { width: RADIUS_PX, height: 2, backgroundColor: 'rgba(62,99,221,0.2)' },
  userDot: { position: 'absolute', width: 12, height: 12, borderRadius: 6, backgroundColor: '#3e63dd', borderWidth: 2, borderColor: '#fff' },
  pin: { position: 'absolute', width: 32, height: 32, borderRadius: 10, backgroundColor: '#0a0a0c', borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  badge: { position: 'absolute', top: -6, right: -6, minWidth: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '900' },
  detailCard: { backgroundColor: '#141416', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#1f1f23' },
  detailTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailName: { color: '#fff', fontSize: 18, fontWeight: '700' },
  detailDist: { color: '#666', fontSize: 12, marginTop: 2 },
  viewBtn: { backgroundColor: '#3e63dd', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  viewBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  infoBox: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 20, opacity: 0.5 },
  infoText: { flex: 1, color: '#888', fontSize: 13, lineHeight: 20 },
});
