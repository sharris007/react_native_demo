import { NODE_SERVER_URL } from '../config/api';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Node server API
export async function fetchServerItems() {
  const response = await fetch(`${NODE_SERVER_URL}/api/items`);
  if (!response.ok) throw new Error('Failed to fetch server items');
  const data = await response.json();
  return data.items || [];
}

export async function fetchServerItem(id) {
  const response = await fetch(`${NODE_SERVER_URL}/api/items/${id}`);
  if (!response.ok) throw new Error('Failed to fetch server item');
  const data = await response.json();
  return data.item;
}

export async function createServerItem(name, category) {
  const response = await fetch(`${NODE_SERVER_URL}/api/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, category }),
  });
  if (!response.ok) throw new Error('Failed to create server item');
  const data = await response.json();
  return data.item;
}

export async function fetchPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}

export async function fetchPost(id) {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json();
}

export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}

export async function fetchUser(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}

export async function fetchTodos() {
  const response = await fetch(`${BASE_URL}/todos`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
}
