import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MENU_ITEMS = ['Home', 'About', 'Locations', 'Services', 'Products', 'Gallery'];

const SERVICE_CARDS = [
  {
    title: 'INSTALL',
    image: 'https://www.miketheglazier.com/wp-content/uploads/2019/02/install.png',
    text: 'Our skilled tradesmen safely cut and install auto glass, windows, custom mirrors, shower doors, and storefront projects.',
  },
  {
    title: 'REPAIR',
    image: 'https://www.miketheglazier.com/wp-content/uploads/2019/02/repair.png',
    text: 'With over 100 years of experience, we restore damaged glass with modern tools and proven craftsmanship.',
  },
  {
    title: 'MAINTENANCE',
    image: 'https://www.miketheglazier.com/wp-content/uploads/2019/02/maintenance.png',
    text: 'Time-tested maintenance techniques and cleaning tips keep your glass looking clear and lasting longer.',
  },
];

const PRODUCT_CARDS = [
  {
    title: 'Auto Glass',
    image: 'https://www.miketheglazier.com/wp-content/uploads/2019/02/product1.png',
    text: 'Windshield and mirror replacements that get you back on the road.',
  },
  {
    title: 'Replacement Windows',
    image: 'https://www.miketheglazier.com/wp-content/uploads/2019/02/product2.png',
    text: 'Durable, well-crafted windows with expert installation support.',
  },
  {
    title: 'Shower Doors',
    image: 'https://www.miketheglazier.com/wp-content/uploads/2019/02/product3.png',
    text: 'Elegant, functional glass shower systems for modern bathrooms.',
  },
  {
    title: 'Store Front',
    image: 'https://www.miketheglazier.com/wp-content/uploads/2019/02/stores.png',
    text: 'Safe and attractive glass storefront solutions for businesses.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Robert D',
    location: 'Corona, Queens, NY',
    quote:
      'There is a reason this is a 4th generation business. The team is knowledgeable, responsive, and always professional.',
  },
  {
    name: 'Catherine M',
    location: 'Brooklyn, NY',
    quote:
      'Fast service and great communication. The team finished quickly and still paid attention to every detail.',
  },
  {
    name: 'Ashley L',
    location: 'New York, NY',
    quote:
      'Reliable timing, fair pricing, and high-quality work. I highly recommend Mike the Glazier for glass repair projects.',
  },
];

const GALLERY = [
  'https://www.miketheglazier.com/wp-content/uploads/2019/02/348s-4.jpg',
  'https://www.miketheglazier.com/wp-content/uploads/2019/02/348s.jpg',
  'https://www.miketheglazier.com/wp-content/uploads/2019/02/348s-1.jpg',
  'https://www.miketheglazier.com/wp-content/uploads/2019/02/348s-2.jpg',
  'https://www.miketheglazier.com/wp-content/uploads/2019/02/348s-5.jpg',
  'https://www.miketheglazier.com/wp-content/uploads/2019/02/nBYDStiX.jpeg',
];

export default function GlazerScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topRibbon}>
        <Text style={styles.ribbonText}>Queens: (718) 353-5555  |  Long Island: (516) 248-1900</Text>
        <View style={styles.ribbonButton}>
          <Text style={styles.ribbonButtonText}>Request Service</Text>
        </View>
      </View>

      <View style={styles.logoRow}>
        <Image
          source={{ uri: 'https://www.miketheglazier.com/wp-content/uploads/2019/02/logo.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.menuWrap}>
        {MENU_ITEMS.map((item) => (
          <View key={item} style={styles.menuPill}>
            <Text style={styles.menuPillText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.heroCard}>
        <Image
          source={{ uri: 'https://img.youtube.com/vi/KMnID9MqotU/hqdefault.jpg' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroEyebrow}>Since 1918</Text>
          <Text style={styles.heroTitle}>Mike the Glazier</Text>
          <Text style={styles.heroSubtitle}>
            Full service glass fabrication, installation, repair, and maintenance.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ABOUT US</Text>
        <Text style={styles.sectionText}>
          Founded in 1918, Mike The Glazier is a full service, family-owned and operated glass
          company specializing in all aspects of glass fabrication and installation.
        </Text>
        <Text style={styles.sectionText}>
          With over four generations of experience, our team brings courteous expertise to
          commercial and residential projects of every size.
        </Text>
        <View style={styles.aboutImageRow}>
          <Image
            source={{ uri: 'https://www.miketheglazier.com/wp-content/uploads/2019/02/about1.png' }}
            style={styles.aboutImageLarge}
          />
          <View style={styles.aboutImageStack}>
            <Image
              source={{ uri: 'https://www.miketheglazier.com/wp-content/uploads/2019/02/about2.png' }}
              style={styles.aboutImageSmall}
            />
            <Image
              source={{ uri: 'https://www.miketheglazier.com/wp-content/uploads/2019/02/about.png' }}
              style={styles.aboutImageSmall}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>LOCATIONS</Text>
        <Text style={styles.sectionText}>
          Mike the Glazier has two convenient shop locations throughout the New York metropolitan
          area.
        </Text>
        <View style={styles.locationCard}>
          <Text style={styles.locationTitle}>QUEENS COUNTY, NY</Text>
          <Text style={styles.locationText}>35-18 Linden Place, Flushing</Text>
          <Text style={styles.locationText}>P: (718) 353-5555  F: (718) 359-9772</Text>
        </View>
        <View style={styles.locationCard}>
          <Text style={styles.locationTitle}>NASSAU COUNTY, NY</Text>
          <Text style={styles.locationText}>133 E. Jericho Turnpike, Mineola</Text>
          <Text style={styles.locationText}>P: (516) 248-1900  F: (516) 248-7412</Text>
        </View>
      </View>

      <View style={styles.servicesSection}>
        {SERVICE_CARDS.map((service) => (
          <View key={service.title} style={styles.serviceCard}>
            <Image source={{ uri: service.image }} style={styles.serviceImage} resizeMode="cover" />
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.serviceText}>{service.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.darkBand}>
        <Text style={styles.darkBandTitle}>WHY CUSTOMERS CHOOSE US</Text>
        <Text style={styles.darkBandText}>Over 100 years of trusted family service</Text>
        <Text style={styles.darkBandText}>Commercial and residential glass expertise</Text>
        <Text style={styles.darkBandText}>Responsive support with quality craftsmanship</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>OUR PRODUCTS</Text>
        <View style={styles.productsGrid}>
          {PRODUCT_CARDS.map((product) => (
            <View key={product.title} style={styles.productCard}>
              <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" />
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productText}>{product.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Testimonials</Text>
        {TESTIMONIALS.map((item) => (
          <View key={item.name} style={styles.testimonialCard}>
            <Text style={styles.testimonialQuote}>"{item.quote}"</Text>
            <Text style={styles.testimonialName}>{item.name}</Text>
            <Text style={styles.testimonialLocation}>{item.location}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gallery</Text>
        <View style={styles.galleryGrid}>
          {GALLERY.map((img, index) => (
            <Image key={`${img}-${index}`} source={{ uri: img }} style={styles.galleryImage} />
          ))}
        </View>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>contact mike the glazier</Text>
        <View style={styles.contactRow}>
          <TextInput placeholder="First Name" style={styles.input} placeholderTextColor="#9aa3ad" />
          <TextInput placeholder="Last Name" style={styles.input} placeholderTextColor="#9aa3ad" />
        </View>
        <View style={styles.contactRow}>
          <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#9aa3ad" />
          <TextInput placeholder="Phone Number" style={styles.input} placeholderTextColor="#9aa3ad" />
        </View>
        <TextInput
          placeholder="Your Message"
          multiline
          style={[styles.input, styles.inputLarge]}
          placeholderTextColor="#9aa3ad"
        />
        <View style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Send Request</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>ABOUT US</Text>
        <Text style={styles.footerText}>
          Full-service glass specialists serving Queens and Long Island since 1918.
        </Text>

        <Text style={styles.footerTitle}>STAY SOCIAL</Text>
        <View style={styles.socialRow}>
          <View style={styles.socialCircle}>
            <Text style={styles.socialText}>FB</Text>
          </View>
          <View style={styles.socialCircle}>
            <Text style={styles.socialText}>IG</Text>
          </View>
          <View style={styles.socialCircle}>
            <Text style={styles.socialText}>YT</Text>
          </View>
          <View style={styles.socialCircle}>
            <Text style={styles.socialText}>LI</Text>
          </View>
        </View>

        <Text style={styles.footerTitle}>LOCATIONS</Text>
        <Text style={styles.footerText}>35-18 Linden Place, Flushing, NY 11354</Text>
        <Text style={styles.footerText}>133 E. Jericho Turnpike, Mineola, NY 11501</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  content: {
    paddingBottom: 24,
  },
  topRibbon: {
    backgroundColor: '#08a3dd',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  ribbonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  ribbonButton: {
    alignSelf: 'center',
    marginTop: 8,
    backgroundColor: '#ffbf31',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 4,
  },
  ribbonButtonText: {
    color: '#1f2d3d',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  logoRow: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
  },
  logo: {
    width: 180,
    height: 62,
  },
  menuWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e4e7ea',
    gap: 8,
  },
  menuPill: {
    backgroundColor: '#eef4fa',
    borderWidth: 1,
    borderColor: '#d5e4f2',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  menuPillText: {
    color: '#2f5069',
    fontSize: 11,
    fontWeight: '600',
  },
  heroCard: {
    margin: 12,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  heroImage: {
    width: '100%',
    height: 190,
  },
  heroOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: 'rgba(10, 22, 32, 0.7)',
  },
  heroEyebrow: {
    color: '#7fd9ff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
  heroSubtitle: {
    color: '#d6e8f3',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
  },
  section: {
    marginHorizontal: 12,
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e8ecef',
  },
  sectionTitle: {
    color: '#1b3f59',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  sectionText: {
    color: '#485c6c',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 10,
  },
  aboutImageRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  aboutImageLarge: {
    flex: 1.2,
    borderRadius: 10,
    height: 170,
  },
  aboutImageStack: {
    flex: 1,
    gap: 8,
  },
  aboutImageSmall: {
    width: '100%',
    height: 81,
    borderRadius: 10,
  },
  locationCard: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f1f8ff',
    borderLeftWidth: 4,
    borderLeftColor: '#08a3dd',
  },
  locationTitle: {
    color: '#0e3f5b',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  locationText: {
    color: '#415362',
    fontSize: 12,
    lineHeight: 18,
  },
  servicesSection: {
    marginHorizontal: 12,
    marginTop: 12,
    gap: 10,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e7ecef',
  },
  serviceImage: {
    width: '100%',
    height: 120,
  },
  serviceTitle: {
    paddingHorizontal: 12,
    paddingTop: 10,
    color: '#1c4059',
    fontSize: 16,
    fontWeight: '800',
  },
  serviceText: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 12,
    color: '#495f70',
    fontSize: 12,
    lineHeight: 18,
  },
  darkBand: {
    marginTop: 14,
    marginHorizontal: 0,
    backgroundColor: '#1d1f23',
    paddingVertical: 22,
    paddingHorizontal: 16,
  },
  darkBandTitle: {
    color: '#f9f9f9',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },
  darkBandText: {
    color: '#c8d0d6',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 6,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  productCard: {
    width: '48.5%',
    backgroundColor: '#f9fbfd',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e4eaf0',
  },
  productImage: {
    width: '100%',
    height: 88,
  },
  productTitle: {
    paddingTop: 8,
    paddingHorizontal: 8,
    color: '#1f425c',
    fontWeight: '700',
    fontSize: 12,
  },
  productText: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    color: '#596a77',
    fontSize: 11,
    lineHeight: 16,
  },
  testimonialCard: {
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#f5fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dfebf3',
  },
  testimonialQuote: {
    color: '#425462',
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  testimonialName: {
    marginTop: 8,
    color: '#173b54',
    fontSize: 13,
    fontWeight: '700',
  },
  testimonialLocation: {
    color: '#6d7f8b',
    fontSize: 11,
    marginTop: 2,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
  },
  galleryImage: {
    width: '49%',
    height: 92,
    borderRadius: 8,
    backgroundColor: '#e6edf3',
  },
  contactSection: {
    marginTop: 14,
    marginHorizontal: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e7ebef',
    padding: 14,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1b425f',
    textTransform: 'lowercase',
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d7e0e8',
    borderRadius: 8,
    backgroundColor: '#f8fbfe',
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#213648',
    fontSize: 12,
  },
  inputLarge: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  contactButton: {
    marginTop: 4,
    backgroundColor: '#08a3dd',
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  footer: {
    marginTop: 14,
    backgroundColor: '#0c84b9',
    paddingHorizontal: 14,
    paddingVertical: 20,
  },
  footerTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 8,
  },
  footerText: {
    color: '#d4f0fb',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 4,
  },
  socialRow: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  socialCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#b5e6f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});
