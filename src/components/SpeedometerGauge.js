import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

const RADIUS = 70;
const STROKE = 12;
const START_ANGLE = 135;
const END_ANGLE = 405;

function polarToCartesian(cx, cy, r, angle) {
  const rad = (angle * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function describeArc(cx, cy, r, start, end) {
  const startP = polarToCartesian(cx, cy, r, end);
  const endP = polarToCartesian(cx, cy, r, start);
  const largeArc = end - start > 180 ? 1 : 0;
  return `M ${startP.x} ${startP.y} A ${r} ${r} 0 ${largeArc} 1 ${endP.x} ${endP.y}`;
}

export default function SpeedometerGauge({
  value,
  min = 0,
  max = 100,
  size = 160,
  unit = '',
  label,
  accentColor = '#C9A227',
  backgroundColor = '#002244',
}) {
  const displayValue = Math.min(max, Math.max(min, value));
  const progress = (displayValue - min) / (max - min || 1);
  const angle = START_ANGLE + progress * (END_ANGLE - START_ANGLE);

  const scale = size / 200;
  const cx = 100;
  const cy = 100;
  const gradId = `g${String(label || 'x').replace(/\s/g, '')}`;

  return (
    <View style={[styles.container, { width: size, height: size + 44 }]}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={accentColor} stopOpacity="1" />
            <Stop offset="1" stopColor="#E8D48B" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Path
          d={describeArc(cx, cy, RADIUS, START_ANGLE, END_ANGLE)}
          fill="none"
          stroke="rgba(201,162,39,0.25)"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        <Path
          d={describeArc(cx, cy, RADIUS, START_ANGLE, angle)}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        <Circle cx={cx} cy={cy} r={RADIUS - STROKE / 2 - 4} fill={backgroundColor} />
      </Svg>
      <View style={styles.valueWrap} pointerEvents="none">
        <Text style={[styles.value, { color: accentColor }]}>
          {displayValue}{unit}
        </Text>
      </View>
      {label && <Text style={[styles.label, { color: accentColor }]}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  valueWrap: {
    position: 'absolute',
    top: '42%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
