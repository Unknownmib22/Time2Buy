import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function RoleSelectScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideUp, {
        toValue: 0,
        tension: 50,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Subtle Gradient Shape */}
      <View style={styles.topShape} />

      {/* Branding */}
      <Animated.View
        style={[
          styles.brandBlock,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideUp }],
          },
        ]}
      >
        <Text style={styles.logo}>T<Text style={styles.logoAccent}>2</Text>B</Text>
        <Text style={styles.brandName}>Time2Buy Platform</Text>
        <Text style={styles.tagline}>Hyperlocal Inventory Exchange</Text>
      </Animated.View>

      {/* Mode Selection */}
      <Animated.View
        style={[
          styles.cardsBlock,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideUp }],
          },
        ]}
      >
        <Text style={styles.selectLabel}>CHOOSE ACCESS MODE</Text>

        {/* Consumer Card */}
        <TouchableOpacity
          style={styles.modeCard}
          onPress={() => navigation.replace('ConsumerHome')}
          activeOpacity={0.7}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="cart-outline" size={24} color="#3e63dd" />
          </View>
          <View style={styles.modeInfo}>
            <Text style={styles.modeTitle}>Consumer Portal</Text>
            <Text style={styles.modeDesc}>Secure the best prices on expiring local inventory</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>

        {/* Retailer Card */}
        <TouchableOpacity
          style={styles.modeCard}
          onPress={() => navigation.replace('RetailerHome')}
          activeOpacity={0.7}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="storefront-outline" size={24} color="#3e63dd" />
          </View>
          <View style={styles.modeInfo}>
            <Text style={styles.modeTitle}>Retailer Dashboard</Text>
            <Text style={styles.modeDesc}>Manage stock lifecycle and activate time-decay pricing</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>

        {/* B2B Supply Hub */}
        <TouchableOpacity
          style={styles.modeCard}
          onPress={() => navigation.replace('DistributorShowcase')}
          activeOpacity={0.7}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="swap-horizontal-outline" size={24} color="#3e63dd" />
          </View>
          <View style={styles.modeInfo}>
            <Text style={styles.modeTitle}>B2B Supply Hub</Text>
            <Text style={styles.modeDesc}>Marketplace for retailers to trade surplus stock</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>PROFESSIONAL. SUSTAINABLE. LOCAL.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0c',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  topShape: {
    position: 'absolute',
    top: -150,
    right: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(62, 99, 221, 0.03)',
  },
  brandBlock: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontSize: 56,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -2,
  },
  logoAccent: {
    color: '#3e63dd',
  },
  brandName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginTop: 6,
  },
  tagline: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
    fontWeight: '500',
  },
  cardsBlock: {
    gap: 12,
  },
  selectLabel: {
    fontSize: 11,
    color: '#333',
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 12,
    textAlign: 'center',
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141416',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1f1f23',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(62, 99, 221, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modeInfo: {
    flex: 1,
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  modeDesc: {
    fontSize: 13,
    color: '#888',
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#222',
    fontWeight: '800',
    letterSpacing: 2,
  },
});
