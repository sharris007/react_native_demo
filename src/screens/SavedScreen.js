import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutAnimation,
  Platform,
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import {
  getCachedPosts,
  getFavoritePostIds,
  getRecentlyViewed,
} from '../services/storage';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SECTION_COLORS = {
  favorites: { bg: '#E3F2FD', accent: '#1976D2', label: '#0D47A1' },
  recent: { bg: '#FFF3E0', accent: '#E65100', label: '#BF360C' },
};

function AnimatedRow({ children, index, sectionKey }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
        delay: index * 40,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
        delay: index * 40,
      }),
    ]).start();
  }, [index, sectionKey]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

export default function SavedScreen({ navigation }) {
  const [sections, setSections] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadSections = useCallback(async () => {
    const [favIds, cachedPosts, recent] = await Promise.all([
      getFavoritePostIds(),
      getCachedPosts(),
      getRecentlyViewed(),
    ]);
    const favoritePosts = (cachedPosts || []).filter((p) => favIds.includes(p.id));
    const next = [];
    if (favoritePosts.length > 0) {
      next.push({
        key: 'favorites',
        title: `Favorite Posts (${favoritePosts.length})`,
        data: favoritePosts.map((p) => ({ ...p, _sectionKey: 'favorites', _type: 'post' })),
      });
    }
    if (recent.length > 0) {
      next.push({
        key: 'recent',
        title: `Recently Viewed (${recent.length})`,
        data: recent.map((r) => ({ ...r, _sectionKey: 'recent' })),
      });
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSections(next);
  }, []);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadSections().finally(() => setRefreshing(false));
  }, [loadSections]);

  const handlePress = useCallback(
    (item) => {
      if (item._type === 'post' || (item.type === 'post' && item.payload)) {
        navigation.navigate('SavedDetail', {
          type: 'post',
          item: item.payload || item,
        });
      } else if (item.type === 'user' && item.payload) {
        navigation.navigate('SavedDetail', { type: 'user', item: item.payload });
      } else if (item.type === 'server' && item.payload) {
        navigation.navigate('SavedDetail', { type: 'server', item: item.payload });
      } else {
        navigation.navigate('SavedDetail', {
          type: item.type || 'post',
          item: { id: item.id, title: item.title },
        });
      }
    },
    [navigation]
  );

  const renderSectionHeader = ({ section }) => {
    const colors = SECTION_COLORS[section.key] || SECTION_COLORS.recent;
    return (
      <View style={[styles.sectionHeader, { backgroundColor: colors.bg }]}>
        <View style={[styles.sectionAccent, { backgroundColor: colors.accent }]} />
        <Text style={[styles.sectionTitle, { color: colors.label }]}>{section.title}</Text>
      </View>
    );
  };

  const renderItem = ({ item, index, section }) => {
    const colors = SECTION_COLORS[section.key] || SECTION_COLORS.recent;
    const title = item.title || item.name || `Item #${item.id}`;
    const isPost = item._type === 'post' || section.key === 'favorites';
    const dynamicRowStyle = {
      borderLeftWidth: 4,
      borderLeftColor: colors.accent,
    };
    return (
      <AnimatedRow index={index} sectionKey={section.key}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePress(item)}
          style={[styles.row, dynamicRowStyle]}
        >
          <View style={styles.rowContent}>
            <Text style={styles.rowTitle} numberOfLines={2}>
              {title}
            </Text>
            <Text style={[styles.rowMeta, { color: colors.accent }]}>
              {isPost ? `Post #${item.id}` : `${item.type || 'item'} #${item.id}`}
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </AnimatedRow>
    );
  };

  const renderListEmpty = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>Nothing saved yet</Text>
      <Text style={styles.emptySub}>
        Star posts on the Posts tab or open details to fill Recently Viewed.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => `${item._sectionKey || item.type}-${item.id}-${item.title}`}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        contentContainerStyle={[styles.list, sections.length === 0 && styles.listEmpty]}
        ListEmptyComponent={renderListEmpty}
        stickySectionHeadersEnabled
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#5E35B1" />
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
  list: {
    paddingBottom: 24,
  },
  listEmpty: {
    flexGrow: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionAccent: {
    width: 4,
    height: 24,
    borderRadius: 2,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 4,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  rowMeta: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  chevron: {
    fontSize: 24,
    color: '#bdbdbd',
    fontWeight: '300',
    marginLeft: 8,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#424242',
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 22,
  },
});
