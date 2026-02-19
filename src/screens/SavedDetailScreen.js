import { useEffect, useRef } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const TYPE_STYLES = {
  post: { accent: '#1976D2', label: 'Post' },
  user: { accent: '#2E7D32', label: 'User' },
  server: { accent: '#7B1FA2', label: 'Server Item' },
};

export default function SavedDetailScreen({ route }) {
  const { type = 'post', item } = route.params || {};
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;
  const stylesConfig = TYPE_STYLES[type] || TYPE_STYLES.post;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }),
    ]).start();
  }, [item?.id]);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.missing}>No item to display.</Text>
      </View>
    );
  }

  const content = (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.badge, { backgroundColor: stylesConfig.accent }]}>
        <Text style={styles.badgeText}>{stylesConfig.label}</Text>
      </View>
      <Text style={styles.id}>#{item.id}</Text>
      <Text style={styles.title}>{item.title || item.name || 'Untitled'}</Text>

      {type === 'post' && item.body && (
        <View style={styles.block}>
          <Text style={styles.body}>{item.body}</Text>
        </View>
      )}

      {type === 'user' && (
        <View style={styles.block}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{item.email}</Text>
          {item.phone && (
            <>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{item.phone}</Text>
            </>
          )}
          {item.company?.name && (
            <>
              <Text style={styles.label}>Company</Text>
              <Text style={styles.value}>{item.company.name}</Text>
            </>
          )}
        </View>
      )}

      {type === 'server' && (
        <View style={styles.block}>
          {item.category && (
            <>
              <Text style={styles.label}>Category</Text>
              <Text style={styles.value}>{item.category}</Text>
            </>
          )}
          {item.createdAt && (
            <>
              <Text style={styles.label}>Created</Text>
              <Text style={styles.value}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fade,
          transform: [{ translateY: slide }],
        },
      ]}
    >
      {content}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  id: {
    fontSize: 14,
    fontWeight: '600',
    color: '#757575',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
    lineHeight: 32,
    marginBottom: 24,
  },
  block: {
    marginTop: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    marginTop: 16,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 24,
  },
  missing: {
    flex: 1,
    textAlign: 'center',
    marginTop: 48,
    fontSize: 16,
    color: '#757575',
  },
});
