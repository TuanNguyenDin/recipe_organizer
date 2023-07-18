import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import COLORS from "./src/constants/colors";
import HomeScreen from "./src/screens/HomeScreen";
import FavoriteScreen from "./src/screens/FavoriteScreen";
import DetailsScreen from "./src/screens/DetailScreen";
import CustomSideMenu from "./src/screens/CustomSideMenu";
import TestPage from "./src/screens/TestPage";
import Login from "./src/screens/LoginPage";
import store from "./redux/store"
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigators = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.light,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={focused ? 25 : 22}
              color={focused ? "#3CB043" : "grey"}
            />
          ),
          tabBarActiveTintColor: "#3CB043",
        }}
      />

      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarLabel: "Favorite",
          // tabBarShowLabel: true,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={focused ? 25 : 22}
              color={focused ? "#3CB043" : "grey"}
            />
          ),
          tabBarActiveTintColor: "#3CB043",
        }}
      />
      <Tab.Screen
        name="User"
        component={Login}
        options={{
          tabBarLabel: "Login",
          // tabBarShowLabel: true,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={focused ? 25 : 22}
              color={focused ? "#3CB043" : "grey"}
            />
          ),
          tabBarActiveTintColor: "#3CB043",
        }}
      />
    </Tab.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomSideMenu {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: "#ffffff" },
        headerTintColor: "black",
        sceneContainerStyle: { backgroundColor: "#ffffff", height: 1 },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="TabHome"
        component={BottomTabNavigators}
        options={{
          title: "Home",
          drawerIcon: ({ color, focused }) => (
            <Ionicons
              name="ios-home-outline"
              size={focused ? 25 : 20}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Test"
        component={TestPage}
        options={{
          title: "Test",
          headerTitle: "Test",
          drawerIcon: ({ color, focused }) => (
            <Ionicons
              name="albums-outline"
              size={focused ? 25 : 20}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Stack.Navigator screenOptions={{ header: () => null }}>
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{
            title: "All Categories",
            headerShown: false,
            style: { backgroundColor: COLORS.gray },
          }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer></Provider>
  );
}

const styles = StyleSheet.create({});
