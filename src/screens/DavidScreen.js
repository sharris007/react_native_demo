import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const DAVID_SINGER_URL = 'https://davidsingerhealthinsurance.com/';

export default function DavidScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: DAVID_SINGER_URL }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1e88e5" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
