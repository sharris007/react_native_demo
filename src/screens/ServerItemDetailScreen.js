import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { addRecentlyViewed } from '../services/storage';

export default function ServerItemDetailScreen({ route }) {
  const { item } = route.params;

  useEffect(() => {
    addRecentlyViewed({
      type: 'server',
      id: item.id,
      title: item.name,
      payload: item,
    });
  }, [item.id, item.name]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.itemId}>#{item.id}</Text>
        <View style={[styles.badge, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.badgeText}>{item.category}</Text>
        </View>
      </View>
      <Text style={styles.name}>{item.name}</Text>
      {item.createdAt && (
        <Text style={styles.created}>Created: {new Date(item.createdAt).toLocaleString()}</Text>
      )}
    </View>
  );
}

const getCategoryColor = (cat) => {
  const map = { Alpha: '#9C27B0', Beta: '#673AB7', Gamma: '#3F51B5', Misc: '#607D8B' };
  return map[cat] || '#757575';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9C27B0',
    marginRight: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 16,
  },
  created: {
    fontSize: 14,
    color: '#757575',
  },
});
