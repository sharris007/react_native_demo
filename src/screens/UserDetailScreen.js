import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { addRecentlyViewed } from '../services/storage';

export default function UserDetailScreen({ route }) {
  const { user } = route.params;
  const { address, company } = user;

  useEffect(() => {
    addRecentlyViewed({
      type: 'user',
      id: user.id,
      title: user.name,
      payload: user,
    });
  }, [user.id, user.name]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user.phone}</Text>
        <Text style={styles.label}>Website</Text>
        <Text style={styles.value}>{user.website}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        <Text style={styles.value}>
          {address.suite} {address.street}
        </Text>
        <Text style={styles.value}>
          {address.city}, {address.zipcode}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Company</Text>
        <Text style={styles.companyName}>{company.name}</Text>
        <Text style={styles.catchPhrase}>"{company.catchPhrase}"</Text>
        <Text style={styles.bs}>{company.bs}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
  },
  username: {
    fontSize: 16,
    color: '#757575',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  label: {
    fontSize: 12,
    color: '#9e9e9e',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 24,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  catchPhrase: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  bs: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
});
