import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import PostsScreen from './src/screens/PostsScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';
import UsersScreen from './src/screens/UsersScreen';
import UserDetailScreen from './src/screens/UserDetailScreen';
import TodosScreen from './src/screens/TodosScreen';
import ServerItemsScreen from './src/screens/ServerItemsScreen';
import ServerItemDetailScreen from './src/screens/ServerItemDetailScreen';
import SavedScreen from './src/screens/SavedScreen';
import SavedDetailScreen from './src/screens/SavedDetailScreen';
import DashboardScreen from './src/screens/DashboardScreen';

const Tab = createBottomTabNavigator();
const PostsStack = createNativeStackNavigator();
const UsersStack = createNativeStackNavigator();
const ServerStack = createNativeStackNavigator();
const SavedStack = createNativeStackNavigator();

function PostsStackNavigator() {
  return (
    <PostsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#2196F3' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600', fontSize: 18 },
      }}
    >
      <PostsStack.Screen
        name="PostsList"
        component={PostsScreen}
        options={{ title: 'Posts' }}
      />
      <PostsStack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{ title: 'Post Detail' }}
      />
    </PostsStack.Navigator>
  );
}

function UsersStackNavigator() {
  return (
    <UsersStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#4CAF50' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600', fontSize: 18 },
      }}
    >
      <UsersStack.Screen
        name="UsersList"
        component={UsersScreen}
        options={{ title: 'Users' }}
      />
      <UsersStack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={{ title: 'User Detail' }}
      />
    </UsersStack.Navigator>
  );
}

function ServerStackNavigator() {
  return (
    <ServerStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#9C27B0' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600', fontSize: 18 },
      }}
    >
      <ServerStack.Screen
        name="ServerItemsList"
        component={ServerItemsScreen}
        options={{ title: 'Server Items' }}
      />
      <ServerStack.Screen
        name="ServerItemDetail"
        component={ServerItemDetailScreen}
        options={{ title: 'Item Detail' }}
      />
    </ServerStack.Navigator>
  );
}

function SavedStackNavigator() {
  return (
    <SavedStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#5E35B1' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600', fontSize: 18 },
      }}
    >
      <SavedStack.Screen
        name="SavedList"
        component={SavedScreen}
        options={{ title: 'Saved' }}
      />
      <SavedStack.Screen
        name="SavedDetail"
        component={SavedDetailScreen}
        options={{ title: 'Detail' }}
      />
    </SavedStack.Navigator>
  );
}

function TabIcon({ label, focused }) {
  const colors = { Posts: '#2196F3', Users: '#4CAF50', Todos: '#FF9800', Server: '#9C27B0', Saved: '#5E35B1', Dashboard: '#1a1a1a' };
  const color = colors[label] || '#666';
  return (
    <View style={[styles.tabIcon, focused && { backgroundColor: color }]}>
      <Text style={[styles.tabLabel, { color: focused ? '#fff' : color }]}>
        {label.charAt(0)}
      </Text>
    </View>
  );
}

function BearsLogo({ size = 132 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 140 160">
      <Path
        d="M112 24 A66 66 0 1 0 112 136"
        fill="none"
        stroke="#0B162A"
        strokeWidth={36}
        strokeLinecap="round"
      />
      <Path
        d="M112 24 A66 66 0 1 0 112 136"
        fill="none"
        stroke="#C83803"
        strokeWidth={26}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const logoRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isMounted = true;
    const rotationSequence = Animated.sequence([
      Animated.timing(logoRotation, {
        toValue: 1,
        duration: 900,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(logoRotation, {
        toValue: 0,
        duration: 900,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]);

    rotationSequence.start(({ finished }) => {
      if (finished && isMounted) {
        setIsInitialLoading(false);
      }
    });

    return () => {
      isMounted = false;
      rotationSequence.stop();
    };
  }, [logoRotation]);

  const spin = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (isInitialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="dark" />
        <Animated.View style={[styles.logoWrapper, { transform: [{ rotate: spin }] }]}>
          <BearsLogo />
        </Animated.View>
        <Text style={styles.loadingText}>Loading app...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      >
        <Tab.Screen
          name="Posts"
          component={PostsStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon label="Posts" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Users"
          component={UsersStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon label="Users" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Todos"
          component={TodosScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon label="Todos" focused={focused} />,
            headerShown: true,
            headerStyle: { backgroundColor: '#FF9800' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '600', fontSize: 18 },
          }}
        />
        <Tab.Screen
          name="Server"
          component={ServerStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon label="Server" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Saved"
          component={SavedStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon label="Saved" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon label="Dashboard" focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    height: 64,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  logoWrapper: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0B162A',
  },
});
