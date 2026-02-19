import { StyleSheet, Text, View } from 'react-native';

export default function MetricCard({
  value,
  label,
  progressPercent,
  maxLabel = '100%',
  dark = false,
  fillColor = '#2196F3',
}) {
  const bg = dark ? '#1a1a1a' : '#fff';
  const textColor = dark ? '#fff' : '#212121';
  const subColor = dark ? 'rgba(255,255,255,0.85)' : '#9e9e9e';
  const trackBg = dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';

  return (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <Text style={[styles.value, { color: textColor }]}>{value}</Text>
      <Text style={[styles.label, { color: subColor }]}>{label}</Text>
      <View style={styles.progressRow}>
        <Text style={[styles.progressText, { color: subColor }]}>0%</Text>
        <View style={[styles.track, { backgroundColor: trackBg }]}>
          <View
            style={[
              styles.fill,
              {
                width: `${Math.min(100, progressPercent)}%`,
                backgroundColor: fillColor,
              },
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: subColor }]}>{maxLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    margin: 6,
    minHeight: 100,
  },
  value: {
    fontSize: 26,
    fontWeight: '700',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  progressText: {
    fontSize: 10,
    minWidth: 24,
    marginHorizontal: 4,
  },
  track: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});
