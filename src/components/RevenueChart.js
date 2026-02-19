import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';

const CHART_HEIGHT = 160;
const PADDING = { top: 10, right: 10, bottom: 24, left: 28 };

// Dummy data: S M T W T F S
const LINE1 = [25, 35, 30, 45, 50, 42, 55]; // pink
const LINE2 = [18, 25, 22, 30, 28, 35, 38]; // black

export default function RevenueChart() {
  const { width: windowWidth } = useWindowDimensions();
  const plotWidth = Math.max(windowWidth - 70, 180);
  const plotHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

  const scaleY = (val, min = 15, max = 60) => {
    const p = (val - min) / (max - min);
    return plotHeight * (1 - p);
  };

  const scaleX = (i, total = 7) => {
    return (plotWidth * (i + 0.5)) / total;
  };

  const path1 = LINE1.map((y, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(y)}`).join(' ');
  const path2 = LINE2.map((y, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(y)}`).join(' ');

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
        <Svg width={plotWidth} height={plotHeight}>
          {yLabels.slice(1, -1).map((y) => (
            <Line
              key={y}
              x1={0}
              y1={scaleY(y)}
              x2={plotWidth}
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
        <View style={[styles.xAxis, { paddingHorizontal: (plotWidth / 7) * 0.3 }]}>
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
    marginTop: 4,
  },
  xLabel: {
    fontSize: 11,
    color: '#9e9e9e',
    fontWeight: '500',
  },
});
