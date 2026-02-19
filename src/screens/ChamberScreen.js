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
  home: 'https://denverjewishchamber.com/',
  membership: 'https://denverjewishchamber.com/join/membership/',
  contact: 'https://denverjewishchamber.com/contact/',
  board: 'https://denverjewishchamber.com/about/board-members/',
};

const VALUE_ITEMS = [
  'Build your network, generate leads, and grow your business.',
  'Participate in peer discussions and strengthen your community.',
  'Discover new opportunities while meeting like-minded professionals.',
];

const HERO_IMAGE =
  'https://denverjewishchamber.com/wp-content/uploads/2025/06/%C2%A9InSync-DJCC_Lunch_4-22-25-088_web-scaled.jpeg';
const BOARD_IMAGE = 'https://denverjewishchamber.com/wp-content/uploads/2022/06/team.png';

export default function ChamberScreen() {
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
      contentContainerStyle={[styles.content, { paddingBottom: 24 + insets.bottom }]}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={{ uri: HERO_IMAGE }}
        style={[styles.hero, { paddingTop: insets.top + 28 }]}
        resizeMode="cover"
      >
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>The Denver Jewish Chamber of Commerce</Text>
          <Text style={styles.heroSubtitle}>
            Connect, collaborate, and grow your business through integrity and community.
          </Text>
          <View style={styles.heroButtonRow}>
            <TouchableOpacity
              style={[styles.buttonBase, styles.buttonGhost]}
              activeOpacity={0.85}
              onPress={() => openLink(LINKS.membership)}
            >
              <Text style={[styles.buttonText, styles.buttonGhostText]}>BECOME A MEMBER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonBase, styles.buttonSolid]}
              activeOpacity={0.85}
              onPress={() => openLink(LINKS.contact)}
            >
              <Text style={styles.buttonText}>CONTACT US</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.lightSection}>
        <Text style={styles.lightTitle}>Business is booming</Text>
        <Text style={styles.lightBody}>
          Learn why Chamber members consistently build strong relationships, referrals, and long-term
          growth.
        </Text>
        <TouchableOpacity
          style={[styles.buttonBase, styles.buttonOutlineBlue]}
          activeOpacity={0.85}
          onPress={() => openLink(LINKS.home)}
        >
          <Text style={[styles.buttonText, styles.buttonOutlineBlueText]}>TESTIMONIALS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.darkSection}>
        {VALUE_ITEMS.map((item, index) => (
          <View
            key={item}
            style={[
              styles.valueRow,
              index !== VALUE_ITEMS.length - 1 && styles.valueRowDivider,
            ]}
          >
            <View style={styles.valueDot} />
            <Text style={styles.valueText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.boardSection}>
        <Image source={{ uri: BOARD_IMAGE }} style={styles.boardImage} resizeMode="cover" />
        <View style={styles.boardContent}>
          <Text style={styles.boardTitle}>Get to know our leadership</Text>
          <Text style={styles.boardBody}>
            Meet the member volunteers guiding the Chamber&apos;s mission and future growth.
          </Text>
          <View style={styles.boardButtonCol}>
            <TouchableOpacity
              style={[styles.buttonBase, styles.buttonOutlineBlue, styles.boardButton]}
              activeOpacity={0.85}
              onPress={() => openLink(LINKS.board)}
            >
              <Text style={[styles.buttonText, styles.buttonOutlineBlueText]}>OUR BOARD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonBase, styles.buttonOutlineBlue, styles.boardButton]}
              activeOpacity={0.85}
              onPress={() => openLink(LINKS.contact)}
            >
              <Text style={[styles.buttonText, styles.buttonOutlineBlueText]}>CONTACT US</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.quoteSection}>
        <Text style={styles.quoteMark}>"</Text>
        <Text style={styles.quoteText}>
          The Denver Jewish Chamber of Commerce is more than networking. It is a community that
          embraces integrity, inclusivity, and dignity while supporting one another&apos;s livelihood.
        </Text>
        <Text style={styles.quoteAuthor}>Ellen Trachman, Managing Attorney</Text>
      </View>

      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Sponsorship opportunities are available now.</Text>
        <Text style={styles.ctaBody}>
          Promote your business while supporting one of Denver&apos;s most connected professional
          communities.
        </Text>
        <TouchableOpacity
          style={[styles.buttonBase, styles.buttonGhost, styles.ctaButton]}
          activeOpacity={0.85}
          onPress={() => openLink(LINKS.contact)}
        >
          <Text style={[styles.buttonText, styles.buttonGhostText]}>CONTACT US TODAY</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9E9',
  },
  content: {
    backgroundColor: '#E9E9E9',
  },
  hero: {
    minHeight: 370,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(12, 20, 33, 0.55)',
  },
  heroContent: {
    paddingHorizontal: 18,
    paddingBottom: 26,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 31,
    lineHeight: 36,
    fontWeight: '700',
    marginBottom: 10,
  },
  heroSubtitle: {
    color: '#F4F6F8',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  heroButtonRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  lightSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 30,
    alignItems: 'center',
  },
  lightTitle: {
    color: '#1F5E91',
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 8,
  },
  lightBody: {
    color: '#5C6875',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  darkSection: {
    backgroundColor: '#0D1016',
    paddingHorizontal: 18,
    paddingVertical: 22,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 11,
  },
  valueRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#253040',
  },
  valueDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginTop: 6,
    marginRight: 11,
    backgroundColor: '#2A6FA8',
  },
  valueText: {
    flex: 1,
    color: '#F3F5F8',
    fontSize: 14,
    lineHeight: 21,
  },
  boardSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 14,
    marginHorizontal: 12,
    borderRadius: 2,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  boardImage: {
    width: '42%',
    minHeight: 188,
  },
  boardContent: {
    width: '58%',
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  boardTitle: {
    color: '#1F5E91',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  boardBody: {
    color: '#5C6875',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 10,
  },
  boardButtonCol: {
    gap: 8,
  },
  boardButton: {
    width: '100%',
    height: 32,
  },
  quoteSection: {
    marginTop: 14,
    marginHorizontal: 12,
    backgroundColor: '#E2E2E2',
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  quoteMark: {
    color: '#1F5E91',
    fontSize: 54,
    lineHeight: 54,
    marginBottom: 6,
    fontWeight: '700',
  },
  quoteText: {
    color: '#4F5D6D',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
  },
  quoteAuthor: {
    marginTop: 10,
    color: '#7A8087',
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  ctaSection: {
    marginTop: 14,
    marginHorizontal: 12,
    backgroundColor: '#1F5E91',
    paddingHorizontal: 20,
    paddingVertical: 22,
    alignItems: 'center',
  },
  ctaTitle: {
    color: '#FFFFFF',
    fontSize: 23,
    lineHeight: 29,
    textAlign: 'center',
    fontWeight: '700',
  },
  ctaBody: {
    color: '#DCE6F1',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 14,
  },
  ctaButton: {
    minWidth: 180,
  },
  buttonBase: {
    minHeight: 36,
    paddingHorizontal: 13,
    borderRadius: 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSolid: {
    borderColor: '#1F5E91',
    backgroundColor: '#1F5E91',
  },
  buttonGhost: {
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  buttonOutlineBlue: {
    borderColor: '#1F5E91',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonGhostText: {
    color: '#FFFFFF',
  },
  buttonOutlineBlueText: {
    color: '#1F5E91',
  },
});
