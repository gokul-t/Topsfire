/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import {
  WelcomeScreen,
  DemoScreen,
  HomeScreen,
  CategoriesScreen,
  CategoryPostsScreen,
  PostScreen,
  ContactUsScreen,
  AboutUsScreen
} from "../screens"
import { DrawerContent } from "../components"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const Drawer = createDrawerNavigator<PrimaryParamList>()
const CategroryStack = createNativeStackNavigator<CategroryStackParamList>()
const HomeStack = createNativeStackNavigator<HomeStackParamList>()

export type CategroryStackParamList = {
  categories: undefined
  categoryPosts: undefined
  post: undefined
}

export function CategroryStackNavigator() {
  return (
    <CategroryStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName="categories"
    >
      <CategroryStack.Screen name="categories" component={CategoriesScreen} />
      <CategroryStack.Screen name="categoryPosts" component={CategoryPostsScreen} />
      <CategroryStack.Screen name="post" component={PostScreen} />
    </CategroryStack.Navigator>
  )
}
export type HomeStackParamList = {
  home: undefined
  post: undefined
}

export function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName="home"
    >
      <HomeStack.Screen name="home" component={HomeScreen} />
      <HomeStack.Screen name="post" component={PostScreen} />
    </HomeStack.Navigator>
  )
}

export type PrimaryParamList = {
  home: undefined
  categories: undefined,
  contactUs: undefined
  aboutUs: undefined
  // welcome: undefined,
  // demo: undefined
}

export function PrimaryNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        // headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName="home"
    >
      <Drawer.Screen name="home" component={HomeStackNavigator} />
      <Drawer.Screen name="categories" component={CategroryStackNavigator} />
      <Drawer.Screen name="contactUs" component={ContactUsScreen} />
      <Drawer.Screen name="aboutUs" component={AboutUsScreen} />
      {/* <Drawer.Screen name="welcome" component={WelcomeScreen} /> */}
      {/* <Drawer.Screen name="demo" component={DemoScreen} /> */}
    </Drawer.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome", "home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
