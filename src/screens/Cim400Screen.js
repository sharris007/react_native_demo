import { useCallback, useState } from 'react';
import { ActivityIndicator, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const CIM400_URL = 'https://cim400.com';

export default function Cim400Screen() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    setReloadKey((previous) => previous + 1);
  }, []);

  const handleOpenBrowser = useCallback(() => {
    Linking.openURL(CIM400_URL).catch(() => {});
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        key={reloadKey}
        source={{ uri: CIM400_URL }}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        onLoadStart={() => {
          setIsLoading(true);
          setHasError(false);
        }}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />

      {isLoading && !hasError && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0B74B8" />
        </View>
      )}

      {hasError && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorTitle}>Unable to load cim400.com</Text>
          <Text style={styles.errorSubTitle}>Check your connection and try again.</Text>
          <View style={styles.buttonRow}>
            <Pressable onPress={handleRetry} style={[styles.button, styles.primaryButton]}>
              <Text style={styles.primaryButtonText}>Retry</Text>
            </Pressable>
            <Pressable onPress={handleOpenBrowser} style={[styles.button, styles.secondaryButton]}>
              <Text style={styles.secondaryButtonText}>Open in Browser</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  errorTitle: {
    color: '#0D2D4A',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  errorSubTitle: {
    marginTop: 8,
    color: '#5C6D7D',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    minHeight: 42,
    minWidth: 136,
    borderRadius: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  primaryButton: {
    borderColor: '#0B74B8',
    backgroundColor: '#0B74B8',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    borderColor: '#0B74B8',
    backgroundColor: '#fff',
  },
  secondaryButtonText: {
    color: '#0B74B8',
    fontSize: 14,
    fontWeight: '600',
  },
});
