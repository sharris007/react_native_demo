import { useCallback, useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
import ChamberScreen from './src/screens/ChamberScreen';
import DavidScreen from './src/screens/DavidScreen';

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
  const colors = {
    Posts: '#2196F3',
    Users: '#4CAF50',
    Todos: '#FF9800',
    Server: '#9C27B0',
    Saved: '#5E35B1',
    Dashboard: '#1a1a1a',
    Chamber: '#1F5E91',
    David: '#1D6AA7',
  };
  const color = colors[label] || '#666';
  return (
    <View style={[styles.tabIcon, focused && { backgroundColor: color }]}>
      <Text style={[styles.tabIconText, { color: focused ? '#fff' : color }]}>
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

function getActiveRouteName(state) {
  if (!state || !state.routes || state.routes.length === 0) {
    return null;
  }

  const route = state.routes[state.index ?? 0];
  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
}

function ScrollableTabBar({ state, descriptors, navigation, onBeforeTabChange }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <ScrollView
        horizontal
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={96}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabScrollContent}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : typeof options.title === 'string'
                ? options.title
                : route.name;
          const isFocused = state.index === index;
          const tintColor = isFocused ? '#2196F3' : '#999';

          const onPress = async () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              if (onBeforeTabChange) {
                await onBeforeTabChange();
              }
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={({ pressed }) => [styles.tabItem, pressed && styles.tabItemPressed]}
            >
              {options.tabBarIcon
                ? options.tabBarIcon({
                    focused: isFocused,
                    color: tintColor,
                    size: 24,
                  })
                : null}
              <Text style={[styles.tabItemLabel, { color: tintColor }]} numberOfLines={1}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const currentRouteNameRef = useRef(null);
  const transitionQueueRef = useRef(Promise.resolve());
  const suppressNextStateChangeLoaderRef = useRef(false);
  const isMountedRef = useRef(true);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isTransitionLoading, setIsTransitionLoading] = useState(false);
  const logoRotation = useRef(new Animated.Value(0)).current;

  const spin = logoRotation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-360deg', '0deg', '360deg'],
  });

  const playBearsSpin = useCallback(() => {
    return new Promise((resolve) => {
      logoRotation.stopAnimation(() => {
        logoRotation.setValue(0);
        Animated.sequence([
          Animated.timing(logoRotation, {
            toValue: -1,
            duration: 820,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(logoRotation, {
            toValue: 0,
            duration: 820,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start(() => resolve());
      });
    });
  }, [logoRotation]);

  const runTransitionLoader = useCallback(() => {
    transitionQueueRef.current = transitionQueueRef.current.then(async () => {
      if (!isMountedRef.current) {
        return;
      }

      setIsTransitionLoading(true);
      await playBearsSpin();

      if (isMountedRef.current) {
        setIsTransitionLoading(false);
      }
    });

    return transitionQueueRef.current;
  }, [playBearsSpin]);

  useEffect(() => {
    let cancelled = false;

    const runInitialLoader = async () => {
      await playBearsSpin();
      if (!cancelled) {
        setIsInitialLoading(false);
      }
    };

    runInitialLoader();

    return () => {
      cancelled = true;
      isMountedRef.current = false;
      logoRotation.stopAnimation();
    };
  }, [logoRotation, playBearsSpin]);

  const handleNavigationReady = useCallback(() => {
    currentRouteNameRef.current = getActiveRouteName(navigationRef.getRootState());
  }, [navigationRef]);

  const handleNavigationStateChange = useCallback(
    (state) => {
      const nextRouteName = getActiveRouteName(state);
      if (!nextRouteName || currentRouteNameRef.current === nextRouteName) {
        return;
      }

      currentRouteNameRef.current = nextRouteName;
      if (suppressNextStateChangeLoaderRef.current) {
        suppressNextStateChangeLoaderRef.current = false;
        return;
      }

      runTransitionLoader();
    },
    [runTransitionLoader]
  );

  const handleBeforeTabChange = useCallback(async () => {
    await runTransitionLoader();
    suppressNextStateChangeLoaderRef.current = true;
  }, [runTransitionLoader]);

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
    <View style={styles.appContainer}>
      <NavigationContainer
        ref={navigationRef}
        onReady={handleNavigationReady}
        onStateChange={handleNavigationStateChange}
      >
        <StatusBar style={isTransitionLoading ? 'dark' : 'light'} />
        <Tab.Navigator
          tabBar={(props) => (
            <ScrollableTabBar {...props} onBeforeTabChange={handleBeforeTabChange} />
          )}
          screenOptions={{
            headerShown: false,
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
          <Tab.Screen
            name="Chamber"
            component={ChamberScreen}
            options={{
              tabBarIcon: ({ focused }) => <TabIcon label="Chamber" focused={focused} />,
            }}
          />
          <Tab.Screen
            name="David"
            component={DavidScreen}
            options={{
              tabBarIcon: ({ focused }) => <TabIcon label="David" focused={focused} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>

      {isTransitionLoading ? (
        <View style={styles.transitionOverlay}>
          <Animated.View style={[styles.logoWrapper, { transform: [{ rotate: spin }] }]}>
            <BearsLogo size={112} />
          </Animated.View>
          <Text style={styles.loadingText}>Loading screen...</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  tabScrollContent: {
    paddingHorizontal: 6,
  },
  tabItem: {
    width: 96,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 6,
  },
  tabItemPressed: {
    opacity: 0.74,
  },
  tabItemLabel: {
    marginTop: 4,
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
  tabIconText: {
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
  transitionOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
    backgroundColor: 'rgba(255,255,255,0.96)',
    alignItems: 'center',
    justifyContent: 'center',
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
