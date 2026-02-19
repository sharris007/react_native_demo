import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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

function ScrollableTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <ScrollView
        horizontal
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

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
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
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        tabBar={(props) => <ScrollableTabBar {...props} />}
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
  );
}

const styles = StyleSheet.create({
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
});
