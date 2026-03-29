import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';

const { width } = Dimensions.get('window');

const MOCK_PRODUCTS = [
  {
    _id: '1',
    name: 'Amul Butter 500g',
    storeName: 'Sharma Provisions',
    currentSalePrice: 40,
    mrp: 56,
    discountPct: 29,
    saleEnd: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
    distance: '0.8 km',
    category: 'Dairy',
    urgency: 'medium',
  },
  {
    _id: '2',
    name: 'Whole Wheat Bread',
    storeName: 'Daily Fresh Mart',
    currentSalePrice: 22,
    mrp: 38,
    discountPct: 42,
    saleEnd: new Date(Date.now() + 25 * 60 * 1000).toISOString(),
    distance: '0.3 km',
    category: 'Bakery',
    urgency: 'critical',
  },
  {
    _id: '3',
    name: 'Tata Tea Gold 250g',
    storeName: 'Kirana Corner',
    currentSalePrice: 95,
    mrp: 120,
    discountPct: 21,
    saleEnd: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
    distance: '1.2 km',
    category: 'Beverages',
    urgency: 'green',
  },
  {
    _id: '4',
    name: 'Maggi 2-Min Noodles (4pack)',
    storeName: 'Quick Stop',
    currentSalePrice: 38,
    mrp: 52,
    discountPct: 27,
    saleEnd: new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
    distance: '1.8 km',
    category: 'Instant Food',
    urgency: 'medium',
  },
  {
    _id: '5',
    name: 'Parle-G Biscuits 800g',
    storeName: 'RS General Store',
    currentSalePrice: 65,
    mrp: 90,
    discountPct: 28,
    saleEnd: new Date(Date.now() + 40 * 60 * 1000).toISOString(),
    distance: '0.5 km',
    category: 'Snacks',
    urgency: 'critical',
  },
];

export default function HomeScreen({ navigation }) {
  const [products] = useState(MOCK_PRODUCTS);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const criticalCount = products.filter((p) => p.urgency === 'critical').length;

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <SafeAreaView style={styles.headerSafe}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>T<Text style={styles.logoAccent}>2</Text>B</Text>
            <Text style={styles.headerLoc}>Anna Nagar, Chennai</Text>
          </View>
          <TouchableOpacity 
            style={styles.cartBtn} 
            onPress={() => navigation.navigate('Cart')}
          >
            <Ionicons name="cart-outline" size={24} color="#fff" />
            <View style={styles.cartBadge} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.heroSection}>
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={20} color="#555" />
              <Text style={styles.searchPlaceholder}>Search nearby deals...</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statVal}>{products.length}</Text>
                <Text style={styles.statLbl}>Active Deals</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statVal, { color: '#ff4444' }]}>{criticalCount}</Text>
                <Text style={styles.statLbl}>Expiring</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statVal}>2km</Text>
                <Text style={styles.statLbl}>Radius</Text>
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Opportunities</Text>
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <Animated.View style={{ opacity: fadeAnim }}>
            <ProductCard
              item={item}
              onPress={() => navigation.navigate('Product', { product: item })}
            />
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0c',
  },
  headerSafe: {
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
  logo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
  },
  logoAccent: {
    color: '#3e63dd',
  },
  headerLoc: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginTop: -2,
  },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#141416',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f1f23',
  },
  cartBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4444',
    borderWidth: 1.5,
    borderColor: '#141416',
  },
  listContent: {
    paddingBottom: 40,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141416',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1f1f23',
    marginBottom: 24,
    gap: 12,
  },
  searchPlaceholder: {
    color: '#444',
    fontSize: 14,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141416',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1f1f23',
    marginBottom: 32,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#1f1f23',
  },
  statVal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  statLbl: {
    fontSize: 10,
    color: '#666',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(76,175,80,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4caf50',
  },
  liveText: {
    color: '#4caf50',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
