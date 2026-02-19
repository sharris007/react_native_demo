import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  CACHED_POSTS: '@jsonplaceholder_cached_posts',
  CACHED_USERS: '@jsonplaceholder_cached_users',
  CACHED_TODOS: '@jsonplaceholder_cached_todos',
  FAVORITE_POST_IDS: '@jsonplaceholder_favorite_post_ids',
  LAST_FETCH_TIME: '@jsonplaceholder_last_fetch',
  RECENTLY_VIEWED: '@saved_recently_viewed',
};

const RECENTLY_VIEWED_MAX = 20;

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function getCachedPosts() {
  try {
    const cached = await AsyncStorage.getItem(KEYS.CACHED_POSTS);
    const lastFetch = await AsyncStorage.getItem(KEYS.LAST_FETCH_TIME + '_posts');
    if (cached && lastFetch && Date.now() - parseInt(lastFetch, 10) < CACHE_TTL_MS) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn('Storage getCachedPosts error:', e);
  }
  return null;
}

export async function setCachedPosts(posts) {
  try {
    await AsyncStorage.multiSet([
      [KEYS.CACHED_POSTS, JSON.stringify(posts)],
      [KEYS.LAST_FETCH_TIME + '_posts', String(Date.now())],
    ]);
  } catch (e) {
    console.warn('Storage setCachedPosts error:', e);
  }
}

export async function getCachedUsers() {
  try {
    const cached = await AsyncStorage.getItem(KEYS.CACHED_USERS);
    const lastFetch = await AsyncStorage.getItem(KEYS.LAST_FETCH_TIME + '_users');
    if (cached && lastFetch && Date.now() - parseInt(lastFetch, 10) < CACHE_TTL_MS) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn('Storage getCachedUsers error:', e);
  }
  return null;
}

export async function setCachedUsers(users) {
  try {
    await AsyncStorage.multiSet([
      [KEYS.CACHED_USERS, JSON.stringify(users)],
      [KEYS.LAST_FETCH_TIME + '_users', String(Date.now())],
    ]);
  } catch (e) {
    console.warn('Storage setCachedUsers error:', e);
  }
}

export async function getCachedTodos() {
  try {
    const cached = await AsyncStorage.getItem(KEYS.CACHED_TODOS);
    const lastFetch = await AsyncStorage.getItem(KEYS.LAST_FETCH_TIME + '_todos');
    if (cached && lastFetch && Date.now() - parseInt(lastFetch, 10) < CACHE_TTL_MS) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn('Storage getCachedTodos error:', e);
  }
  return null;
}

export async function setCachedTodos(todos) {
  try {
    await AsyncStorage.multiSet([
      [KEYS.CACHED_TODOS, JSON.stringify(todos)],
      [KEYS.LAST_FETCH_TIME + '_todos', String(Date.now())],
    ]);
  } catch (e) {
    console.warn('Storage setCachedTodos error:', e);
  }
}

export async function getFavoritePostIds() {
  try {
    const ids = await AsyncStorage.getItem(KEYS.FAVORITE_POST_IDS);
    return ids ? JSON.parse(ids) : [];
  } catch (e) {
    return [];
  }
}

export async function toggleFavoritePostId(postId) {
  try {
    const ids = await getFavoritePostIds();
    const next = ids.includes(postId)
      ? ids.filter((id) => id !== postId)
      : [...ids, postId];
    await AsyncStorage.setItem(KEYS.FAVORITE_POST_IDS, JSON.stringify(next));
    return next;
  } catch (e) {
    return await getFavoritePostIds();
  }
}

export async function getRecentlyViewed() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.RECENTLY_VIEWED);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export async function addRecentlyViewed(entry) {
  try {
    const list = await getRecentlyViewed();
    const { type, id, title, payload } = entry;
    const next = [
      { type, id, title, payload },
      ...list.filter((x) => !(x.type === type && x.id === id)),
    ].slice(0, RECENTLY_VIEWED_MAX);
    await AsyncStorage.setItem(KEYS.RECENTLY_VIEWED, JSON.stringify(next));
    return next;
  } catch (e) {
    return [];
  }
}
