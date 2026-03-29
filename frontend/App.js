import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// ── Entry ──────────────────────────────────────────────────────────────────
import RoleSelectScreen from './screens/RoleSelectScreen';

// ── Consumer ───────────────────────────────────────────────────────────────
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import MapViewScreen from './screens/MapViewScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import CartScreen from './screens/CartScreen';
import ConsumerProfileScreen from './screens/ConsumerProfileScreen';
import ProductScreen from './screens/ProductScreen';
import NearbyStoresScreen from './screens/NearbyStoresScreen';

// ── Retailer ───────────────────────────────────────────────────────────────
import RetailerDashboardScreen from './screens/RetailerDashboardScreen';
import RetailerScanScreen from './screens/RetailerScanScreen';
import B2BNotificationsScreen from './screens/B2BNotificationsScreen';
import DistributorDemandShowcase from './screens/DistributorDemandShowcase';

// ── Navigators ─────────────────────────────────────────────────────────────
const Stack = createNativeStackNavigator();
const ConsumerTab = createBottomTabNavigator();
const RetailerTab = createBottomTabNavigator();

const T2BTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#050505',
    card: '#0a0a0a',
    text: '#ffffff',
    border: '#1a1a1a',
    primary: '#ff4444',
  },
};

const stackOpts = {
  headerStyle: { backgroundColor: '#0a0a0a' },
  headerTintColor: '#ffffff',
  headerTitleStyle: { fontWeight: '800', fontSize: 17 },
  headerShadowVisible: false,
  animation: 'slide_from_right',
};

const tabBarStyle = {
  backgroundColor: '#0a0a0a',
  borderTopColor: 'rgba(255,255,255,0.06)',
  borderTopWidth: 1,
  height: Platform.OS === 'ios' ? 85 : 65,
  paddingBottom: Platform.OS === 'ios' ? 25 : 8,
  paddingTop: 4,
};

// ── Tab Icon ───────────────────────────────────────────────────────────────
function TabIcon({ iconName, label, focused, badge }) {
  const iconColor = focused ? '#3e63dd' : '#666'; // Professional Blue accent
  return (
    <View style={ti.wrap}>
      <View>
        <Ionicons 
          name={focused ? iconName : `${iconName}-outline`} 
          size={22} 
          color={iconColor} 
        />
        {badge > 0 && (
          <View style={ti.badge}>
            <Text style={ti.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <Text style={[ti.label, focused && ti.labelOn]}>{label}</Text>
      {focused && <View style={ti.dot} />}
    </View>
  );
}
const ti = StyleSheet.create({
  wrap: { alignItems: 'center', paddingTop: 6 },
  label: { fontSize: 10, color: '#666', fontWeight: '600', marginTop: 2 },
  labelOn: { color: '#3e63dd', fontWeight: '800' },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#3e63dd', marginTop: 3 },
  badge: {
    position: 'absolute', top: -5, right: -10,
    backgroundColor: '#ff4444', minWidth: 16, height: 16,
    borderRadius: 8, justifyContent: 'center', alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '900' },
});

// ── Consumer Tabs (5-tab) ──────────────────────────────────────────────────
function ConsumerTabs() {
  return (
    <ConsumerTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0a0a0a' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '800' },
        headerShadowVisible: false,
        tabBarStyle,
        tabBarShowLabel: false,
      }}
    >
      <ConsumerTab.Screen
        name="Deals"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon iconName="flame" label="Deals" focused={focused} />,
        }}
      />
      <ConsumerTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search Deals',
          tabBarIcon: ({ focused }) => <TabIcon iconName="search" label="Search" focused={focused} />,
        }}
      />
      <ConsumerTab.Screen
        name="MapTab"
        component={MapViewScreen}
        options={{
          title: 'Radar Map',
          tabBarIcon: ({ focused }) => <TabIcon iconName="map" label="Map" focused={focused} />,
        }}
      />
      <ConsumerTab.Screen
        name="Alerts"
        component={NotificationsScreen}
        options={{
          title: 'Alerts',
          tabBarIcon: ({ focused }) => <TabIcon iconName="notifications" label="Alerts" focused={focused} badge={3} />,
        }}
      />
      <ConsumerTab.Screen
        name="Profile"
        component={ConsumerProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon iconName="person" label="Profile" focused={focused} />,
        }}
      />
    </ConsumerTab.Navigator>
  );
}

// ── Retailer Tabs (4-tab) ─────────────────────────────────────────────────
function RetailerTabs() {
  return (
    <RetailerTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0a0a0a' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '800' },
        headerShadowVisible: false,
        tabBarStyle,
        tabBarShowLabel: false,
      }}
    >
      <RetailerTab.Screen
        name="Dashboard"
        component={RetailerDashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => <TabIcon iconName="stats-chart" label="Dashboard" focused={focused} />,
        }}
      />
      <RetailerTab.Screen
        name="Scan"
        component={RetailerScanScreen}
        options={{
          title: 'Scan Product',
          tabBarIcon: ({ focused }) => <TabIcon iconName="camera" label="Scan" focused={focused} />,
        }}
      />
      <RetailerTab.Screen
        name="MapRetailer"
        component={MapViewScreen}
        options={{
          title: 'Demand Map',
          tabBarIcon: ({ focused }) => <TabIcon iconName="map" label="Map" focused={focused} />,
        }}
      />
      <RetailerTab.Screen
        name="B2BAlerts"
        component={B2BNotificationsScreen}
        options={{
          title: 'B2B Hub',
          tabBarIcon: ({ focused }) => <TabIcon iconName="swap-horizontal" label="B2B" focused={focused} badge={2} />,
        }}
      />
      <RetailerTab.Screen
        name="Showcase"
        component={DistributorDemandShowcase}
        options={{
          title: 'Supply Hub',
          tabBarIcon: ({ focused }) => <TabIcon iconName="grid" label="Supply" focused={focused} />,
        }}
      />
    </RetailerTab.Navigator>
  );
}

// ── Root Navigator ─────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer theme={T2BTheme}>
        <Stack.Navigator screenOptions={stackOpts}>

          {/* Landing */}
          <Stack.Screen
            name="RoleSelect"
            component={RoleSelectScreen}
            options={{ headerShown: false }}
          />

          {/* Consumer Flow */}
          <Stack.Screen
            name="ConsumerHome"
            component={ConsumerTabs}
            options={{ headerShown: false }}
          />

          {/* Retailer Flow */}
          <Stack.Screen
            name="RetailerHome"
            component={RetailerTabs}
            options={{ headerShown: false }}
          />

          {/* Shared Detail Screens */}
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{ title: 'Product Details' }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ title: '🛒 Cart' }}
          />
          <Stack.Screen
            name="RetailerScan"
            component={RetailerScanScreen}
            options={{ title: '📷 Scan Product' }}
          />
          <Stack.Screen
            name="RetailerDashboard"
            component={RetailerDashboardScreen}
            options={{ title: '📊 Store Dashboard' }}
          />
          <Stack.Screen
            name="B2B"
            component={B2BNotificationsScreen}
            options={{ title: 'B2B Marketplace' }}
          />
          <Stack.Screen
            name="NearbyStores"
            component={NearbyStoresScreen}
            options={{ title: '🏪 Nearby Stores' }}
          />
          <Stack.Screen
            name="DistributorShowcase"
            component={DistributorDemandShowcase}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
