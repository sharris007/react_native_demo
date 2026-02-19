import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

const MIKE_THE_GLAZIER_URL = 'https://www.miketheglazier.com/';

async function openSite() {
  try {
    await Linking.openURL(MIKE_THE_GLAZIER_URL);
  } catch (error) {
    console.warn('Unable to open Mike the Glazier site', error);
  }
}

export default function MikeTheGlazerScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Mike the Glazer</Text>
        <Text style={styles.subtitle}>Tap below to open the live site.</Text>
        <Pressable onPress={openSite} style={styles.button}>
          <Text style={styles.buttonText}>Open miketheglazier.com</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f7fa',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#173d5f',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#3e4e5f',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#0f5f8c',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
