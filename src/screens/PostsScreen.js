import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fetchPosts } from '../services/api';
import { getCachedPosts, getFavoritePostIds, setCachedPosts, toggleFavoritePostId } from '../services/storage';

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);

  const loadPosts = useCallback(async (useCache = true) => {
    if (useCache) {
      const cached = await getCachedPosts();
      if (cached && cached.length > 0) {
        setPosts(cached);
      }
    }
    try {
      const data = await fetchPosts();
      setPosts(data);
      await setCachedPosts(data);
    } catch (err) {
      console.warn('Fetch posts error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const loadFavorites = useCallback(async () => {
    const ids = await getFavoritePostIds();
    setFavoriteIds(ids);
  }, []);

  useEffect(() => {
    loadPosts();
    loadFavorites();
  }, [loadPosts, loadFavorites]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts(false);
    loadFavorites();
  }, [loadPosts, loadFavorites]);

  const handleFavorite = async (postId) => {
    const next = await toggleFavoritePostId(postId);
    setFavoriteIds(next);
  };

  const renderPost = ({ item }) => {
    const isFavorite = favoriteIds.includes(item.id);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('PostDetail', { post: item })}
        style={styles.card}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.postId}>#{item.id}</Text>
          <TouchableOpacity
            onPress={() => handleFavorite(item.id)}
            style={[styles.favButton, isFavorite && styles.favButtonActive]}
          >
            <Text style={styles.favText}>{isFavorite ? '★' : '☆'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.body} numberOfLines={2}>
          {item.body}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading && posts.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading posts…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderPost}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  list: {
    padding: 12,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  postId: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2196F3',
  },
  favButton: {
    padding: 6,
  },
  favButtonActive: {
    opacity: 1,
  },
  favText: {
    fontSize: 20,
    color: '#FFC107',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
