import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Platform,
  Animated,
  SafeAreaView,
} from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function RetailerScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form state
  const [stock, setStock] = useState('');
  const [expiry, setExpiry] = useState('');

  // Animation
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraPermissions();
  }, []);

  const animateIn = () => {
    Animated.spring(fadeAnim, {
      toValue: 1,
      tension: 50,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setLoading(true);

    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`,
        { timeout: 5000 }
      );

      if (response.data && response.data.status === 1) {
        const product = response.data.product;
        setProductData({
          barcode: data,
          name: product.product_name || 'Unknown Item',
          category:
            product.categories_tags && product.categories_tags.length > 0
              ? product.categories_tags[0].replace('en:', '')
              : 'General',
          mrp: 100,
        });
      } else {
        setProductData({ barcode: data, name: '', category: '', mrp: '', manualEntry: true });
      }
    } catch (err) {
      setProductData({ barcode: data, name: '', category: '', mrp: '', manualEntry: true });
    }

    setLoading(false);
    animateIn();
  };

  const handleActivate = () => {
    if (!stock || !expiry) {
      Alert.alert('Incomplete Data', 'Please specify stock quantity and expiration date.');
      return;
    }
    Alert.alert(
      'Lifecycle Primary',
      `Inventory logic activated for ${productData.name}.\n\nParallel distribution is now active.`,
      [{ text: 'Acknowledge', onPress: () => navigation.goBack() }]
    );
  };

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={48} color="#ff4444" />
        <Text style={styles.centerText}>Camera access restricted.</Text>
      </View>
    );
  }

  if (!scanned) {
    return (
      <View style={styles.scannerContainer}>
        <CameraView
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_e', 'upc_a', 'code128', 'code39'],
          }}
          style={StyleSheet.absoluteFillObject}
        />
        <SafeAreaView style={styles.overlay}>
          <View style={styles.overlayTop}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.overlayTitle}>Inventory Scan</Text>
            <View style={{ width: 44 }} />
          </View>

          <View style={styles.frame}>
            <View style={[styles.corner, styles.tl]} />
            <View style={[styles.corner, styles.tr]} />
            <View style={[styles.corner, styles.bl]} />
            <View style={[styles.corner, styles.br]} />
            <View style={styles.laser} />
          </View>

          <View style={styles.overlayBottom}>
            <TouchableOpacity 
              style={styles.manualEntryBtn}
              onPress={() => {
                setScanned(true);
                setProductData({ barcode: 'MANUAL_ENTRY', name: '', category: '', mrp: '', manualEntry: true });
                animateIn();
              }}
            >
              <Ionicons name="create-outline" size={20} color="#3e63dd" />
              <Text style={styles.manualText}>Enter Manual UPC</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>RESOLVING BARCODE...</Text>
      </View>
    );
  }

  return (
    <View style={styles.formContainer}>
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScanned(false)} style={styles.backBtnSmall}>
            <Ionicons name="chevron-back" size={24} color="#666" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Activation Form</Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange:[0,1], outputRange:[20,0] }) }] }}>
          
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="checkmark-seal" size={24} color="#3e63dd" />
              <Text style={styles.cardTitle}>Identity Resolved</Text>
            </View>
            <View style={styles.barcodeBox}>
              <Text style={styles.barcodeLbl}>UPC / EAN</Text>
              <Text style={styles.barcodeVal}>{productData.barcode}</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PRODUCT IDENTIFIER</Text>
              <TextInput
                style={[styles.input, !productData.manualEntry && styles.readOnly]}
                editable={productData.manualEntry}
                value={productData.name}
                onChangeText={(t) => setProductData({...productData, name: t})}
                placeholder="Product Name"
                placeholderTextColor="#444"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>STOCK QTY</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={stock}
                  onChangeText={setStock}
                  placeholder="0"
                  placeholderTextColor="#444"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>EXPIRATION</Text>
                <TextInput
                  style={styles.input}
                  value={expiry}
                  onChangeText={setExpiry}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#444"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.activateBtn} onPress={handleActivate}>
              <Text style={styles.activateText}>Initialize Lifecycle Engine</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="information-circle-outline" size={20} color="#444" />
            <Text style={styles.infoText}>Once activated, T2B will automatically compute price decay and simultaneously alert nearby consumers and retailers.</Text>
          </View>

        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scannerContainer: { flex: 1, backgroundColor: '#000' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'space-between' },
  overlayTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  overlayTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  frame: { width: 260, height: 260, alignSelf: 'center', position: 'relative' },
  corner: { position: 'absolute', width: 40, height: 40, borderColor: '#3e63dd', borderWidth: 4 },
  tl: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 16 },
  tr: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 16 },
  bl: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 16 },
  br: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 16 },
  laser: { position: 'absolute', top: '50%', left: 20, right: 20, height: 2, backgroundColor: '#3e63dd', opacity: 0.8 },
  overlayBottom: { padding: 40, alignItems: 'center' },
  manualEntryBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#141416', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 16, borderWidth: 1, borderColor: '#1f1f23' },
  manualText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  
  center: { flex: 1, backgroundColor: '#0a0a0c', justifyContent: 'center', alignItems: 'center', padding: 40 },
  centerText: { color: '#666', fontSize: 16, marginTop: 16, textAlign: 'center' },
  loadingText: { color: '#3e63dd', fontSize: 13, fontWeight: '800', letterSpacing: 2 },

  formContainer: { flex: 1, backgroundColor: '#0a0a0c' },
  safeHeader: { borderBottomWidth: 1, borderBottomColor: '#1f1f23' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { color: '#fff', fontSize: 17, fontWeight: '700' },
  backBtnSmall: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#141416', justifyContent: 'center', alignItems: 'center' },
  formContent: { padding: 20 },
  card: { backgroundColor: '#141416', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#1f1f23' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  barcodeBox: { backgroundColor: '#0a0a0c', padding: 16, borderRadius: 12, marginBottom: 24, alignItems: 'center' },
  barcodeLbl: { fontSize: 10, color: '#333', fontWeight: '800', marginBottom: 4, letterSpacing: 1 },
  barcodeVal: { fontSize: 18, color: '#3e63dd', fontWeight: '800' },
  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 10, color: '#444', fontWeight: '800', marginBottom: 8, letterSpacing: 1 },
  input: { backgroundColor: '#0a0a0c', color: '#fff', padding: 16, borderRadius: 12, fontSize: 15, borderWidth: 1, borderColor: '#1f1f23' },
  readOnly: { opacity: 0.6, color: '#888' },
  inputRow: { flexDirection: 'row', gap: 12 },
  activateBtn: { backgroundColor: '#3e63dd', paddingVertical: 18, borderRadius: 16, alignItems: 'center', marginTop: 12 },
  activateText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  infoCard: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 24, opacity: 0.5, paddingHorizontal: 10 },
  infoText: { flex: 1, color: '#888', fontSize: 12, lineHeight: 18 },
});
