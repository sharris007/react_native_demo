import { StyleSheet, Text, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

const DIAL_SIZE = 260;
const CENTER = DIAL_SIZE / 2;
const START_ANGLE = 225;
const SWEEP_ANGLE = 270;

function polarToCartesian(cx, cy, radius, angleDeg) {
  const angle = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angle),
    y: cy - radius * Math.sin(angle),
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function FerrariSpeedometerGauge({
  value = 140,
  min = 0,
  max = 200,
  size = 160,
  label = 'Ferrari',
}) {
  const safeValue = clamp(value, min, max);
  const progress = (safeValue - min) / (max - min || 1);
  const needleAngle = START_ANGLE - progress * SWEEP_ANGLE;
  const odometerValue = String(Math.round(safeValue * 53)).padStart(6, '0');
  const gradId = `ferrari-${String(label).replace(/\s+/g, '').toLowerCase()}`;

  const tickSteps = 40;
  const outerLabels = Array.from({ length: 11 }, (_, index) => index * 20);
  const innerLabels = Array.from({ length: 16 }, (_, index) => (index + 1) * 20);

  const needleTail = polarToCartesian(CENTER, CENTER, 24, needleAngle + 180);
  const needleTip = polarToCartesian(CENTER, CENTER, 96, needleAngle);

  return (
    <View style={[styles.container, { width: size, height: size + 44 }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${DIAL_SIZE} ${DIAL_SIZE}`}>
        <Defs>
          <LinearGradient id={`${gradId}-bezel`} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#2f3136" />
            <Stop offset="1" stopColor="#08090b" />
          </LinearGradient>
          <LinearGradient id={`${gradId}-dial`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#1f2125" />
            <Stop offset="1" stopColor="#07080a" />
          </LinearGradient>
          <LinearGradient id={`${gradId}-needle`} x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#ff3b1f" />
            <Stop offset="0.45" stopColor="#ff7a24" />
            <Stop offset="1" stopColor="#ffd042" />
          </LinearGradient>
        </Defs>

        <Circle cx={CENTER} cy={CENTER} r={126} fill={`url(#${gradId}-bezel)`} />
        <Circle cx={CENTER} cy={CENTER} r={117} fill={`url(#${gradId}-dial)`} />
        <Circle
          cx={CENTER}
          cy={CENTER}
          r={117}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={2}
        />

        <G>
          {Array.from({ length: tickSteps + 1 }, (_, index) => {
            const angle = START_ANGLE - (index / tickSteps) * SWEEP_ANGLE;
            const majorTick = index % 4 === 0;
            const from = polarToCartesian(CENTER, CENTER, majorTick ? 92 : 98, angle);
            const to = polarToCartesian(CENTER, CENTER, 113, angle);

            return (
              <Line
                key={`tick-${index}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#ff6f23"
                strokeWidth={majorTick ? 3.6 : 2}
                strokeLinecap="round"
                opacity={majorTick ? 1 : 0.9}
              />
            );
          })}
        </G>

        <G>
          {outerLabels.map((mph) => {
            const angle = START_ANGLE - (mph / 200) * SWEEP_ANGLE;
            const point = polarToCartesian(CENTER, CENTER, 76, angle);

            return (
              <SvgText
                key={`mph-${mph}`}
                x={point.x}
                y={point.y + 5}
                fill="#ff7a2b"
                fontSize="16"
                fontWeight="700"
                textAnchor="middle"
              >
                {mph}
              </SvgText>
            );
          })}
        </G>

        <G>
          {innerLabels.map((kmh) => {
            const angle = START_ANGLE - (kmh / 320) * SWEEP_ANGLE;
            const point = polarToCartesian(CENTER, CENTER, 58, angle);

            return (
              <SvgText
                key={`kmh-${kmh}`}
                x={point.x}
                y={point.y + 3}
                fill="#cad943"
                fontSize="10"
                fontWeight="700"
                textAnchor="middle"
              >
                {kmh}
              </SvgText>
            );
          })}
        </G>

        <Rect
          x={84}
          y={100}
          width={92}
          height={34}
          rx={5}
          fill="#0a0f18"
          stroke="#4b5667"
          strokeWidth={1.5}
        />
        <Rect x={90} y={106} width={80} height={22} fill="#121d2b" />
        <SvgText
          x={130}
          y={123}
          fill="#dde5ef"
          fontSize="18"
          fontWeight="700"
          textAnchor="middle"
          letterSpacing="2"
        >
          {odometerValue}
        </SvgText>
        <SvgText x={130} y={142} fill="#ff8a33" fontSize="11" textAnchor="middle" fontWeight="600">
          electronic
        </SvgText>

        <SvgText x={78} y={174} fill="#cad943" fontSize="11" textAnchor="middle" fontWeight="700">
          km/h
        </SvgText>
        <SvgText x={96} y={192} fill="#ff9a2f" fontSize="20" textAnchor="middle" fontWeight="700">
          MPH
        </SvgText>
        <SvgText x={130} y={195} fill="#f5b557" fontSize="11" textAnchor="middle" fontWeight="700">
          FERRARI
        </SvgText>

        <Line
          x1={needleTail.x}
          y1={needleTail.y}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke={`url(#${gradId}-needle)`}
          strokeWidth={8}
          strokeLinecap="round"
        />
        <Line
          x1={needleTail.x}
          y1={needleTail.y}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke="#ffe08d"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.8}
        />
        <Circle cx={CENTER} cy={CENTER} r={12} fill="#8f2f17" stroke="#2e0e08" strokeWidth={1.5} />
        <Circle cx={CENTER} cy={CENTER} r={5} fill="#f6d2a1" />
      </Svg>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    marginTop: 4,
    fontSize: 11,
    letterSpacing: 0.7,
    fontWeight: '700',
    color: '#ff8a33',
    textTransform: 'uppercase',
  },
});
