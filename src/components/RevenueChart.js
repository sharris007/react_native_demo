import { useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 32;
const CHART_HEIGHT = 160;
const PADDING = { top: 10, right: 10, bottom: 24, left: 28 };
const PLOT_WIDTH = CHART_WIDTH - PADDING.left - PADDING.right;
const PLOT_HEIGHT = CHART_HEIGHT - PADDING.top - PADDING.bottom;

// Dummy data: S M T W T F S
const LINE1 = [25, 35, 30, 45, 50, 42, 55]; // pink
const LINE2 = [18, 25, 22, 30, 28, 35, 38]; // black

function scaleY(val, min = 15, max = 60) {
  const p = (val - min) / (max - min);
  return PLOT_HEIGHT * (1 - p);
}

function scaleX(i, total = 7) {
  return (PLOT_WIDTH * (i + 0.5)) / total;
}

export default function RevenueChart() {
  const path1 = useMemo(() => {
    return LINE1.map((y, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(y)}`).join(' ');
  }, []);
  const path2 = useMemo(() => {
    return LINE2.map((y, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(y)}`).join(' ');
  }, []);

  const yLabels = [60, 50, 40, 30, 20, 15];
  const xLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <View style={styles.wrapper}>
      <View style={styles.yAxis}>
        {yLabels.map((y) => (
          <Text key={y} style={styles.yLabel}>
            {y}
          </Text>
        ))}
      </View>
      <View style={styles.chartArea}>
        <Svg width={PLOT_WIDTH} height={PLOT_HEIGHT}>
          {yLabels.slice(1, -1).map((y) => (
            <Line
              key={y}
              x1={0}
              y1={scaleY(y)}
              x2={PLOT_WIDTH}
              y2={scaleY(y)}
              stroke="#e8e8e8"
              strokeWidth={1}
            />
          ))}
          <Path d={path1} fill="none" stroke="#E91E63" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          {LINE1.map((y, i) => (
            <Circle key={`p1-${i}`} cx={scaleX(i)} cy={scaleY(y)} r={4} fill="#E91E63" />
          ))}
          <Path d={path2} fill="none" stroke="#212121" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          {LINE2.map((y, i) => (
            <Circle key={`p2-${i}`} cx={scaleX(i)} cy={scaleY(y)} r={3} fill="#212121" />
          ))}
        </Svg>
        <View style={styles.xAxis}>
          {xLabels.map((l, i) => (
            <Text key={i} style={styles.xLabel}>
              {l}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginTop: 12,
  },
  yAxis: {
    width: PADDING.left - 4,
    justifyContent: 'space-between',
    paddingVertical: PADDING.top + 4,
  },
  yLabel: {
    fontSize: 10,
    color: '#9e9e9e',
  },
  chartArea: {
    flex: 1,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: (PLOT_WIDTH / 7) * 0.3,
    marginTop: 4,
  },
  xLabel: {
    fontSize: 11,
    color: '#9e9e9e',
    fontWeight: '500',
  },
});
