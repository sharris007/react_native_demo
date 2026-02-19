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

const SERVICE_PROMISES = [
  'Personalized plan matching based on providers, prescriptions, and monthly budget.',
  'Side-by-side comparisons for ACA, Medicare, dental, vision, and supplemental coverage.',
  'Fast enrollment support and year-round policy checkups so your plan keeps working for you.',
];

const WORKFLOW_STEPS = [
  {
    title: 'Discovery call',
    body: 'A short consultation to understand your household needs and must-have doctors.',
  },
  {
    title: 'Coverage blueprint',
    body: 'A curated shortlist of plans with clear pros, tradeoffs, and monthly cost ranges.',
  },
  {
    title: 'Confident enrollment',
    body: 'Hands-on support through application, activation, and post-enrollment follow-up.',
  },
];

export default function DavidTwoScreen() {
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
      contentContainerStyle={[styles.content, { paddingBottom: 26 + insets.bottom }]}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={{ uri: HERO_IMAGE }}
        style={[styles.hero, { paddingTop: insets.top + 24 }]}
        resizeMode="cover"
      >
        <View style={styles.heroShade} />
        <View style={styles.heroGlow} />
        <View style={styles.heroContent}>
          <Text style={styles.heroBadge}>Colorado Licensed Benefits Agency</Text>
          <Image source={{ uri: BRAND_IMAGE }} style={styles.brandImage} resizeMode="contain" />
          <Text style={styles.heroTitle}>David Singer Coverage Studio</Text>
          <Text style={styles.heroSubtitle}>
            A refreshed healthcare agency look focused on guidance, speed, and peace of mind.
          </Text>
          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={[styles.buttonBase, styles.buttonGhost]}
              activeOpacity={0.88}
              onPress={() => openLink(LINKS.call)}
            >
              <Text style={[styles.buttonText, styles.buttonGhostText]}>CALL NOW</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonBase, styles.buttonSolid]}
              activeOpacity={0.88}
              onPress={() => openLink(LINKS.plans)}
            >
              <Text style={styles.buttonText}>EXPLORE PLANS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.ratingRibbon}>
        <Image source={{ uri: STAR_IMAGE }} style={styles.ratingImage} resizeMode="contain" />
        <Text style={styles.ratingText}>Trusted advisor for Colorado health and Medicare plans.</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionEyebrow}>What makes this version better</Text>
        <Text style={styles.sectionTitle}>A cleaner, modern agency experience</Text>
        <View style={styles.promiseList}>
          {SERVICE_PROMISES.map((item) => (
            <View key={item} style={styles.promiseRow}>
              <View style={styles.promiseDot} />
              <Text style={styles.promiseText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.profileSection}>
        <Image source={{ uri: PROFILE_IMAGE }} style={styles.profileImage} resizeMode="cover" />
        <View style={styles.profileCard}>
          <Text style={styles.profileTitle}>About David Singer</Text>
          <Text style={styles.profileBody}>
            Work one-on-one to find the right blend of provider access, monthly premium, and
            long-term value. Call (720) 724-6322 or email david@davidsingerhealthinsurance.com.
          </Text>
          <TouchableOpacity
            style={[styles.buttonBase, styles.buttonOutlineTeal]}
            activeOpacity={0.88}
            onPress={() => openLink(LINKS.contact)}
          >
            <Text style={[styles.buttonText, styles.buttonOutlineTealText]}>BOOK A CONSULTATION</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionEyebrow}>Carrier network</Text>
        <Text style={styles.sectionTitle}>Browse coverage categories and partners</Text>
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

      <View style={styles.sectionCard}>
        <Text style={styles.sectionEyebrow}>Simple process</Text>
        <Text style={styles.sectionTitle}>How your plan journey works</Text>
        <View style={styles.stepsGrid}>
          {WORKFLOW_STEPS.map((step, index) => (
            <View key={step.title} style={styles.stepCard}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepBody}>{step.body}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.sectionCard, styles.ctaSection]}>
        <Text style={styles.ctaTitle}>Ready to review your options?</Text>
        <Text style={styles.ctaBody}>
          Get guided support for health, Medicare, travel, and supplemental plans.
        </Text>
        <View style={styles.ctaButtons}>
          <TouchableOpacity
            style={[styles.buttonBase, styles.buttonSolidLight, styles.ctaButton]}
            activeOpacity={0.88}
            onPress={() => openLink(LINKS.call)}
          >
            <Text style={[styles.buttonText, styles.buttonSolidLightText]}>CALL (720) 724-6322</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonBase, styles.buttonGhostLight, styles.ctaButton]}
            activeOpacity={0.88}
            onPress={() => openLink(LINKS.email)}
          >
            <Text style={[styles.buttonText, styles.buttonGhostLightText]}>EMAIL DAVID</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonBase, styles.buttonGhostLight, styles.ctaButton]}
            activeOpacity={0.88}
            onPress={() => openLink(LINKS.home)}
          >
            <Text style={[styles.buttonText, styles.buttonGhostLightText]}>VISIT WEBSITE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F3F2',
  },
  content: {
    backgroundColor: '#E7F3F2',
  },
  hero: {
    minHeight: 385,
    justifyContent: 'flex-end',
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 34, 48, 0.66)',
  },
  heroGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 260,
    height: 230,
    backgroundColor: 'rgba(69, 210, 190, 0.23)',
    borderBottomLeftRadius: 180,
  },
  heroContent: {
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    color: '#C8FFF3',
    borderWidth: 1,
    borderColor: 'rgba(200, 255, 243, 0.72)',
    backgroundColor: 'rgba(13, 84, 95, 0.52)',
    borderRadius: 999,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 12,
  },
  brandImage: {
    width: 222,
    height: 56,
  },
  heroTitle: {
    marginTop: 10,
    color: '#F3FFFE',
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
  },
  heroSubtitle: {
    marginTop: 9,
    color: '#D1F5F0',
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 520,
  },
  heroButtons: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  ratingRibbon: {
    marginTop: -12,
    marginHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6ECE9',
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#093942',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  ratingImage: {
    width: 120,
    height: 24,
  },
  ratingText: {
    flex: 1,
    color: '#245B64',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  sectionCard: {
    marginTop: 14,
    marginHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1E7E4',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#0D3A42',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionEyebrow: {
    color: '#0B8A79',
    fontSize: 11,
    letterSpacing: 0.6,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    marginTop: 6,
    color: '#0D4D57',
    fontSize: 27,
    lineHeight: 32,
    fontWeight: '800',
  },
  promiseList: {
    marginTop: 12,
    gap: 10,
  },
  promiseRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  promiseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 10,
    backgroundColor: '#10A089',
  },
  promiseText: {
    flex: 1,
    color: '#3A6064',
    fontSize: 14,
    lineHeight: 21,
  },
  profileSection: {
    marginTop: 14,
    marginHorizontal: 12,
    gap: 10,
  },
  profileImage: {
    width: '100%',
    height: 240,
    borderRadius: 16,
  },
  profileCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1E7E4',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  profileTitle: {
    color: '#0D4D57',
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '800',
  },
  profileBody: {
    marginTop: 10,
    color: '#3A6064',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },
  planCard: {
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D7EBE8',
    backgroundColor: '#F8FCFC',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  planTitle: {
    color: '#0E6A73',
    fontSize: 19,
    lineHeight: 24,
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
    minHeight: 84,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9ECEA',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
    paddingVertical: 9,
  },
  logoImage: {
    width: '100%',
    height: 32,
  },
  logoLabel: {
    marginTop: 6,
    color: '#476A6E',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
  },
  stepsGrid: {
    marginTop: 12,
    gap: 10,
  },
  stepCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D7ECE8',
    backgroundColor: '#F6FCFB',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  stepBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#0D8D7C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  stepTitle: {
    marginTop: 8,
    color: '#0D4D57',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  stepBody: {
    marginTop: 5,
    color: '#4B6E72',
    fontSize: 13,
    lineHeight: 19,
  },
  ctaSection: {
    backgroundColor: '#0D4D57',
    borderColor: '#0D4D57',
    paddingTop: 18,
  },
  ctaTitle: {
    color: '#F1FFFD',
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '800',
  },
  ctaBody: {
    marginTop: 8,
    color: '#CDEDE9',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
  },
  ctaButtons: {
    marginTop: 14,
    gap: 8,
  },
  ctaButton: {
    width: '100%',
  },
  buttonBase: {
    minHeight: 38,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSolid: {
    borderColor: '#18A894',
    backgroundColor: '#18A894',
  },
  buttonGhost: {
    borderColor: '#D1F7F1',
    backgroundColor: 'transparent',
  },
  buttonOutlineTeal: {
    borderColor: '#0D8D7C',
    backgroundColor: 'transparent',
  },
  buttonSolidLight: {
    borderColor: '#D2FAF4',
    backgroundColor: '#D2FAF4',
  },
  buttonGhostLight: {
    borderColor: '#87CFC5',
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '800',
    letterSpacing: 0.45,
    color: '#FFFFFF',
  },
  buttonGhostText: {
    color: '#D9FFF9',
  },
  buttonOutlineTealText: {
    color: '#0D8D7C',
  },
  buttonSolidLightText: {
    color: '#0B535C',
  },
  buttonGhostLightText: {
    color: '#D9FFF9',
  },
});
