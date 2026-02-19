import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

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
import Cim400Screen from './src/screens/Cim400Screen';

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
  const colors = { Posts: '#2196F3', Users: '#4CAF50', Todos: '#FF9800', Server: '#9C27B0', Saved: '#5E35B1', Dashboard: '#1a1a1a', CIM400: '#0B74B8' };
  const color = colors[label] || '#666';
  return (
    <View style={[styles.tabIcon, focused && { backgroundColor: color }]}>
      <Text style={[styles.tabLabel, { color: focused ? '#fff' : color }]}>
        {label.charAt(0)}
      </Text>
    </View>
  );
}

export default function App() {
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
        <Tab.Screen
          name="CIM400"
          component={Cim400Screen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon label="CIM400" focused={focused} />,
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
});
