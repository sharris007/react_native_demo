import { Image, ImageBackground, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HERO_IMAGE_URL =
  'https://denverjewishchamber.com/wp-content/uploads/2025/06/%C2%A9InSync-DJCC_Lunch_4-22-25-088_web-scaled.jpeg';
const LOGO_IMAGE_URL =
  'https://denverjewishchamber.com/wp-content/uploads/2022/06/djcc-logo-e1655960433493.png';

const JOIN_CHAMBER_URL = 'https://denverjewishchamber.com/clients/djcc/join/membership/';
const RENEW_MEMBERSHIP_URL =
  'https://business.denverjewishchamber.com/events/details/membership-renewal-2435';

async function openExternalUrl(url) {
  try {
    await Linking.openURL(url);
  } catch (error) {
    console.warn('Unable to open URL:', url, error);
  }
}

function BrowserToolbarIcon({ text, boxed = false }) {
  if (!boxed) {
    return <Text style={styles.toolbarIconText}>{text}</Text>;
  }

  return (
    <View style={styles.toolbarIconBox}>
      <Text style={styles.toolbarBoxText}>{text}</Text>
    </View>
  );
}

export default function ChamberScreen() {
  const insets = useSafeAreaInsets();
  const topInset = Math.max(insets.top, 10);
  const bottomInset = Math.max(insets.bottom, 8);

  return (
    <View style={styles.container}>
      <View style={[styles.statusBarArea, { paddingTop: topInset }]}>
        <Text style={styles.clockText}>7:58</Text>
        <View style={styles.dynamicIsland}>
          <View style={styles.islandLeftIcon} />
          <Text style={styles.islandTimer}>1h 15m</Text>
        </View>
        <View style={styles.batteryPill}>
          <Text style={styles.batteryText}>94</Text>
        </View>
      </View>

      <View style={styles.addressBar}>
        <View style={styles.addressLeft}>
          <View style={styles.addressIcon} />
          <Text style={styles.addressText}>...erjewishchamber.com</Text>
        </View>
        <Text style={styles.shareIcon}>[]^</Text>
      </View>

      <View style={styles.siteHeader}>
        <Image source={{ uri: LOGO_IMAGE_URL }} style={styles.logo} resizeMode="contain" />
        <View style={styles.hamburgerIcon}>
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </View>
      </View>
      <View style={styles.headerDivider} />

      <ImageBackground source={{ uri: HERO_IMAGE_URL }} style={styles.hero} imageStyle={styles.heroImage}>
        <View style={styles.heroOverlay}>
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroTitle}>Growing Business{'\n'}Through Integrity</Text>
            <Text style={styles.heroSubtitle}>Working to grow YOUR{'\n'}Business</Text>
          </View>

          <View style={styles.actionsColumn}>
            <Pressable
              style={styles.primaryButton}
              onPress={() => openExternalUrl(JOIN_CHAMBER_URL)}
            >
              <Text style={styles.buttonText}>Join Chamber</Text>
            </Pressable>
            <Pressable
              style={styles.primaryButton}
              onPress={() => openExternalUrl(RENEW_MEMBERSHIP_URL)}
            >
              <Text style={styles.buttonText}>Renew Membership</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>

      <View style={[styles.browserToolbar, { paddingBottom: bottomInset }]}>
        <BrowserToolbarIcon text="<" />
        <BrowserToolbarIcon text=">" />
        <View style={styles.toolbarPlusCircle}>
          <Text style={styles.toolbarPlusText}>+</Text>
        </View>
        <BrowserToolbarIcon text="27" boxed />
        <BrowserToolbarIcon text="..." />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  statusBarArea: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  clockText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111111',
    width: 72,
  },
  dynamicIsland: {
    flex: 1,
    maxWidth: 268,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginHorizontal: 10,
  },
  islandLeftIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f39b18',
  },
  islandTimer: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f39b18',
  },
  batteryPill: {
    width: 44,
    height: 28,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#0f1720',
    alignItems: 'center',
    justifyContent: 'center',
  },
  batteryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f1720',
  },
  addressBar: {
    marginHorizontal: 12,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#eceff2',
    paddingHorizontal: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  addressIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#9ca3af',
    marginRight: 10,
  },
  addressText: {
    fontSize: 22,
    color: '#2a2a2a',
    fontWeight: '500',
  },
  shareIcon: {
    fontSize: 20,
    color: '#7d8591',
    fontWeight: '700',
  },
  siteHeader: {
    height: 95,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 190,
    height: 72,
  },
  hamburgerIcon: {
    width: 30,
    gap: 5,
  },
  hamburgerLine: {
    height: 3,
    borderRadius: 2,
    backgroundColor: '#1f6fa8',
  },
  headerDivider: {
    height: 3,
    backgroundColor: '#1d74b9',
  },
  hero: {
    flex: 1,
    minHeight: 530,
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(20, 30, 45, 0.32)',
    paddingHorizontal: 16,
    paddingTop: 114,
    paddingBottom: 72,
    justifyContent: 'space-between',
  },
  heroTextWrap: {
    maxWidth: '96%',
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 58,
    lineHeight: 60,
    fontWeight: '500',
    marginBottom: 24,
    letterSpacing: 0.2,
  },
  heroSubtitle: {
    color: '#ffffff',
    fontSize: 52,
    lineHeight: 56,
    fontWeight: '400',
  },
  actionsColumn: {
    alignItems: 'flex-end',
    gap: 10,
    marginBottom: 14,
  },
  primaryButton: {
    width: 206,
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#c8deef',
    backgroundColor: '#1e4f79',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  browserToolbar: {
    height: 72,
    backgroundColor: '#f3f4f6',
    borderTopWidth: 1,
    borderTopColor: '#d4d7dc',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolbarIconText: {
    fontSize: 36,
    color: '#7a8088',
    fontWeight: '500',
  },
  toolbarPlusCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#7a8088',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbarPlusText: {
    fontSize: 30,
    color: '#7a8088',
    marginTop: -2,
  },
  toolbarIconBox: {
    width: 38,
    height: 34,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#7a8088',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbarBoxText: {
    fontSize: 18,
    color: '#7a8088',
    fontWeight: '600',
  },
});
