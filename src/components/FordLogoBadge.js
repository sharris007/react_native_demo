import { StyleSheet, View } from 'react-native';
import Svg, { Defs, Ellipse, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';

export default function FordLogoBadge({ width = 70 }) {
  const safeWidth = Math.max(52, width);
  const height = safeWidth * 0.5;

  return (
    <View style={[styles.container, { width: safeWidth, height }]}>
      <Svg width={safeWidth} height={height} viewBox="0 0 180 90">
        <Defs>
          <LinearGradient id="ford-blue" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#1f5eb8" />
            <Stop offset="1" stopColor="#032a74" />
          </LinearGradient>
        </Defs>

        <Ellipse cx="90" cy="45" rx="86" ry="41" fill="#f4f7ff" />
        <Ellipse cx="90" cy="45" rx="81" ry="36" fill="url(#ford-blue)" />
        <Ellipse cx="90" cy="45" rx="81" ry="36" fill="none" stroke="#ffffff" strokeWidth={2.5} opacity={0.88} />

        <SvgText
          x="90"
          y="58"
          fill="#ffffff"
          fontSize="34"
          fontWeight="700"
          fontStyle="italic"
          letterSpacing="1"
          textAnchor="middle"
        >
          Ford
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
