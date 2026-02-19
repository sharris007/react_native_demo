const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory items (simulates server-side data)
const items = [
  { id: 1, name: 'Server Item Alpha', category: 'Alpha', createdAt: new Date().toISOString() },
  { id: 2, name: 'Server Item Beta', category: 'Beta', createdAt: new Date().toISOString() },
  { id: 3, name: 'Server Item Gamma', category: 'Gamma', createdAt: new Date().toISOString() },
  { id: 4, name: 'Server Item Delta', category: 'Alpha', createdAt: new Date().toISOString() },
  { id: 5, name: 'Server Item Epsilon', category: 'Beta', createdAt: new Date().toISOString() },
];

// GET /api/items - List all items
app.get('/api/items', (req, res) => {
  res.json({ success: true, items });
});

// GET /api/items/:id - Get single item
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ success: false, error: 'Item not found' });
  }
  res.json({ success: true, item });
});

// POST /api/items - Create new item
app.post('/api/items', (req, res) => {
  const { name, category } = req.body || {};
  const id = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
  const item = {
    id,
    name: name || `New Item ${id}`,
    category: category || 'Misc',
    createdAt: new Date().toISOString(),
  };
  items.push(item);
  res.status(201).json({ success: true, item });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

// External call to JSON Placeholder (Node server fetches, then returns to client)
const JSONPLACEHOLDER = 'https://jsonplaceholder.typicode.com';

app.get('/api/jsonplaceholder/posts', async (req, res) => {
  try {
    const response = await fetch(`${JSONPLACEHOLDER}/posts`);
    if (!response.ok) throw new Error(`JSONPlaceholder responded ${response.status}`);
    const data = await response.json();
    res.json({ success: true, data });
  } catch (err) {
    console.error('JSONPlaceholder posts error:', err);
    res.status(502).json({ success: false, error: err.message });
  }
});

app.get('/api/jsonplaceholder/posts/:id', async (req, res) => {
  try {
    const response = await fetch(`${JSONPLACEHOLDER}/posts/${req.params.id}`);
    if (!response.ok) throw new Error(`JSONPlaceholder responded ${response.status}`);
    const data = await response.json();
    res.json({ success: true, data });
  } catch (err) {
    console.error('JSONPlaceholder post error:', err);
    res.status(502).json({ success: false, error: err.message });
  }
});

app.get('/api/jsonplaceholder/users', async (req, res) => {
  try {
    const response = await fetch(`${JSONPLACEHOLDER}/users`);
    if (!response.ok) throw new Error(`JSONPlaceholder responded ${response.status}`);
    const data = await response.json();
    res.json({ success: true, data });
  } catch (err) {
    console.error('JSONPlaceholder users error:', err);
    res.status(502).json({ success: false, error: err.message });
  }
});

app.get('/api/jsonplaceholder/users/:id', async (req, res) => {
  try {
    const response = await fetch(`${JSONPLACEHOLDER}/users/${req.params.id}`);
    if (!response.ok) throw new Error(`JSONPlaceholder responded ${response.status}`);
    const data = await response.json();
    res.json({ success: true, data });
  } catch (err) {
    console.error('JSONPlaceholder user error:', err);
    res.status(502).json({ success: false, error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Node server running at http://localhost:${PORT}`);
  console.log(`API: GET /api/items, GET /api/items/:id, POST /api/items`);
  console.log(`API: GET /api/jsonplaceholder/posts, /posts/:id, /users, /users/:id`);
});
