import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SURPLUS_INVENTORY = [
  {
    id: 's1',
    merchant: 'Sharma Provisions',
    product: 'Amul Butter 500g',
    qty: 45,
    bulkPrice: 38,
    mrp: 56,
    expiry: '2026-04-10',
    distance: '0.8 km',
    category: 'Dairy',
  },
  {
    id: 's2',
    merchant: 'Daily Fresh Mart',
    product: 'Whole Wheat Bread',
    qty: 120,
    bulkPrice: 16,
    mrp: 38,
    expiry: '2026-03-31',
    distance: '0.3 km',
    category: 'Bakery',
  },
  {
    id: 's3',
    merchant: 'Metro Grocery',
    product: 'Tata Tea Gold 250g',
    qty: 25,
    bulkPrice: 82,
    mrp: 120,
    expiry: '2026-12-01',
    distance: '1.4 km',
    category: 'Beverages',
  },
];

export default function B2BSupplyHub({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={s.container}>
      <SafeAreaView style={s.safeHeader}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.replace('RoleSelect')} style={s.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#666" />
          </TouchableOpacity>
          <View style={s.headerCenter}>
            <Text style={s.headerTitle}>B2B Supply Hub</Text>
            <Text style={s.headerSub}>Inter-Merchant Marketplace</Text>
          </View>
          <View style={s.activeBadge}>
            <View style={s.pulse} />
            <Text style={s.activeText}>LIVE</Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        
        {/* Market Overview */}
        <View style={s.overview}>
          <View style={s.statBox}>
            <Text style={s.statVal}>₹2.4L</Text>
            <Text style={s.statLbl}>Trade Volume</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statVal}>18</Text>
            <Text style={s.statLbl}>Active Merchants</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statVal}>4.2k</Text>
            <Text style={s.statLbl}>Units Available</Text>
          </View>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.catScroll}>
          {['All', 'Dairy', 'Bakery', 'Beverages', 'Grains', 'FMCG'].map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[s.catChip, activeCategory === cat && s.catChipOn]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[s.catText, activeCategory === cat && s.catTextOn]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Listings Section */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>AVAILABLE SURPLUS</Text>
          
          {SURPLUS_INVENTORY.map(item => (
            <Animated.View key={item.id} style={[s.listingCard, { opacity: fadeAnim }]}>
              <View style={s.cardTop}>
                <View style={s.merchantRow}>
                  <View style={s.merchantIcon}>
                    <Ionicons name="business-outline" size={16} color="#3e63dd" />
                  </View>
                  <Text style={s.merchantName}>{item.merchant}</Text>
                  <Text style={s.distance}>• {item.distance}</Text>
                </View>
                <View style={s.expiryBadge}>
                  <Text style={s.expiryText}>EXP: {item.expiry}</Text>
                </View>
              </View>

              <View style={s.cardMain}>
                <View style={s.productInfo}>
                  <Text style={s.productName}>{item.product}</Text>
                  <Text style={s.category}>{item.category} Surplus</Text>
                </View>
                <View style={s.priceInfo}>
                  <Text style={s.bulkLabel}>BULK PRICE</Text>
                  <Text style={s.bulkPrice}>₹{item.bulkPrice}</Text>
                  <Text style={s.mrpLine}>MRP ₹{item.mrp}</Text>
                </View>
              </View>

              <View style={s.cardFooter}>
                <View style={s.stockBarContainer}>
                  <Text style={s.stockLabel}>Available: {item.qty} units</Text>
                  <View style={s.stockBar}>
                    <View style={[s.stockFill, { width: '65%' }]} />
                  </View>
                </View>
                <TouchableOpacity style={s.bidBtn}>
                  <Text style={s.bidBtnText}>Request Trade</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Horeca / Restaurant Teaser */}
        <View style={s.teaserSection}>
          <Text style={s.sectionLabel}>STRATEGIC INTEGRATIONS</Text>
          <View style={s.teaserCard}>
            <View style={s.teaserGraphic}>
              <Ionicons name="restaurant" size={32} color="#444" />
            </View>
            <View style={s.teaserInfo}>
              <View style={s.teaserHeader}>
                <Text style={s.teaserTitle}>Restaurant Connections</Text>
                <View style={s.comingSoon}>
                  <Text style={s.comingSoonText}>COMING SOON</Text>
                </View>
              </View>
              <Text style={s.teaserDesc}>
                Open direct supply channels to local Horeca partners. Automate daily bulk deliveries and minimize retail waste through institutional volume.
              </Text>
              <View style={s.teaserProgress}>
                <View style={[s.progressBar, { width: '80%' }]} />
                <Text style={s.progressText}>Beta Testing (Phase 3)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Algorithm Summary */}
        <View style={s.algoBox}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#4caf50" />
          <Text style={s.algoText}>
            T2B Parallel Engine ensures all trades are compliant with local inventory lifecycle standards.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141416',
  },
  headerCenter: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  headerSub: {
    fontSize: 11,
    color: '#444',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76,175,80,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  pulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4caf50',
  },
  activeText: {
    color: '#4caf50',
    fontSize: 9,
    fontWeight: '900',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  overview: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#141416',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1f1f23',
    alignItems: 'center',
  },
  statVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  statLbl: {
    fontSize: 9,
    color: '#444',
    fontWeight: '700',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  catScroll: {
    marginBottom: 24,
  },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#141416',
    borderWidth: 1,
    borderColor: '#1f1f23',
    marginRight: 8,
  },
  catChipOn: {
    backgroundColor: '#3e63dd',
    borderColor: '#3e63dd',
  },
  catText: {
    color: '#666',
    fontSize: 13,
    fontWeight: '600',
  },
  catTextOn: {
    color: '#fff',
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#333',
    letterSpacing: 2,
    marginBottom: 16,
  },
  listingCard: {
    backgroundColor: '#141416',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1f1f23',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  merchantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  merchantIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: 'rgba(62,99,221,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  merchantName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#eee',
  },
  distance: {
    fontSize: 12,
    color: '#444',
  },
  expiryBadge: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  expiryText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#666',
  },
  cardMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  bulkLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#333',
    letterSpacing: 1,
  },
  bulkPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  mrpLine: {
    fontSize: 11,
    color: '#333',
    textDecorationLine: 'line-through',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#1f1f23',
    paddingTop: 16,
  },
  stockBarContainer: {
    flex: 1,
  },
  stockLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
    marginBottom: 6,
  },
  stockBar: {
    height: 4,
    backgroundColor: '#1f1f23',
    borderRadius: 2,
  },
  stockFill: {
    height: '100%',
    backgroundColor: '#3e63dd',
    borderRadius: 2,
  },
  bidBtn: {
    backgroundColor: '#1a1a1c',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  bidBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  teaserSection: {
    marginBottom: 32,
  },
  teaserCard: {
    backgroundColor: '#111113',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1f1f23',
    flexDirection: 'row',
    gap: 20,
  },
  teaserGraphic: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#1a1a1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teaserInfo: {
    flex: 1,
  },
  teaserHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  teaserTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  comingSoon: {
    backgroundColor: 'rgba(62,99,221,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  comingSoonText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#3e63dd',
    letterSpacing: 1,
  },
  teaserDesc: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    marginBottom: 16,
  },
  teaserProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 3,
    backgroundColor: '#1f1f23',
    borderRadius: 1.5,
  },
  progressText: {
    fontSize: 10,
    color: '#444',
    fontWeight: '700',
  },
  algoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(76,175,80,0.03)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.08)',
  },
  algoText: {
    flex: 1,
    fontSize: 12,
    color: '#444',
    lineHeight: 18,
    fontWeight: '500',
  },
});
