import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const MIKE_THE_GLAZIER_URL = 'https://www.miketheglazier.com/';

function LoadingView() {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#0f5f8c" />
    </View>
  );
}

export default function MikeTheGlazerScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: MIKE_THE_GLAZIER_URL }}
        startInLoadingState
        renderLoading={LoadingView}
        domStorageEnabled
        javaScriptEnabled
        setSupportMultipleWindows={false}
        allowsBackForwardNavigationGestures
        style={styles.webView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
