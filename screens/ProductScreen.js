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
import Timer from '../components/Timer';

export default function ProductScreen({ route, navigation }) {
  const { product } = route.params;

  const urgencyColor =
    product.urgency === 'critical'
      ? '#ff4444'
      : product.urgency === 'medium'
      ? '#ff9800'
      : '#4caf50';

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#666" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoSection}>
          <Text style={styles.catText}>{product.category}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.merchantRow}>
            <View style={styles.merchantIcon}>
              <Ionicons name="storefront-outline" size={16} color="#3e63dd" />
            </View>
            <View>
              <Text style={styles.merchantName}>{product.storeName}</Text>
              <Text style={styles.merchantDist}>{product.distance} from you</Text>
            </View>
          </View>
        </View>

        <View style={styles.priceCard}>
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceLbl}>CURRENT BIDDING PRICE</Text>
              <Text style={[styles.priceVal, { color: urgencyColor }]}>₹{product.currentSalePrice}</Text>
            </View>
            <View style={styles.mrpRow}>
              <Text style={styles.mrpLbl}>MRP</Text>
              <Text style={styles.mrpVal}>₹{product.mrp}</Text>
            </View>
          </View>
          <View style={styles.savingsBadge}>
            <Ionicons name="trending-down" size={16} color="#4caf50" />
            <Text style={styles.savingsText}>You save ₹{product.mrp - product.currentSalePrice} instantly</Text>
          </View>
        </View>

        <View style={styles.timerSection}>
          <View style={styles.timerHeader}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.timerTitle}>DEAL EXPIRATION</Text>
          </View>
          <View style={styles.timerBox}>
            <Timer endTime={product.saleEnd} urgency={product.urgency} />
          </View>
          <Text style={styles.timerHint}>Price decays automatically as expiration approaches.</Text>
        </View>

        <View style={styles.algoCard}>
          <View style={styles.algoHeader}>
            <Ionicons name="git-network-outline" size={20} color="#3e63dd" />
            <Text style={styles.algoTitle}>Parallel Distribution Active</Text>
          </View>
          <Text style={styles.algoDesc}>
            This item is simultaneously available to local consumers (B2C) and merchant bulk buyers (B2B). First confirmed transaction secures the stock.
          </Text>
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <View style={s.dot} />
              <Text style={s.dotText}>B2C Live</Text>
            </View>
            <View style={s.divider} />
            <View style={styles.statusItem}>
              <View style={[s.dot, { backgroundColor: '#3e63dd' }]} />
              <Text style={s.dotText}>B2B Matching</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.buyBtn}>
          <Text style={styles.buyText}>Confirm Purchase • ₹{product.currentSalePrice}</Text>
        </TouchableOpacity>

        <View style={styles.complianceBox}>
          <Ionicons name="shield-checkmark-outline" size={16} color="#444" />
          <Text style={styles.complianceText}>T2B Lifecycle Compliance Guaranteed</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4caf50' },
  dotText: { color: '#666', fontSize: 11, fontWeight: '700' },
  divider: { width: 1, height: 20, backgroundColor: '#1f1f23' },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0c' },
  safeHeader: { borderBottomWidth: 1, borderBottomColor: '#1f1f23' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#141416', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 17, fontWeight: '700' },
  content: { padding: 24 },
  infoSection: { marginBottom: 32 },
  catText: { color: '#3e63dd', fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  productName: { color: '#fff', fontSize: 28, fontWeight: '800', marginBottom: 16 },
  merchantRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  merchantIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(62,99,221,0.1)', justifyContent: 'center', alignItems: 'center' },
  merchantName: { color: '#eee', fontSize: 15, fontWeight: '700' },
  merchantDist: { color: '#444', fontSize: 12 },
  priceCard: { backgroundColor: '#141416', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#1f1f23', marginBottom: 16 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 },
  priceLbl: { fontSize: 10, color: '#444', fontWeight: '800', letterSpacing: 1, marginBottom: 6 },
  priceVal: { fontSize: 44, fontWeight: '800' },
  mrpRow: { alignItems: 'flex-end' },
  mrpLbl: { fontSize: 10, color: '#444', fontWeight: '800', marginBottom: 4 },
  mrpVal: { fontSize: 18, color: '#333', textDecorationLine: 'line-through' },
  savingsBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(76,175,80,0.05)', padding: 12, borderRadius: 12 },
  savingsText: { color: '#4caf50', fontSize: 13, fontWeight: '700' },
  timerSection: { backgroundColor: '#141416', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#1f1f23', marginBottom: 16, alignItems: 'center' },
  timerHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  timerTitle: { color: '#444', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  timerBox: { transform: [{ scale: 1.5 }], marginBottom: 10 },
  timerHint: { color: '#333', fontSize: 12, marginTop: 12 },
  algoCard: { backgroundColor: 'rgba(62,99,221,0.02)', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#1f1f23', marginBottom: 32 },
  algoHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  algoTitle: { color: '#fff', fontSize: 15, fontWeight: '700' },
  algoDesc: { color: '#666', fontSize: 13, lineHeight: 20, marginBottom: 20 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#1f1f23', paddingTop: 16 },
  statusItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  buyBtn: { backgroundColor: '#3e63dd', paddingVertical: 20, borderRadius: 20, alignItems: 'center' },
  buyText: { color: '#fff', fontSize: 17, fontWeight: '800' },
  complianceBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24, opacity: 0.5 },
  complianceText: { color: '#444', fontSize: 11, fontWeight: '700' },
});
