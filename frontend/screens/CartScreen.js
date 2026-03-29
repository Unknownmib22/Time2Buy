import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Timer from '../components/Timer';

const MOCK_CART = [
  {
    _id: 'c1',
    name: 'Amul Butter 500g',
    storeName: 'Sharma Provisions',
    currentSalePrice: 40,
    mrp: 56,
    quantity: 2,
    saleEnd: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
    urgency: 'medium',
  },
  {
    _id: 'c2',
    name: 'Whole Wheat Bread',
    storeName: 'Daily Fresh Mart',
    currentSalePrice: 22,
    mrp: 38,
    quantity: 1,
    saleEnd: new Date(Date.now() + 25 * 60 * 1000).toISOString(),
    urgency: 'critical',
  },
];

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState(MOCK_CART);

  const subtotal = cartItems.reduce((s, i) => s + i.currentSalePrice * i.quantity, 0);
  const totalMrp = cartItems.reduce((s, i) => s + i.mrp * i.quantity, 0);
  const savings = totalMrp - subtotal;

  const updateQuantity = (id, delta) => {
    setCartItems(
      cartItems
        .map((item) =>
          item._id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckout = () => {
    Alert.alert(
      'Order Confirmed',
      `Pick up your items at the merchant locations. You saved ₹${savings}.`,
      [{ text: 'OK', onPress: () => setCartItems([]) }]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#666" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shopping Bag</Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <View style={styles.itemMain}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.storeRow}>
                      <Ionicons name="storefront-outline" size={14} color="#666" />
                      <Text style={styles.storeText}>{item.storeName}</Text>
                    </View>
                  </View>
                  <View style={styles.itemPricing}>
                    <Text style={styles.itemPrice}>₹{item.currentSalePrice * item.quantity}</Text>
                    <Text style={styles.itemMrp}>₹{item.mrp * item.quantity}</Text>
                  </View>
                </View>

                <View style={styles.itemFooter}>
                  <View style={styles.timerWrap}>
                    <Timer endTime={item.saleEnd} urgency={item.urgency} />
                  </View>
                  <View style={styles.qtyCtrl}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item._id, -1)}>
                      <Ionicons name="remove" size={18} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.qtyVal}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item._id, 1)}>
                      <Ionicons name="add" size={18} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />

          <View style={styles.footer}>
            <View style={styles.summary}>
              <View style={styles.summaryLine}>
                <Text style={styles.summaryLabel}>Order Total</Text>
                <Text style={styles.summaryVal}>₹{subtotal}</Text>
              </View>
              <View style={styles.summaryLine}>
                <Text style={styles.savingsLabel}>Total Savings</Text>
                <Text style={styles.savingsVal}>₹{savings}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.empty}>
          <Ionicons name="cart-outline" size={64} color="#1f1f23" />
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptySub}>Nearby merchant deals are expiring soon.</Text>
          <TouchableOpacity style={styles.browseBtn} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.browseText}>Discover Deals</Text>
          </TouchableOpacity>
        </View>
      )}
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
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  list: {
    padding: 20,
  },
  itemCard: {
    backgroundColor: '#141416',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1f1f23',
  },
  itemMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
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
  },
  itemPricing: {
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  itemMrp: {
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
    paddingTop: 16,
  },
  timerWrap: {
    flex: 1,
  },
  qtyCtrl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1c',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1f1f23',
    padding: 4,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    paddingHorizontal: 8,
    minWidth: 30,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    backgroundColor: '#0a0a0c',
    borderTopWidth: 1,
    borderTopColor: '#1f1f23',
  },
  summary: {
    marginBottom: 20,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
  savingsLabel: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: '700',
  },
  savingsVal: {
    fontSize: 16,
    fontWeight: '900',
    color: '#4caf50',
  },
  checkoutBtn: {
    backgroundColor: '#3e63dd',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 32,
  },
  browseBtn: {
    backgroundColor: 'rgba(62, 99, 221, 0.1)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(62, 99, 221, 0.2)',
  },
  browseText: {
    color: '#3e63dd',
    fontSize: 15,
    fontWeight: '700',
  },
});
