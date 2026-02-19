import { useCallback } from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LINKS = {
  home: 'https://davidsingerhealthinsurance.com/',
  plans: 'https://davidsingerhealthinsurance.com/plans/',
  contact: 'https://davidsingerhealthinsurance.com/contact/',
  call: 'tel:7207246322',
  email: 'mailto:david@davidsingerhealthinsurance.com',
};

const HERO_IMAGE =
  'https://davidsingerhealthinsurance.com/wp-content/uploads/2025/02/Picture1.png';
const BRAND_IMAGE =
  'https://davidsingerhealthinsurance.com/wp-content/uploads/2023/05/Untitled-design-6-1.png';
const STAR_IMAGE = 'https://davidsingerhealthinsurance.com/wp-content/uploads/2023/05/cigna-star-1.png';
const PROFILE_IMAGE =
  'https://davidsingerhealthinsurance.com/wp-content/uploads/2019/10/david-outside.jpg';

const PLAN_GROUPS = [
  {
    title: 'Health Insurance',
    logos: [
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2019/10/anthem.png',
        label: 'Anthem',
      },
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2022/04/Kaiser-Permanente-Logo.png',
        label: 'Kaiser Permanente',
      },
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2022/03/cigna.png',
        label: 'Cigna',
      },
    ],
  },
  {
    title: 'Dental and Vision',
    logos: [
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2019/10/delta-dental.gif',
        label: 'Delta Dental',
      },
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2022/03/ameritas.png',
        label: 'Ameritas',
      },
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2024/10/MetLife.png',
        label: 'MetLife',
      },
    ],
  },
  {
    title: 'Accident and Critical Illness',
    logos: [
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2019/10/humana-1-scaled.jpg',
        label: 'Humana',
      },
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2020/02/lifesecure.jpg',
        label: 'LifeSecure',
      },
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2023/08/NatGenAl.png',
        label: 'National General',
      },
    ],
  },
  {
    title: 'Travel and Short Term Plans',
    logos: [
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2020/02/geoblue-logo-scaled.png',
        label: 'GeoBlue',
      },
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2022/03/img.png',
        label: 'IMG Insurance',
      },
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2019/10/cigna.png',
        label: 'Cigna',
      },
    ],
  },
  {
    title: 'Medicare',
    logos: [
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2023/02/medicare23.jpg',
        label: 'Medicare Insurance Direct',
      },
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2023/09/wellcarelogo180.png',
        label: 'Wellcare',
      },
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2022/10/CC9605ED-58F6-4AC2-B2F8-628DACE42BAE.png',
        label: 'Aetna',
      },
    ],
  },
  {
    title: 'Estate Planning',
    logos: [
      {
        uri: 'https://davidsingerhealthinsurance.com/wp-content/uploads/2019/10/netlaw-logo.png',
        label: 'NetLaw',
      },
    ],
  },
];

export default function DavidScreen() {
  const insets = useSafeAreaInsets();

  const openLink = useCallback(async (url) => {
    try {
      await Linking.openURL(url);
    } catch (_error) {
      // Intentionally no-op if external URL cannot be opened.
    }
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: 22 + insets.bottom }]}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={{ uri: HERO_IMAGE }}
        style={[styles.hero, { paddingTop: insets.top + 26 }]}
        resizeMode="cover"
      >
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Image source={{ uri: BRAND_IMAGE }} style={styles.brandImage} resizeMode="contain" />
          <Text style={styles.heroTitle}>Helping You Navigate</Text>
          <Text style={styles.heroSubtitle}>
            Rated One of the Best Health Insurance Agencies in Colorado
          </Text>
          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={[styles.buttonBase, styles.buttonGhost]}
              activeOpacity={0.86}
              onPress={() => openLink(LINKS.call)}
            >
              <Text style={[styles.buttonText, styles.buttonGhostText]}>CALL DAVID</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonBase, styles.buttonSolid]}
              activeOpacity={0.86}
              onPress={() => openLink(LINKS.plans)}
            >
              <Text style={styles.buttonText}>VIEW PLANS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.sectionCard}>
        <Image source={{ uri: STAR_IMAGE }} style={styles.ratingImage} resizeMode="contain" />
        <Text style={styles.sectionTitle}>Struggling to Find the Best Health Plan Option?</Text>
        <Text style={styles.sectionBody}>
          David Singer helps individuals, families, and businesses compare coverage options with
          clarity and confidence.
        </Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>About David Singer</Text>
        <Image source={{ uri: PROFILE_IMAGE }} style={styles.profileImage} resizeMode="cover" />
        <Text style={styles.sectionBody}>
          Work one-on-one to review the right benefits, pricing, and provider networks for your
          situation. Call (720) 724-6322 or email david@davidsingerhealthinsurance.com.
        </Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Browse Through The Health Insurance Plans Below</Text>
        {PLAN_GROUPS.map((group) => (
          <View key={group.title} style={styles.planCard}>
            <Text style={styles.planTitle}>{group.title}</Text>
            <View style={styles.logoRow}>
              {group.logos.map((logo) => (
                <View key={logo.uri} style={styles.logoWrap}>
                  <Image source={{ uri: logo.uri }} style={styles.logoImage} resizeMode="contain" />
                  <Text style={styles.logoLabel} numberOfLines={1}>
                    {logo.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.sectionCard, styles.ctaSection]}>
        <Text style={styles.ctaTitle}>Contact David Singer</Text>
        <Text style={styles.ctaBody}>Friendly guidance for health, Medicare, and dental plans.</Text>
        <View style={styles.ctaButtons}>
          <TouchableOpacity
            style={[styles.buttonBase, styles.buttonSolid, styles.ctaButton]}
            activeOpacity={0.86}
            onPress={() => openLink(LINKS.call)}
          >
            <Text style={styles.buttonText}>CALL (720) 724-6322</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonBase, styles.buttonOutline, styles.ctaButton]}
            activeOpacity={0.86}
            onPress={() => openLink(LINKS.email)}
          >
            <Text style={[styles.buttonText, styles.buttonOutlineText]}>EMAIL DAVID</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonBase, styles.buttonGhostBlue, styles.ctaButton]}
            activeOpacity={0.86}
            onPress={() => openLink(LINKS.home)}
          >
            <Text style={[styles.buttonText, styles.buttonGhostBlueText]}>OPEN WEBSITE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B87C8',
  },
  content: {
    paddingBottom: 20,
  },
  hero: {
    minHeight: 360,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 24, 43, 0.6)',
  },
  heroContent: {
    paddingHorizontal: 18,
    paddingBottom: 22,
  },
  brandImage: {
    width: 220,
    height: 54,
    marginBottom: 10,
  },
  heroTitle: {
    color: '#EAF5FF',
    fontSize: 34,
    lineHeight: 39,
    fontWeight: '700',
  },
  heroSubtitle: {
    marginTop: 8,
    color: '#D2E9FF',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  heroButtons: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  sectionCard: {
    marginTop: 12,
    marginHorizontal: 10,
    borderRadius: 3,
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  ratingImage: {
    width: 180,
    height: 28,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#1763A3',
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '700',
  },
  sectionBody: {
    marginTop: 10,
    color: '#35536E',
    fontSize: 14,
    lineHeight: 21,
  },
  profileImage: {
    marginTop: 12,
    width: '100%',
    height: 250,
    borderRadius: 2,
  },
  planCard: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#C7DDEE',
    borderRadius: 2,
    padding: 12,
    backgroundColor: '#F6FAFF',
  },
  planTitle: {
    color: '#1B5784',
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '700',
    marginBottom: 10,
  },
  logoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  logoWrap: {
    width: '31%',
    minHeight: 82,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#D6E6F3',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  logoImage: {
    width: '100%',
    height: 30,
  },
  logoLabel: {
    marginTop: 6,
    color: '#4A6073',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
  },
  ctaSection: {
    backgroundColor: '#1D6AA7',
  },
  ctaTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  ctaBody: {
    marginTop: 8,
    color: '#DDEEFF',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  ctaButtons: {
    marginTop: 12,
    gap: 8,
  },
  ctaButton: {
    width: '100%',
  },
  buttonBase: {
    minHeight: 36,
    borderRadius: 2,
    borderWidth: 1,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSolid: {
    borderColor: '#1763A3',
    backgroundColor: '#1763A3',
  },
  buttonGhost: {
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  buttonOutline: {
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  buttonGhostBlue: {
    borderColor: '#D6E7F9',
    backgroundColor: '#D6E7F9',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  buttonGhostText: {
    color: '#FFFFFF',
  },
  buttonOutlineText: {
    color: '#FFFFFF',
  },
  buttonGhostBlueText: {
    color: '#1763A3',
  },
});
