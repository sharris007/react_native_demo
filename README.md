# JSON Placeholder React Native App

A React Native app built with Expo that fetches and displays data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/). Uses core components, flexbox, navigation, fetch, and AsyncStorage.

## Features

- **Posts** – Browse posts, view details, favorite posts (stored in AsyncStorage)
- **Users** – Browse users with contact info and company details
- **Todos** – View todo list with completion status
- **Server** – Items from local Node.js API (separate server)

## Tech Stack

- React Native 0.81 (Expo SDK 54)
- React 19
- React Navigation (Native Stack + Bottom Tabs)
- `fetch` for API calls
- `@react-native-async-storage/async-storage` for caching and favorites
- Flexbox layouts throughout

## Run the App

**1. Start the Node server** (for the Server tab):

```bash
npm run server
```

**2. Start the React Native app:**

```bash
npm start
```

Then:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web
- Scan QR code with Expo Go on device

## Project Structure

```
server/
├── index.js                # Node Express API
└── package.json

src/
├── config/
│   └── api.js              # API URLs (incl. Node server)
├── screens/
│   ├── PostsScreen.js      # Posts list + favorites
│   ├── PostDetailScreen.js # Single post + author
│   ├── UsersScreen.js      # Users list
│   ├── UserDetailScreen.js # User profile
│   ├── TodosScreen.js      # Todos list
│   ├── ServerItemsScreen.js      # Items from Node server
│   └── ServerItemDetailScreen.js # Node server item detail
└── services/
    ├── api.js              # fetch wrappers for JSONPlaceholder
    └── storage.js          # AsyncStorage cache + favorites
```
