/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { ColorSchemeName } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import GamesScreen from '../screens/GamesScreen';
import LiveTickerScreen from '../screens/LiveTickerScreen';
import NewsDetail from '../screens/NewsDetail';
import NewsScreen from '../screens/NewsScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TableScreen from '../screens/TableScreen';
import TeamDetailScreen from '../screens/TeamDetailScreen';
import TeamsScreen from '../screens/TeamsScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef(null);
  const responseListener = useRef(null);
  const navigationRef = useRef(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        navigationRef.current?.navigate('Liveticker');
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  // if (Platform.OS === 'android') {
  //   Notifications.setNotificationChannelAsync('default', {
  //     name: 'default',
  //     importance: Notifications.AndroidImportance.MAX,
  //     vibrationPattern: [0, 250, 250, 250],
  //     lightColor: '#FF231F7C',
  //   });
  // }

  return token;
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='NewsDetail'
          component={NewsDetail}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='TeamDetailScreen'
          component={TeamDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='News'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name='News'
        component={NewsScreen}
        options={({ navigation }: RootTabScreenProps<'News'>) => ({
          title: 'News',
          tabBarIcon: ({ color }) => (
            <TabBarIcon family='ionicons' name='reader-outline' color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name='Table'
        component={TableScreen}
        options={{
          title: 'Tabelle',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='table' family='fontawesome' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Games'
        component={GamesScreen}
        options={{
          title: 'Spiele',
          tabBarIcon: ({ color }) => (
            <TabBarIcon family='ionicons' name='football' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Team'
        component={TeamsScreen}
        options={{
          title: 'Team',
          tabBarIcon: ({ color }) => (
            <TabBarIcon family='ionicons' name='people-sharp' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Liveticker'
        component={LiveTickerScreen}
        options={{
          title: 'Liveticker',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              family='ionicons'
              name='ios-flash-outline'
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons | typeof FontAwesome>['name'];
  color: string;
  family: 'ionicons' | 'fontawesome';
}) {
  return (
    <>
      {props.family === 'ionicons' ? (
        <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
      ) : (
        <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
      )}
    </>
  );
}
