import { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MetricCard from '../components/MetricCard';
import RevenueChart from '../components/RevenueChart';
import SpeedometerGauge from '../components/SpeedometerGauge';

const COLORS = {
  dark: '#1a1a1a',
  white: '#fff',
  grey: '#9e9e9e',
  blue: '#2196F3',
  pink: '#E8B4B8',
  lightGrey: '#bdbdbd',
};

// Dummy data matching reference
const METRICS = [
  { value: 180, label: 'Total Products', progress: 30, maxLabel: '30%', dark: true, fill: COLORS.white },
  { value: 210, label: 'Total Orders', progress: 70, maxLabel: '70%', dark: false, fill: COLORS.blue },
  { value: 150, label: 'Total Clients', progress: 50, maxLabel: '70%', dark: false, fill: COLORS.lightGrey },
  { value: 110, label: 'Revenue', progress: 36, maxLabel: '70%', dark: false, fill: COLORS.pink },
];

const PERIODS = ['Monthly', 'Weekly', 'Today'];
const DASHBOARD_SPEED = 72;

export default function DashboardScreen() {
  const [period, setPeriod] = useState('Weekly');
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: 16 + insets.top,
          paddingBottom: 96 + insets.bottom,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/80?img=5' }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Metric cards 2x2 */}
      <View style={styles.grid}>
        <View style={styles.row}>
          <MetricCard
            value={METRICS[0].value}
            label={METRICS[0].label}
            progressPercent={METRICS[0].progress}
            maxLabel={METRICS[0].maxLabel}
            dark={METRICS[0].dark}
            fillColor={METRICS[0].fill}
          />
          <MetricCard
            value={METRICS[1].value}
            label={METRICS[1].label}
            progressPercent={METRICS[1].progress}
            maxLabel={METRICS[1].maxLabel}
            dark={METRICS[1].dark}
            fillColor={METRICS[1].fill}
          />
        </View>
        <View style={styles.row}>
          <MetricCard
            value={METRICS[2].value}
            label={METRICS[2].label}
            progressPercent={METRICS[2].progress}
            maxLabel={METRICS[2].maxLabel}
            dark={METRICS[2].dark}
            fillColor={METRICS[2].fill}
          />
          <MetricCard
            value={METRICS[3].value}
            label={METRICS[3].label}
            progressPercent={METRICS[3].progress}
            maxLabel={METRICS[3].maxLabel}
            dark={METRICS[3].dark}
            fillColor={METRICS[3].fill}
          />
        </View>
      </View>

      {/* Revenue section */}
      <View style={styles.revenueSection}>
        <View style={styles.revenueHeader}>
          <Text style={styles.revenueTitle}>Revenue</Text>
          <View style={styles.periodRow}>
            {PERIODS.map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setPeriod(p)}
                style={[styles.periodBtn, period === p && styles.periodBtnActive]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.periodText,
                    period === p && styles.periodTextActive,
                  ]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.chartCard}>
          <RevenueChart />
        </View>
      </View>

      {/* Speedometer section (last item on dashboard) */}
      <View style={styles.speedometerSection}>
        <Text style={styles.speedometerTitle}>Speedometer</Text>
        <View style={styles.speedometerCard}>
          <SpeedometerGauge
            value={DASHBOARD_SPEED}
            min={0}
            max={100}
            unit="%"
            label="DASHBOARD SPEED"
            size={190}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: Platform.OS === 'ios' ? 8 : 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212121',
  },
  avatarWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  avatar: {
    width: 44,
    height: 44,
  },
  grid: {
    marginHorizontal: -6,
  },
  row: {
    flexDirection: 'row',
  },
  revenueSection: {
    marginTop: 24,
  },
  revenueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  revenueTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
  },
  periodRow: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    padding: 4,
  },
  periodBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  periodBtnActive: {
    backgroundColor: COLORS.dark,
  },
  periodText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#424242',
  },
  periodTextActive: {
    color: COLORS.white,
  },
  chartCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  speedometerSection: {
    marginTop: 24,
    marginBottom: 8,
  },
  speedometerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 12,
  },
  speedometerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
