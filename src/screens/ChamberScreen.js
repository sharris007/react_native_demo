import {
  Image,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HERO_IMAGE_URL =
  'https://denverjewishchamber.com/wp-content/uploads/2025/06/%C2%A9InSync-DJCC_Lunch_4-22-25-088_web-scaled.jpeg';
const LOGO_IMAGE_URL =
  'https://denverjewishchamber.com/wp-content/uploads/2022/06/djcc-logo-e1655960433493.png';
const NETWORK_IMAGE_URL =
  'https://denverjewishchamber.com/wp-content/uploads/2024/12/Breakfast-201-500-px.png';
const TEAM_ICON_URL = 'https://denverjewishchamber.com/wp-content/uploads/2022/06/team.png';
const VISION_ICON_URL = 'https://denverjewishchamber.com/wp-content/uploads/2022/06/vision.png';
const FOOTER_LOGO_URL =
  'https://denverjewishchamber.com/wp-content/uploads/2022/06/djcc-logo-removebg-preview.png';

const JOIN_CHAMBER_URL = 'https://denverjewishchamber.com/clients/djcc/join/membership/';
const CONTACT_US_URL = 'https://denverjewishchamber.com/clients/djcc/contact/';
const RENEW_MEMBERSHIP_URL =
  'https://business.denverjewishchamber.com/events/details/membership-renewal-2435';
const EVENTS_URL = 'https://business.denverjewishchamber.com/events';
const ABOUT_URL = 'https://denverjewishchamber.com/clients/djcc/about/';
const DIRECTORY_URL = 'https://business.denverjewishchamber.com/list';
const GET_INVOLVED_URL = 'https://denverjewishchamber.com/join/get-involved/';
const BOARD_URL = 'https://denverjewishchamber.com/about/board-members/';
const PHONE_URL = 'tel:7207071612';
const EMAIL_URL = 'mailto:info@denverjewishchamber.com';

const HERO_ACTIONS = [
  { label: 'Join Chamber', url: JOIN_CHAMBER_URL },
  { label: 'Renew Membership', url: RENEW_MEMBERSHIP_URL },
  { label: 'Contact Us', url: CONTACT_US_URL },
  { label: 'Events', url: EVENTS_URL },
];

const QUESTION_CARDS = [
  {
    title: 'Cashed casino propose-t-il du support en direct ?',
    body:
      'Une assistance disponible en continu est assuree pour les joueurs afin de repondre rapidement aux questions.',
  },
  {
    title: 'Betify propose-t-il un programme VIP ?',
    body:
      'Des avantages exclusifs et recompenses progressives sont proposes aux membres fideles selon leur activite.',
  },
  {
    title: 'Betriot fonctionne-t-il sur mobile ?',
    body:
      'La plateforme est adaptee aux appareils mobiles pour jouer partout avec une navigation simple et stable.',
  },
  {
    title: 'Puedo jugar en Playuzu sin sonido?',
    body:
      'Si, los juegos permiten silenciar efectos desde la configuracion de usuario segun tus preferencias.',
  },
];

const NETWORK_POINTS = [
  'Build your network, generate leads and grow your business',
  'Participate in peer group discussions and chamber events',
  'Be a part of the greater Jewish community',
  'Discover new opportunities and make new friends',
];

const VALUE_CARDS = [
  {
    title: 'OUR MISSION',
    text: 'To foster business growth through the Jewish values of Integrity, Inclusivity and Dignity.',
    icon: TEAM_ICON_URL,
  },
  {
    title: 'OUR VISION',
    text:
      'Growing business through integrity. Strengthening community through inclusivity. Promoting personal growth through dignity.',
    icon: VISION_ICON_URL,
  },
  {
    title: 'CORE VALUES',
    text: 'Serving others first to promote ethical business practices in the community.',
    icon: TEAM_ICON_URL,
  },
];

const CHAMBER_CARDS = [
  {
    title: 'Join The Chamber',
    description:
      'The Denver Jewish Chamber of Commerce is open to individuals of all faiths who want trustworthy relationships, leads and referrals.',
    url: JOIN_CHAMBER_URL,
  },
  {
    title: 'Get Involved',
    description:
      'Attend educational and social events, volunteer, and connect regularly with members and the wider community.',
    url: GET_INVOLVED_URL,
  },
  {
    title: 'Meet The Board',
    description:
      'Board members guide chamber growth, membership and opportunities while serving in multi-year volunteer commitments.',
    url: BOARD_URL,
  },
];

const UPCOMING_EVENTS = [
  {
    time: '07:30 AM - 08:30 AM MDT',
    title: 'Breakfast Networking 1st & 3rd Wednesdays',
  },
  {
    time: '11:15 AM - 12:30 PM MDT',
    title: 'Lunch Networking 4th Tuesday',
  },
];

const WHAT_WE_DO_LINKS = [
  { label: 'About', url: 'https://denverjewishchamber.com/about/' },
  { label: 'Membership', url: JOIN_CHAMBER_URL },
  { label: 'Become a Benefactor', url: 'https://denverjewishchamber.com/join/become-a-benefactor/' },
  { label: 'Events', url: EVENTS_URL },
  { label: 'Gallery', url: 'https://denverjewishchamber.com/gallery/' },
  { label: 'FAQs', url: 'https://denverjewishchamber.com/faqs/' },
  { label: 'Contact', url: CONTACT_US_URL },
];

async function openExternalUrl(url) {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  } catch (error) {
    console.warn('Unable to open URL:', url, error);
  }
}

function ExternalButton({ label, url, style, textStyle }) {
  return (
    <Pressable
      onPress={() => openExternalUrl(url)}
      style={({ pressed }) => [styles.buttonBase, style, pressed && styles.buttonPressed]}
    >
      <Text style={[styles.buttonBaseText, textStyle]}>{label}</Text>
    </Pressable>
  );
}

export default function ChamberScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const topInset = Math.max(insets.top, 8);
  const bottomInset = Math.max(insets.bottom, 18);

  // Mobile-first design, then progressively enhance for tablet/web.
  const isTablet = width >= 760;
  const isDesktop = width >= 1100;
  const sidePadding = isDesktop ? 30 : isTablet ? 24 : 14;
  const contentMaxWidth = isDesktop ? 1100 : isTablet ? 920 : 460;
  const heroTitleSize = isDesktop ? 62 : isTablet ? 52 : 40;
  const heroSubtitleSize = isDesktop ? 36 : isTablet ? 30 : 26;
  const sectionTitleSize = isDesktop ? 38 : isTablet ? 34 : 28;
  const heroMinHeight = isDesktop ? 560 : isTablet ? 500 : 420;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomInset }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.page, { maxWidth: contentMaxWidth }]}>
          <View
            style={[
              styles.siteHeader,
              {
                paddingTop: topInset + 6,
                paddingHorizontal: sidePadding,
              },
            ]}
          >
            <Image source={{ uri: LOGO_IMAGE_URL }} style={styles.logo} resizeMode="contain" />
            <View style={styles.hamburgerIcon}>
              <View style={styles.hamburgerLine} />
              <View style={styles.hamburgerLine} />
              <View style={styles.hamburgerLine} />
            </View>
          </View>
          <View style={styles.headerDivider} />

          <ImageBackground
            source={{ uri: HERO_IMAGE_URL }}
            style={[styles.hero, { minHeight: heroMinHeight }]}
            imageStyle={styles.heroImage}
          >
            <View
              style={[
                styles.heroOverlay,
                {
                  paddingHorizontal: sidePadding,
                  paddingTop: isTablet ? 72 : 62,
                  paddingBottom: isTablet ? 36 : 28,
                },
              ]}
            >
              <View style={[styles.heroRow, isTablet && styles.heroRowWide]}>
                <View style={[styles.heroTextWrap, isTablet && styles.heroTextWrapWide]}>
                  <Text
                    style={[
                      styles.heroTitle,
                      {
                        fontSize: heroTitleSize,
                        lineHeight: heroTitleSize + 4,
                      },
                    ]}
                  >
                    Growing Business{'\n'}Through Integrity
                  </Text>
                  <Text
                    style={[
                      styles.heroSubtitle,
                      {
                        fontSize: heroSubtitleSize,
                        lineHeight: heroSubtitleSize + 4,
                      },
                    ]}
                  >
                    Working to grow YOUR{'\n'}Business
                  </Text>
                </View>
                <View style={[styles.actionsColumn, isTablet && styles.actionsColumnWide]}>
                  {HERO_ACTIONS.map((action) => (
                    <ExternalButton
                      key={action.label}
                      label={action.label}
                      url={action.url}
                      style={[styles.heroButton, isTablet && styles.heroButtonWide]}
                      textStyle={styles.heroButtonText}
                    />
                  ))}
                </View>
              </View>
            </View>
          </ImageBackground>

          <View style={[styles.section, styles.welcomeSection, { paddingHorizontal: sidePadding }]}>
            <Text style={[styles.sectionTitleBlue, { fontSize: sectionTitleSize }]}>
              Welcome to The Denver Jewish Chamber of Commerce
            </Text>
            <Text style={styles.sectionBody}>
              The Denver Jewish Chamber of Commerce, formally known as the Jewish Business
              Association, was founded in 2011 to unite the Denver Jewish business community and
              connect professionals and entrepreneurs through integrity, inclusivity and dignity.
            </Text>
            <ExternalButton
              label="Register Now"
              url={EVENTS_URL}
              style={styles.primaryActionButton}
              textStyle={styles.primaryActionButtonText}
            />
          </View>

          <View style={[styles.section, styles.darkSection, { paddingHorizontal: sidePadding }]}>
            <Text style={styles.darkSectionTitle}>Latest Member Questions</Text>
            <View style={styles.questionGrid}>
              {QUESTION_CARDS.map((card) => (
                <View key={card.title} style={[styles.questionCard, isTablet && styles.questionCardWide]}>
                  <Text style={styles.questionTitle}>{card.title}</Text>
                  <Text style={styles.questionBody}>{card.body}</Text>
                  <ExternalButton
                    label="Read More"
                    url={ABOUT_URL}
                    style={styles.outlineActionButton}
                    textStyle={styles.outlineActionButtonText}
                  />
                </View>
              ))}
            </View>
          </View>

          <View
            style={[
              styles.section,
              styles.networkSection,
              { paddingHorizontal: sidePadding },
              isTablet && styles.networkSectionWide,
            ]}
          >
            <Image
              source={{ uri: NETWORK_IMAGE_URL }}
              style={[styles.networkImage, isTablet && styles.networkImageWide]}
            />
            <View style={[styles.networkContent, isTablet && styles.networkContentWide]}>
              {NETWORK_POINTS.map((point) => (
                <View key={point} style={styles.pointRow}>
                  <Text style={styles.pointIcon}>+</Text>
                  <Text style={styles.pointText}>{point}</Text>
                </View>
              ))}
              <View style={[styles.networkButtons, isTablet && styles.networkButtonsWide]}>
                <ExternalButton
                  label="Read More"
                  url={ABOUT_URL}
                  style={[styles.secondaryActionButton, isTablet && styles.buttonWithRightSpace]}
                  textStyle={styles.secondaryActionButtonText}
                />
                <ExternalButton
                  label="View Directory"
                  url={DIRECTORY_URL}
                  style={styles.primaryActionButton}
                  textStyle={styles.primaryActionButtonText}
                />
              </View>
            </View>
          </View>

          <View style={[styles.section, styles.testimonialSection, { paddingHorizontal: sidePadding }]}>
            <Text style={styles.quoteMark}>"</Text>
            <Text style={styles.testimonialText}>
              My experience with the Denver Jewish Chamber of Commerce has exceeded my expectations.
              There is a real sense of community among the members.
            </Text>
            <Text style={styles.testimonialAuthor}>
              Nancy Gaines, Founder - Gain Advantage, Business Consulting
            </Text>
          </View>

          <View style={[styles.section, styles.valuesSection, { paddingHorizontal: sidePadding }]}>
            <View style={styles.valuesGrid}>
              {VALUE_CARDS.map((card) => (
                <View key={card.title} style={[styles.valueCard, isTablet && styles.valueCardWide]}>
                  <Image source={{ uri: card.icon }} style={styles.valueIcon} />
                  <Text style={styles.valueTitle}>{card.title}</Text>
                  <Text style={styles.valueText}>{card.text}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.section, styles.joinSection, { paddingHorizontal: sidePadding }]}>
            <View style={styles.joinGrid}>
              {CHAMBER_CARDS.map((card) => (
                <View key={card.title} style={[styles.joinCard, isTablet && styles.joinCardWide]}>
                  <Text style={styles.joinTitle}>{card.title}</Text>
                  <Text style={styles.joinDescription}>{card.description}</Text>
                  <ExternalButton
                    label="Learn More"
                    url={card.url}
                    style={styles.secondaryActionButton}
                    textStyle={styles.secondaryActionButtonText}
                  />
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.section, styles.eventsSection, { paddingHorizontal: sidePadding }]}>
            <Text style={styles.eventsTitle}>Upcoming Events</Text>
            <Text style={styles.eventsBody}>
              Interested in checking out or registering for upcoming events? Visit the events page
              below to view the full calendar.
            </Text>
            <View style={styles.eventsGrid}>
              {UPCOMING_EVENTS.map((event) => (
                <View key={event.title} style={[styles.eventCard, isTablet && styles.eventCardWide]}>
                  <Text style={styles.eventTime}>{event.time}</Text>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                </View>
              ))}
            </View>
            <ExternalButton
              label="View Calendar & Register"
              url={EVENTS_URL}
              style={styles.heroButton}
              textStyle={styles.heroButtonText}
            />
          </View>

          <View style={[styles.section, styles.directorySection, { paddingHorizontal: sidePadding }]}>
            <Text style={styles.directoryTitle}>Business Directory</Text>
            <Text style={styles.directoryBody}>
              Looking for a service provider in the Denver Jewish community? Explore member
              services in our directory.
            </Text>
            <ExternalButton
              label="View Directory"
              url={DIRECTORY_URL}
              style={styles.whiteActionButton}
              textStyle={styles.whiteActionButtonText}
            />
          </View>

          <View
            style={[
              styles.section,
              styles.footerSection,
              { paddingHorizontal: sidePadding },
              isTablet && styles.footerSectionWide,
            ]}
          >
            <View style={[styles.footerColumn, isTablet && styles.footerColumnWide]}>
              <Image source={{ uri: FOOTER_LOGO_URL }} style={styles.footerLogo} resizeMode="contain" />
              <Text style={styles.footerText}>P.O.Box 371516 Denver, CO 80237</Text>
              <Pressable onPress={() => openExternalUrl(PHONE_URL)}>
                <Text style={styles.footerLink}>Phone: (720) 707-1612</Text>
              </Pressable>
              <Pressable onPress={() => openExternalUrl(EMAIL_URL)}>
                <Text style={styles.footerLink}>info@denverjewishchamber.com</Text>
              </Pressable>
            </View>

            <View style={[styles.footerColumn, isTablet && styles.footerColumnWide]}>
              <Text style={styles.footerHeading}>What We Do</Text>
              {WHAT_WE_DO_LINKS.map((link) => (
                <Pressable key={link.label} onPress={() => openExternalUrl(link.url)}>
                  <Text style={styles.footerLink}>{link.label}</Text>
                </Pressable>
              ))}
              <View style={styles.updatesCard}>
                <Text style={styles.updatesTitle}>Get Updates!</Text>
                <Text style={styles.updatesText}>
                  Signup for chamber updates, member shout outs and monthly announcements.
                </Text>
                <View style={styles.emailPlaceholder}>
                  <Text style={styles.emailPlaceholderText}>Email</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff3',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
  },
  page: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  siteHeader: {
    backgroundColor: '#ffffff',
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 190,
    height: 64,
  },
  hamburgerIcon: {
    width: 30,
  },
  hamburgerLine: {
    height: 3,
    borderRadius: 2,
    backgroundColor: '#1f6fa8',
    marginVertical: 2,
  },
  headerDivider: {
    height: 3,
    backgroundColor: '#1d74b9',
  },
  hero: {
    width: '100%',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 28, 44, 0.38)',
  },
  heroRow: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heroRowWide: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  heroTextWrap: {
    maxWidth: '100%',
  },
  heroTextWrapWide: {
    maxWidth: '62%',
  },
  heroTitle: {
    color: '#ffffff',
    fontWeight: '500',
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  heroSubtitle: {
    color: '#ffffff',
    fontWeight: '400',
  },
  actionsColumn: {
    marginTop: 20,
    width: '100%',
    alignItems: 'flex-start',
  },
  actionsColumnWide: {
    width: 240,
    marginTop: 0,
    marginLeft: 22,
  },
  buttonBase: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  buttonBaseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  heroButton: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#c8deef',
    backgroundColor: '#1e4f79',
  },
  heroButtonWide: {
    width: 228,
  },
  heroButtonText: {
    color: '#ffffff',
    textDecorationLine: 'underline',
  },
  section: {
    width: '100%',
  },
  welcomeSection: {
    paddingTop: 28,
    paddingBottom: 30,
  },
  sectionTitleBlue: {
    color: '#1e4f79',
    fontWeight: '700',
    lineHeight: 42,
    marginBottom: 12,
  },
  sectionBody: {
    fontSize: 15,
    lineHeight: 23,
    color: '#4b5563',
    marginBottom: 16,
  },
  primaryActionButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#1e4f79',
    borderWidth: 1,
    borderColor: '#1e4f79',
    paddingHorizontal: 18,
  },
  primaryActionButtonText: {
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    fontSize: 14,
    fontWeight: '700',
  },
  darkSection: {
    backgroundColor: '#111318',
    paddingTop: 28,
    paddingBottom: 18,
  },
  darkSectionTitle: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 16,
  },
  questionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  questionCard: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#273142',
    backgroundColor: '#171b23',
    padding: 14,
    marginBottom: 12,
  },
  questionCardWide: {
    width: '48.6%',
  },
  questionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 8,
  },
  questionBody: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },
  outlineActionButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#80a7c7',
    paddingHorizontal: 14,
    marginBottom: 0,
  },
  outlineActionButtonText: {
    color: '#c8deef',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  networkSection: {
    paddingTop: 22,
    paddingBottom: 26,
  },
  networkSectionWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  networkImage: {
    width: '100%',
    height: 230,
    borderRadius: 12,
    marginBottom: 18,
  },
  networkImageWide: {
    width: '42%',
    height: 260,
    marginBottom: 0,
  },
  networkContent: {
    flex: 1,
  },
  networkContentWide: {
    marginLeft: 20,
  },
  pointRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  pointIcon: {
    fontSize: 20,
    lineHeight: 20,
    color: '#1e4f79',
    fontWeight: '800',
    marginRight: 10,
    marginTop: 1,
  },
  pointText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#1f2937',
  },
  networkButtons: {
    marginTop: 10,
  },
  networkButtonsWide: {
    flexDirection: 'row',
  },
  secondaryActionButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#1e4f79',
    paddingHorizontal: 16,
  },
  secondaryActionButtonText: {
    color: '#1e4f79',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    fontSize: 13,
    fontWeight: '700',
  },
  buttonWithRightSpace: {
    marginRight: 10,
  },
  testimonialSection: {
    alignItems: 'center',
    backgroundColor: '#ebedef',
    paddingTop: 30,
    paddingBottom: 30,
  },
  quoteMark: {
    color: '#5d7e9a',
    fontSize: 60,
    lineHeight: 54,
    marginBottom: 12,
  },
  testimonialText: {
    color: '#3f4752',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    maxWidth: 740,
    marginBottom: 12,
  },
  testimonialAuthor: {
    color: '#4b6072',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  valuesSection: {
    backgroundColor: '#f7f9fc',
    paddingTop: 22,
    paddingBottom: 16,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  valueCard: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d9e1ea',
    backgroundColor: '#ffffff',
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  valueCardWide: {
    width: '32%',
  },
  valueIcon: {
    width: 44,
    height: 44,
    marginBottom: 10,
  },
  valueTitle: {
    color: '#1f4567',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  valueText: {
    color: '#4b5563',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  joinSection: {
    backgroundColor: '#ffffff',
    paddingTop: 8,
    paddingBottom: 18,
  },
  joinGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  joinCard: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d9e1ea',
    backgroundColor: '#f7fbff',
    padding: 16,
    marginBottom: 12,
  },
  joinCardWide: {
    width: '32%',
  },
  joinTitle: {
    color: '#1f4567',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  joinDescription: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },
  eventsSection: {
    backgroundColor: '#1b2029',
    paddingTop: 28,
    paddingBottom: 22,
  },
  eventsTitle: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10,
  },
  eventsBody: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
    maxWidth: 760,
  },
  eventsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  eventCard: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 14,
    marginBottom: 12,
  },
  eventCardWide: {
    width: '48.8%',
  },
  eventTime: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  eventTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  directorySection: {
    backgroundColor: '#0f1724',
    paddingTop: 28,
    paddingBottom: 30,
  },
  directoryTitle: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10,
  },
  directoryBody: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
    maxWidth: 780,
  },
  whiteActionButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ffffff',
    paddingHorizontal: 18,
  },
  whiteActionButtonText: {
    color: '#1e4f79',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  footerSection: {
    backgroundColor: '#131a26',
    paddingTop: 26,
    paddingBottom: 28,
  },
  footerSectionWide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerColumn: {
    width: '100%',
    marginBottom: 20,
  },
  footerColumnWide: {
    width: '48.8%',
    marginBottom: 0,
  },
  footerLogo: {
    width: 168,
    height: 94,
    marginBottom: 10,
  },
  footerHeading: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
  },
  footerText: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  footerLink: {
    color: '#9ec0db',
    fontSize: 14,
    lineHeight: 22,
    textDecorationLine: 'underline',
    marginBottom: 6,
  },
  updatesCard: {
    marginTop: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2b3648',
    backgroundColor: '#1b2433',
    padding: 14,
  },
  updatesTitle: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: '700',
    marginBottom: 8,
  },
  updatesText: {
    color: '#d1d5db',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  emailPlaceholder: {
    borderRadius: 6,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  emailPlaceholderText: {
    color: '#6b7280',
    fontSize: 14,
  },
});
