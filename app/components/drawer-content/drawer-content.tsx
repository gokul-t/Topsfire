import React from "react"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { drawerContentStyles as styles } from "./drawer-content.styles"
import { useNavigation } from "@react-navigation/native"

import {
  Avatar,
  Caption,
  Drawer,
  Paragraph,
  Switch,
  Text,
  Title,
  TouchableRipple,
  useTheme,
} from "react-native-paper"
import Animated from "react-native-reanimated"
import config from "../../config"
// import { PreferencesContext } from './context/preferencesContext';

type Props = DrawerContentComponentProps<DrawerNavigationProp>

export function DrawerContent(props: Props) {
  const paperTheme = useTheme()
  //   const { rtl, theme, toggleRTL, toggleTheme } = React.useContext(
  //     PreferencesContext
  //   );

  const translateX = Animated.interpolate(props.progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  })

  return (
    <DrawerContentScrollView
      {...props}
      style={[
        props.style,
        {
          backgroundColor: paperTheme.colors.primary,
        },
      ]}
    >
      <Animated.View
        //@ts-ignore
        style={[
          styles.drawerContent,
          {
            backgroundColor: paperTheme.colors.surface,
            transform: [{ translateX }],
          },
        ]}
      >
        <View
          style={[
            styles.userInfoSection,
            {
              backgroundColor: paperTheme.colors.primary,
            },
          ]}
        >
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              props.navigation.toggleDrawer()
            }}
          >
            <Image
              source={{
                uri: config.iconUri,
              }}
              style={{
                width: 75,
                height: 75,
              }}
            />
          </TouchableOpacity>
          <Title style={styles.title}>{config.displayName}</Title>
          <Caption style={styles.caption}>{config.tagLine}</Caption>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            )}
            label="Home"
            onPress={() => props.navigation.navigate("home")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="format-list-bulleted-square"
                color={color}
                size={size}
              />
            )}
            label="Categories"
            onPress={() => props.navigation.navigate("categories")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="bookmark-outline" color={color} size={size} />
            )}
            label="Bookmarks"
            onPress={() => {}}
          />
        </Drawer.Section>
        <Drawer.Section title="Other">
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>About US</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>Contact Us</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>Share App</Text>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        <Drawer.Section title="Follow Us">
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>
                <MaterialCommunityIcons name="facebook" /> Facebook
              </Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>
                <MaterialCommunityIcons name="youtube" /> Youtube
              </Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>
                <MaterialCommunityIcons name="twitter" /> Twitter
              </Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>
                <MaterialCommunityIcons name="search-web" /> Website
              </Text>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        {/* <Drawer.Section title="Preferences">
          <TouchableRipple onPress={toggleTheme}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={theme === 'dark'} />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={toggleRTL}>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <View pointerEvents="none">
                <Switch value={rtl === 'right'} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section> */}
      </Animated.View>
    </DrawerContentScrollView>
  )
}
