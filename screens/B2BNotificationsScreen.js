import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOCK_B2B_NOTIFICATIONS = [
  {
    id: 'b1',
    type: 'demand_match',
    title: 'Inventory Supply Request',
    product: 'Amul Butter 500g',
    retailer: 'Daily Fresh Mart',
    retailerDist: '0.3 km',
    currentStock: 4,
    threshold: 5,
    offerQty: 20,
    offerPrice: 38,
    mrp: 56,
    time: '2 min ago',
    status: 'pending',
    urgency: 'critical',
  },
  {
    id: 'b2',
    type: 'demand_match',
    title: 'Restock Alert: Nearby Surplus',
    product: 'Whole Wheat Bread',
    retailer: 'Quick Stop',
    retailerDist: '1.8 km',
    currentStock: 3,
    threshold: 8,
    offerQty: 30,
    offerPrice: 18,
    mrp: 38,
    time: '15 min ago',
    status: 'pending',
    urgency: 'critical',
  },
];

const STATUS_COLORS = {
  green: '#4caf50',
  medium: '#ff9800',
  critical: '#ff4444',
};

export default function B2BNotificationsScreen() {
  const [notifications, setNotifications] = useState(MOCK_B2B_NOTIFICATIONS);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const handleAccept = (id) => {
    Alert.alert('Trade Initialized', 'Coordinate with the merchant for logistics.');
    setNotifications(notifications.map(n => n.id === id ? { ...n, status: 'accepted' } : n));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>B2B Marketplace</Text>
            <Text style={styles.headerSub}>Retailer-to-Retailer Exchange</Text>
          </View>
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>LIVE ENGINE</Text>
          </View>
        </View>
      </SafeAreaView>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.infoBanner}>
            <Ionicons name="information-circle-outline" size={20} color="#3e63dd" />
            <Text style={styles.infoText}>
              Parallel demand active. Nearby merchants are seeking restock for their low-inventory items.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const statusColor = STATUS_COLORS[item.urgency];
          return (
            <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(62, 99, 221, 0.08)' }]}>
                  <Ionicons name="swap-horizontal" size={20} color="#3e63dd" />
                </View>
                <View style={styles.titleArea}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardTime}>{item.time} • {item.retailerDist}</Text>
                </View>
                <View style={[styles.urgencyDot, { backgroundColor: statusColor }]} />
              </View>

              <View style={styles.body}>
                <View style={styles.field}>
                  <Text style={styles.label}>MERCHANT</Text>
                  <Text style={styles.value}>{item.retailer}</Text>
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>COMMODITY</Text>
                  <Text style={styles.value}>{item.product}</Text>
                </View>
              </View>

              <View style={styles.dealBar}>
                <View style={styles.dealPart}>
                  <Text style={styles.dealLabel}>QUANTITY</Text>
                  <Text style={styles.dealVal}>{item.offerQty} Units</Text>
                </View>
                <View style={styles.dealPart}>
                  <Text style={styles.dealLabel}>UNIT PRICE</Text>
                  <Text style={[styles.dealVal, { color: '#4caf50' }]}>₹{item.offerPrice}</Text>
                </View>
              </View>

              {item.status === 'pending' ? (
                <View style={styles.actions}>
                  <TouchableOpacity 
                    style={styles.acceptBtn}
                    onPress={() => handleAccept(item.id)}
                  >
                    <Text style={styles.acceptText}>Initialize Trade</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ignoreBtn}>
                    <Ionicons name="close-outline" size={24} color="#444" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.acceptedTag}>
                  <Ionicons name="checkmark-circle" size={16} color="#4caf50" />
                  <Text style={styles.acceptedText}>TRADE COMMENCED</Text>
                </View>
              )}
            </Animated.View>
          );
        }}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  headerSub: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeBadge: {
    backgroundColor: 'rgba(62, 99, 221, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activeBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#3e63dd',
    letterSpacing: 1,
  },
  list: {
    padding: 20,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: 'rgba(62, 99, 221, 0.05)',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(62, 99, 221, 0.1)',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#888',
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#141416',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1f1f23',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 14,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleArea: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  cardTime: {
    fontSize: 11,
    color: '#444',
    marginTop: 2,
  },
  urgencyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  body: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 24,
  },
  field: {
    flex: 1,
  },
  label: {
    fontSize: 9,
    fontWeight: '800',
    color: '#444',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
    color: '#999',
  },
  dealBar: {
    flexDirection: 'row',
    backgroundColor: '#0a0a0c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  dealPart: {
    flex: 1,
    alignItems: 'center',
  },
  dealLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#333',
    marginBottom: 4,
  },
  dealVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: '#3e63dd',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  acceptText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  ignoreBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#141416',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f1f23',
  },
  acceptedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  acceptedText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4caf50',
    letterSpacing: 1,
  },
});
