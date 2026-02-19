import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { fetchTodos } from '../services/api';
import { getCachedTodos, setCachedTodos } from '../services/storage';

export default function TodosScreen() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadTodos = useCallback(async (useCache = true) => {
    if (useCache) {
      const cached = await getCachedTodos();
      if (cached && cached.length > 0) {
        setTodos(cached);
      }
    }
    try {
      const data = await fetchTodos();
      setTodos(data);
      await setCachedTodos(data);
    } catch (err) {
      console.warn('Fetch todos error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadTodos(false);
  }, [loadTodos]);

  const renderTodo = ({ item }) => (
    <View style={[styles.row, item.completed && styles.rowCompleted]}>
      <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
        {item.completed ? (
          <Text style={styles.checkmark}>✓</Text>
        ) : null}
      </View>
      <Text
        style={[styles.title, item.completed && styles.titleCompleted]}
        numberOfLines={2}
      >
        {item.title}
      </Text>
    </View>
  );

  const completedCount = todos.filter((t) => t.completed).length;

  if (loading && todos.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF9800" />
        <Text style={styles.loadingText}>Loading todos…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <Text style={styles.statsText}>
          {completedCount} / {todos.length} completed
        </Text>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderTodo}
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
  stats: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FF9800',
  },
  statsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  list: {
    padding: 12,
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  rowCompleted: {
    opacity: 0.7,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF9800',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    flex: 1,
    fontSize: 15,
    color: '#212121',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#757575',
  },
});
