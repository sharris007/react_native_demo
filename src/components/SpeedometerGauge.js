import { StyleSheet, Text, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  Line,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

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
  accentColor,
  backgroundColor,
  variant = 'classic',
  valueColor,
  labelColor,
}) {
  const isFerrari = variant === 'ferrari';
  const resolvedAccentColor = accentColor || (isFerrari ? '#E10600' : '#C9A227');
  const resolvedBackgroundColor = backgroundColor || (isFerrari ? '#F8D030' : '#002244');
  const resolvedValueColor = valueColor || (isFerrari ? '#111111' : resolvedAccentColor);
  const resolvedLabelColor = labelColor || (isFerrari ? '#111111' : resolvedAccentColor);

  const displayValue = Math.min(max, Math.max(min, value));
  const progress = (displayValue - min) / (max - min || 1);
  const angle = START_ANGLE + progress * (END_ANGLE - START_ANGLE);

  const cx = 100;
  const cy = 100;
  const gradId = `g${String(label || 'x').replace(/\s/g, '')}${variant}`;
  const tickAngles = isFerrari
    ? Array.from({ length: 11 }, (_, i) => START_ANGLE + (i / 10) * (END_ANGLE - START_ANGLE))
    : [];
  const needleTip = polarToCartesian(cx, cy, RADIUS - 18, angle);

  return (
    <View style={[styles.container, { width: size, height: size + 44 }]}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <Stop
              offset="0"
              stopColor={isFerrari ? '#FF7575' : resolvedAccentColor}
              stopOpacity="1"
            />
            <Stop
              offset="1"
              stopColor={isFerrari ? '#7A0000' : '#E8D48B'}
              stopOpacity="1"
            />
          </LinearGradient>
        </Defs>
        {isFerrari && (
          <Circle cx={cx} cy={cy} r={RADIUS + 9} fill="none" stroke="#161616" strokeWidth={10} />
        )}
        <Path
          d={describeArc(cx, cy, RADIUS, START_ANGLE, END_ANGLE)}
          fill="none"
          stroke={isFerrari ? 'rgba(20,20,20,0.35)' : 'rgba(201,162,39,0.25)'}
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        {isFerrari && (
          <Path
            d={describeArc(cx, cy, RADIUS, 345, END_ANGLE)}
            fill="none"
            stroke="#B00000"
            strokeWidth={STROKE}
            strokeLinecap="round"
          />
        )}
        <Path
          d={describeArc(cx, cy, RADIUS, START_ANGLE, angle)}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        <Circle
          cx={cx}
          cy={cy}
          r={RADIUS - STROKE / 2 - 4}
          fill={resolvedBackgroundColor}
          stroke={isFerrari ? '#1F1F1F' : 'none'}
          strokeWidth={isFerrari ? 2 : 0}
        />
        {tickAngles.map((tickAngle, index) => {
          const outer = polarToCartesian(cx, cy, RADIUS - 5, tickAngle);
          const inner = polarToCartesian(
            cx,
            cy,
            RADIUS - (index % 2 === 0 ? 19 : 15),
            tickAngle,
          );

          return (
            <Line
              key={tickAngle}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="#151515"
              strokeWidth={index % 2 === 0 ? 2.5 : 1.5}
              strokeLinecap="round"
            />
          );
        })}
        {isFerrari && (
          <>
            <Line
              x1={cx}
              y1={cy}
              x2={needleTip.x}
              y2={needleTip.y}
              stroke="#D60000"
              strokeWidth={4}
              strokeLinecap="round"
            />
            <Circle cx={cx} cy={cy} r={7} fill="#1B1B1B" stroke="#D60000" strokeWidth={2} />
          </>
        )}
      </Svg>
      <View style={[styles.valueWrap, isFerrari && styles.valueWrapFerrari]} pointerEvents="none">
        <Text style={[styles.value, { color: resolvedValueColor }]}>
          {displayValue}{unit}
        </Text>
      </View>
      {label && <Text style={[styles.label, { color: resolvedLabelColor }]}>{label}</Text>}
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
  valueWrapFerrari: {
    top: '44%',
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
