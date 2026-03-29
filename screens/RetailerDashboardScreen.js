import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Timer from '../components/Timer';

const MOCK_INVENTORY = [
  {
    _id: 'r1', barcode: '8901030793615', name: 'Amul Butter 500g',
    mrp: 56, currentSalePrice: 40, stock: 12,
    saleEnd: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
    urgency: 'medium', category: 'Dairy', isActive: true,
  },
  {
    _id: 'r2', barcode: '8901063095250', name: 'Tata Tea Gold 250g',
    mrp: 120, currentSalePrice: 95, stock: 8,
    saleEnd: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
    urgency: 'green', category: 'Beverages', isActive: true,
  },
  {
    _id: 'r3', barcode: '8901725181512', name: 'Fortune Sunflower Oil 1L',
    mrp: 145, currentSalePrice: 110, stock: 3,
    saleEnd: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
    urgency: 'critical', category: 'Cooking', isActive: true,
  },
];

const STATUS_COLORS = {
  green: { color: '#4caf50', border: 'rgba(76,175,80,0.2)' },
  medium: { color: '#ff9800', border: 'rgba(255,152,0,0.2)' },
  critical: { color: '#ff4444', border: 'rgba(255,68,68,0.25)' },
};

export default function RetailerDashboardScreen({ navigation }) {
  const [inventory] = useState(MOCK_INVENTORY);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.header}>
          <View style={styles.merchantInfo}>
            <View style={styles.avatar}>
              <Ionicons name="storefront" size={20} color="#3e63dd" />
            </View>
            <View>
              <Text style={styles.merchantName}>Sharma Provisions</Text>
              <Text style={styles.merchantLoc}>Anna Nagar, Chennai</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={22} color="#666" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Performance Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>OVERVIEW</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>{inventory.length}</Text>
              <Text style={styles.statLbl}>Active Sales</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>₹4,280</Text>
              <Text style={styles.statLbl}>Daily Revenue</Text>
            </View>
          </View>
        </View>

        {/* Primary Actions */}
        <View style={styles.actionGrid}>
          <TouchableOpacity 
            style={styles.mainAction}
            onPress={() => navigation.navigate('RetailerScan')}
          >
            <Ionicons name="camera" size={28} color="#fff" />
            <Text style={styles.mainActionText}>Scan to List</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.subAction}
            onPress={() => navigation.navigate('B2B')}
          >
            <Ionicons name="swap-horizontal" size={24} color="#3e63dd" />
            <Text style={styles.subActionText}>B2B Marketplace</Text>
          </TouchableOpacity>
        </View>

        {/* Coming Soon: Restaurants */}
        <View style={styles.teaserCard}>
          <View style={styles.teaserIcon}>
            <Ionicons name="restaurant-outline" size={22} color="#888" />
          </View>
          <View style={styles.teaserContent}>
            <Text style={styles.teaserTitle}>Restaurant Connections</Text>
            <Text style={styles.teaserSub}>COMING SOON</Text>
            <Text style={styles.teaserDesc}>Direct bulk supply to local Horeca partners.</Text>
          </View>
        </View>

        {/* Active Inventory List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>MANAGED INVENTORY</Text>
            <Text style={styles.countText}>{inventory.length} Active</Text>
          </View>

          {inventory.map((item) => {
            const status = STATUS_COLORS[item.urgency] || STATUS_COLORS.medium;
            return (
              <View key={item._id} style={[styles.itemCard, { borderColor: status.border }]}>
                <View style={styles.itemMain}>
                  <View>
                    <Text style={styles.itemCat}>{item.category}</Text>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemBar}>{item.barcode}</Text>
                  </View>
                  <View style={styles.itemPrice}>
                    <Text style={[styles.priceTag, { color: status.color }]}>₹{item.currentSalePrice}</Text>
                    <Text style={styles.mrpTag}>₹{item.mrp}</Text>
                  </View>
                </View>
                <View style={styles.itemFooter}>
                  <View style={styles.stockInfo}>
                    <Text style={styles.stockLbl}>Stock:</Text>
                    <Text style={styles.stockVal}>{item.stock} Units</Text>
                  </View>
                  <Timer endTime={item.saleEnd} urgency={item.urgency} />
                </View>
              </View>
            );
          })}
        </View>

        {/* System Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.pulse} />
          <Text style={styles.statusMsg}>Automated Lifecycle Engine is active. 14 distribution signals sent in the last 1h.</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0c',
  },
  safeHeader: {
    backgroundColor: '#0a0a0c',
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f23',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  merchantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(62, 99, 221, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  merchantName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  merchantLoc: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginTop: -1,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#141416',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f1f23',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#444',
    letterSpacing: 2,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#141416',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1f1f23',
  },
  statVal: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  statLbl: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
    marginTop: 2,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  mainAction: {
    flex: 2,
    backgroundColor: '#3e63dd',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  mainActionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  subAction: {
    flex: 1,
    backgroundColor: '#141416',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1f1f23',
    gap: 8,
  },
  subActionText: {
    color: '#3e63dd',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  teaserCard: {
    flexDirection: 'row',
    backgroundColor: '#111113',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1f1f23',
    marginBottom: 24,
    gap: 16,
  },
  teaserIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1a1a1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teaserContent: {
    flex: 1,
  },
  teaserTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#eee',
    marginBottom: 2,
  },
  teaserSub: {
    fontSize: 9,
    fontWeight: '900',
    color: '#3e63dd',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  teaserDesc: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  countText: {
    fontSize: 11,
    color: '#444',
    fontWeight: '700',
  },
  itemCard: {
    backgroundColor: '#141416',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1f1f23',
    marginBottom: 10,
  },
  itemMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemCat: {
    fontSize: 10,
    fontWeight: '800',
    color: '#3e63dd',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  itemBar: {
    fontSize: 11,
    color: '#444',
    fontVariant: ['tabular-nums'],
  },
  itemPrice: {
    alignItems: 'flex-end',
  },
  priceTag: {
    fontSize: 20,
    fontWeight: '800',
  },
  mrpTag: {
    fontSize: 12,
    color: '#444',
    textDecorationLine: 'line-through',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1f1f23',
    paddingTop: 12,
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stockLbl: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  stockVal: {
    fontSize: 13,
    color: '#eee',
    fontWeight: '800',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(62, 99, 221, 0.03)',
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    gap: 12,
  },
  pulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3e63dd',
  },
  statusMsg: {
    flex: 1,
    fontSize: 11,
    color: '#555',
    lineHeight: 16,
    fontWeight: '500',
  },
});
