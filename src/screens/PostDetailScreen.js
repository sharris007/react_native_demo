import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchUser } from '../services/api';
import { addRecentlyViewed } from '../services/storage';

export default function PostDetailScreen({ route }) {
  const { post } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    addRecentlyViewed({
      type: 'post',
      id: post.id,
      title: post.title,
      payload: post,
    });
  }, [post.id, post.title]);

  const loadUser = useCallback(async () => {
    try {
      const data = await fetchUser(post.userId);
      setUser(data);
    } catch (err) {
      console.warn('Fetch user error:', err);
    } finally {
      setLoading(false);
    }
  }, [post.userId]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.postId}>Post #{post.id}</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#2196F3" />
        ) : user ? (
          <Text style={styles.author}>by {user.name}</Text>
        ) : null}
      </View>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  postId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 16,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 24,
  },
});
