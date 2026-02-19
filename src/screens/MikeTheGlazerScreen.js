import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';

const SITE_URL = 'https://www.miketheglazier.com/';

export default function MikeTheGlazerScreen() {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [landscapeMode, setLandscapeMode] = useState(true);

  const applyOrientation = useCallback(async (lockToLandscape) => {
    try {
      await ScreenOrientation.lockAsync(
        lockToLandscape
          ? ScreenOrientation.OrientationLock.LANDSCAPE
          : ScreenOrientation.OrientationLock.PORTRAIT
      );
    } catch (error) {
      // Orientation APIs can be unavailable on some web contexts.
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLandscapeMode(true);
      applyOrientation(true);

      return () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT).catch(() => {});
      };
    }, [applyOrientation])
  );

  const handleRotate = async () => {
    const nextLandscapeMode = !landscapeMode;
    setLandscapeMode(nextLandscapeMode);
    await applyOrientation(nextLandscapeMode);
  };

  const openInBrowser = () => {
    Linking.openURL(SITE_URL).catch(() => {});
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: SITE_URL }}
        style={styles.webview}
        originWhitelist={['*']}
        setSupportMultipleWindows={false}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        onLoadStart={() => {
          setLoading(true);
          setHasError(false);
        }}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setHasError(true);
          setLoading(false);
        }}
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#fcb900" />
            <Text style={styles.loaderText}>Loading Mike the Glazer...</Text>
          </View>
        )}
      />

      {hasError && (
        <View style={styles.errorWrap}>
          <Text style={styles.errorTitle}>Unable to load website</Text>
          <Text style={styles.errorText}>
            Tap below to open Mike the Glazer in your browser.
          </Text>
          <Pressable style={styles.browserButton} onPress={openInBrowser}>
            <Text style={styles.browserButtonText}>Open Website</Text>
          </Pressable>
        </View>
      )}

      {!loading && !hasError && (
        <View style={styles.actions}>
          <Pressable style={styles.actionButton} onPress={handleRotate}>
            <Text style={styles.actionButtonText}>
              {landscapeMode ? 'Switch to Portrait' : 'Rotate to Landscape'}
            </Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={openInBrowser}>
            <Text style={styles.actionButtonText}>Open in Browser</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#101010',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  loaderText: {
    color: '#f5f5f5',
    fontSize: 14,
    fontWeight: '600',
  },
  actions: {
    position: 'absolute',
    right: 12,
    bottom: Platform.select({ ios: 40, android: 24, web: 24 }),
    gap: 10,
    alignItems: 'flex-end',
  },
  actionButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fcb900',
  },
  actionButtonText: {
    color: '#fcb900',
    fontSize: 13,
    fontWeight: '700',
  },
  errorWrap: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 10,
  },
  errorTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  errorText: {
    color: '#d0d0d0',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  browserButton: {
    marginTop: 6,
    backgroundColor: '#fcb900',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  browserButtonText: {
    color: '#111',
    fontSize: 14,
    fontWeight: '700',
  },
});
