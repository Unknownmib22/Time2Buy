import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'price_drop',
    title: 'Price Optimization Alert',
    body: 'Amul Butter dropped to ₹40 (was ₹56) at Sharma Provisions — 0.8 km away',
    time: '2 min ago',
    read: false,
    urgency: 'critical',
  },
  {
    id: '2',
    type: 'sale_start',
    title: 'New Inventory Signal',
    body: 'Whole Wheat Bread is now on sale at Daily Fresh Mart — ₹22 (42% off)',
    time: '15 min ago',
    read: false,
    urgency: 'medium',
  },
  {
    id: '3',
    type: 'expiring_soon',
    title: 'Critical Expiration Warning',
    body: 'Parle-G Biscuits at RS General Store — ₹65 (28% off). Grab it now!',
    time: '28 min ago',
    read: false,
    urgency: 'critical',
  },
];

const TYPE_CONFIG = {
  price_drop: { icon: 'trending-down', color: '#4caf50' },
  sale_start: { icon: 'flash-outline', color: '#3e63dd' },
  expiring_soon: { icon: 'time-outline', color: '#ff4444' },
  b2b_demand: { icon: 'business-outline', color: '#ff9800' },
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>System Alerts</Text>
            <Text style={styles.headerSub}>{unreadCount} new signals detected</Text>
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}>
              <Text style={styles.markAll}>Mark as read</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const config = TYPE_CONFIG[item.type] || { icon: 'notifications-outline', color: '#666' };
          return (
            <Animated.View style={[styles.card, { opacity: fadeAnim }, !item.read && styles.unreadCard]}>
              <View style={[styles.iconBox, { backgroundColor: `${config.color}15` }]}>
                <Ionicons name={config.icon} size={20} color={config.color} />
              </View>
              <View style={styles.notifInfo}>
                <View style={styles.notifTop}>
                  <Text style={[styles.notifTitle, !item.read && styles.boldText]}>{item.title}</Text>
                  <Text style={styles.notifTime}>{item.time}</Text>
                </View>
                <Text style={styles.notifBody}>{item.body}</Text>
              </View>
            </Animated.View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="notifications-off-outline" size={48} color="#1f1f23" />
            <Text style={styles.emptyTitle}>No active signals</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0c' },
  safeHeader: { borderBottomWidth: 1, borderBottomColor: '#1f1f23' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  headerSub: { color: '#444', fontSize: 12, marginTop: 2 },
  markAll: { color: '#3e63dd', fontSize: 12, fontWeight: '700' },
  list: { padding: 20 },
  card: { flexDirection: 'row', backgroundColor: '#141416', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#1f1f23', gap: 14 },
  unreadCard: { borderColor: 'rgba(62,99,221,0.2)' },
  iconBox: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  notifInfo: { flex: 1 },
  notifTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  notifTitle: { color: '#aaa', fontSize: 14, fontWeight: '600' },
  boldText: { color: '#fff', fontWeight: '800' },
  notifTime: { color: '#444', fontSize: 10, fontWeight: '600' },
  notifBody: { color: '#666', fontSize: 13, lineHeight: 18 },
  empty: { alignItems: 'center', paddingTop: 80 },
  emptyTitle: { color: '#333', fontSize: 15, fontWeight: '700', marginTop: 16 },
});
