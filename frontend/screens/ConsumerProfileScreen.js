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

const ORDER_HISTORY = [
  {
    id: 'o1',
    date: '29 Mar 2026',
    items: 'Amul Butter 500g × 2, Bread × 1',
    store: 'Sharma Provisions',
    total: 102,
    saved: 50,
    status: 'COMPLETED',
  },
  {
    id: 'o2',
    date: '27 Mar 2026',
    items: 'Tata Tea Gold 250g × 1',
    store: 'Kirana Corner',
    total: 95,
    saved: 25,
    status: 'COMPLETED',
  },
];

export default function ConsumerProfileScreen({ navigation }) {
  const totalSaved = ORDER_HISTORY.reduce((s, o) => s + o.saved, 0);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.header}>
          <View style={styles.profileSummary}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>J</Text>
            </View>
            <View>
              <Text style={styles.userName}>Jaya Subramanian</Text>
              <View style={styles.locRow}>
                <Ionicons name="location-outline" size={12} color="#666" />
                <Text style={styles.userLoc}>Anna Nagar, Chennai</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={22} color="#666" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{ORDER_HISTORY.length}</Text>
            <Text style={styles.statLbl}>Acquisitions</Text>
          </View>
          <View style={[styles.statBox, styles.statBoxAccent]}>
            <Text style={[styles.statVal, { color: '#4caf50' }]}>₹{totalSaved}</Text>
            <Text style={styles.statLbl}>Waste Value Saved</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>LIFECYCLE HISTORY</Text>
        </View>

        {ORDER_HISTORY.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderTop}>
              <View>
                <Text style={styles.orderDate}>{order.date}</Text>
                <View style={styles.storeRow}>
                  <Ionicons name="storefront-outline" size={12} color="#444" />
                  <Text style={styles.orderStore}>{order.store}</Text>
                </View>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
            </View>
            <Text style={styles.orderItems}>{order.items}</Text>
            <View style={styles.orderBottom}>
              <Text style={styles.orderTotal}>Total: ₹{order.total}</Text>
              <View style={styles.savingsRow}>
                <Ionicons name="trending-down" size={14} color="#4caf50" />
                <Text style={styles.orderSaved}>Saved ₹{order.saved}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.replace('RoleSelect')}>
            <Ionicons name="swap-horizontal" size={20} color="#3e63dd" />
            <Text style={styles.actionText}>Switch to Merchant Mode</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtnSec}>
            <Ionicons name="log-out-outline" size={20} color="#444" />
            <Text style={styles.actionTextSec}>Secure Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>T2B PARALLEL ENGINE v1.2.4</Text>
          <Text style={styles.footerText}>PROUDLY REDUCING LOCAL FOOD WASTE</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0c' },
  safeHeader: { borderBottomWidth: 1, borderBottomColor: '#1f1f23' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  profileSummary: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  avatar: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#141416', borderWidth: 1, borderColor: '#1f1f23', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#3e63dd', fontSize: 20, fontWeight: '800' },
  userName: { color: '#fff', fontSize: 17, fontWeight: '700' },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  userLoc: { color: '#444', fontSize: 12 },
  settingsBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#141416', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1f1f23' },
  content: { padding: 24 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  statBox: { flex: 1, backgroundColor: '#141416', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#1f1f23' },
  statBoxAccent: { borderColor: 'rgba(76,175,80,0.1)' },
  statVal: { color: '#fff', fontSize: 24, fontWeight: '800' },
  statLbl: { color: '#444', fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 },
  sectionHeader: { marginBottom: 16 },
  sectionTitle: { color: '#333', fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  orderCard: { backgroundColor: '#141416', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#1f1f23', marginBottom: 12 },
  orderTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  orderDate: { color: '#eee', fontSize: 14, fontWeight: '700' },
  storeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  orderStore: { color: '#444', fontSize: 12 },
  statusBadge: { backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { color: '#666', fontSize: 9, fontWeight: '900' },
  orderItems: { color: '#666', fontSize: 13, marginBottom: 16 },
  orderBottom: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#1f1f23', paddingTop: 16 },
  orderTotal: { color: '#fff', fontSize: 14, fontWeight: '700' },
  savingsRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  orderSaved: { color: '#4caf50', fontSize: 13, fontWeight: '800' },
  actionSection: { marginTop: 32, gap: 12 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: 'rgba(62,99,221,0.05)', paddingVertical: 16, borderRadius: 16, borderWIdth: 1, borderColor: 'rgba(62,99,221,0.1)' },
  actionText: { color: '#3e63dd', fontSize: 14, fontWeight: '700' },
  actionBtnSec: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16 },
  actionTextSec: { color: '#444', fontSize: 14, fontWeight: '600' },
  footerInfo: { marginTop: 40, alignItems: 'center', opacity: 0.3 },
  footerText: { color: '#666', fontSize: 9, fontWeight: '800', letterSpacing: 1, marginBottom: 4 },
});
