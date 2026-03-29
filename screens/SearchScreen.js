import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';

const ALL_PRODUCTS = [
  {
    _id: '1', name: 'Amul Butter 500g', storeName: 'Sharma Provisions',
    currentSalePrice: 40, mrp: 56, discountPct: 29,
    saleEnd: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
    distance: '0.8 km', category: 'Dairy', urgency: 'medium',
  },
  {
    _id: '2', name: 'Whole Wheat Bread', storeName: 'Daily Fresh Mart',
    currentSalePrice: 22, mrp: 38, discountPct: 42,
    saleEnd: new Date(Date.now() + 25 * 60 * 1000).toISOString(),
    distance: '0.3 km', category: 'Bakery', urgency: 'critical',
  },
  {
    _id: '3', name: 'Tata Tea Gold 250g', storeName: 'Kirana Corner',
    currentSalePrice: 95, mrp: 120, discountPct: 21,
    saleEnd: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
    distance: '1.2 km', category: 'Beverages', urgency: 'green',
  },
];

const CATEGORIES = ['All', 'Dairy', 'Bakery', 'Beverages', 'Snacks', 'Instant Food', 'Cooking'];
const SORT_OPTIONS = [
  { key: 'distance', label: 'Distance' },
  { key: 'timeLeft', label: 'Time Left' },
  { key: 'discount', label: 'Discount %' },
];

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('distance');

  const filtered = ALL_PRODUCTS
    .filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.storeName.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#666" />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Search products..."
              placeholderTextColor="#444"
              value={query}
              onChangeText={setQuery}
              autoFocus
            />
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.catChip, selectedCategory === cat && styles.catChipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.catText, selectedCategory === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sortRow}>
          {SORT_OPTIONS.map(opt => (
            <TouchableOpacity 
              key={opt.key} 
              style={[styles.sortBtn, selectedSort === opt.key && styles.sortBtnActive]}
              onPress={() => setSelectedSort(opt.key)}
            >
              <Text style={[styles.sortBtnText, selectedSort === opt.key && styles.sortBtnTextActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => navigation.navigate('Product', { product: item })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={48} color="#1f1f23" />
            <Text style={styles.emptyTitle}>No matching deals</Text>
            <Text style={styles.emptySub}>Refine your search or category filters</Text>
          </View>
        }
      />
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141416',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141416',
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#1f1f23',
  },
  input: {
    flex: 1,
    height: 44,
    color: '#fff',
    fontSize: 15,
  },
  filterSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f23',
  },
  catScroll: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
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
  catChipActive: {
    backgroundColor: '#3e63dd',
    borderColor: '#3e63dd',
  },
  catText: {
    color: '#666',
    fontSize: 13,
    fontWeight: '600',
  },
  catTextActive: {
    color: '#fff',
  },
  sortRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  sortBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#141416',
  },
  sortBtnActive: {
    backgroundColor: 'rgba(62, 99, 221, 0.1)',
  },
  sortBtnText: {
    color: '#444',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  sortBtnTextActive: {
    color: '#3e63dd',
  },
  list: {
    padding: 16,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginTop: 16,
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 13,
    color: '#444',
  },
});
