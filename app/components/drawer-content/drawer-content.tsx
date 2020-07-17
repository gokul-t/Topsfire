import React, { useCallback } from "react"
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerNavigationProp,
  DrawerItem,
} from "@react-navigation/drawer"
import { Image, Linking, StyleSheet, TouchableOpacity, View } from "react-native"
import { drawerContentStyles as styles } from "./drawer-content.styles"
// import { useNavigation } from "@react-navigation/native"
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
import MaterialCommunityIcons from "react-native-paper/src/components/MaterialCommunityIcon";


// import Animated from "react-native-reanimated"
import config from "../../config"
// import { PreferencesContext } from './context/preferencesContext';

type Props = DrawerContentComponentProps<DrawerNavigationProp>

export function DrawerContent(props: Props) {
  const paperTheme = useTheme()
  //   const { rtl, theme, toggleRTL, toggleTheme } = React.useContext(
  //     PreferencesContext
  //   );

  // const translateX = Animated.interpolate(props.progress, {
  //   inputRange: [0, 0.5, 0.7, 0.8, 1],
  //   outputRange: [-100, -85, -70, -45, 0],
  // })

  const handleClick = useCallback(url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        __DEV__ && console.tron.log("Don't know how to open URI: " + url)
      }
    })
  }, [])

  return (
    <DrawerContentScrollView
      {...props}
      style={[
        props.style,
        {
          marginTop: -5,
          // backgroundColor: paperTheme.colors.primary,
        },
      ]}
    >
      {/* <Animated.View
        //@ts-ignore
        style={[
          styles.drawerContent,
          {
            backgroundColor: paperTheme.colors.surface,
            transform: [{ translateX }],
          },
        ]}
      > */}
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
            source={config.iconUri}
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
            <MaterialCommunityIcons name="home" color={paperTheme.colors.primary} size={size} />
          )}
          label="Home"
          onPress={() => props.navigation.navigate("home")}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted-square"
              color={paperTheme.colors.primary}
              size={size}
            />
          )}
          label="Categories"
          onPress={() => props.navigation.navigate("categories")}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="bookmark-outline" color={paperTheme.colors.primary} size={size} />
          )}
          label="Bookmarks"
          onPress={() => { }}
        />
      </Drawer.Section>
      <Drawer.Section title="Other">
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="information" color={paperTheme.colors.primary} size={size} />
          )}
          label="About US"
          onPress={() => props.navigation.navigate("aboutUs")}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="phone" color={paperTheme.colors.primary} size={size} />
          )}
          label="About US"
          onPress={() => props.navigation.navigate("contactUs")}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="share" color={paperTheme.colors.primary} size={size} />
          )}
          label="Share App"
          onPress={() => null}
        />
      </Drawer.Section>
      <Drawer.Section title="Follow Us">
        {config.followUs
          .filter(f => f.url)
          .map(followUsItem => (
            <DrawerItem
              key={followUsItem.icon}
              icon={({ color, size }) => (
                <MaterialCommunityIcons name={followUsItem.icon} color={paperTheme.colors.primary} size={size} />
              )}
              label={followUsItem.name}
              onPress={() => handleClick(followUsItem.url)}
            />
          ))}
        {config.followUs
          .filter(f => !f.url)
          .map(followUsItem => (
            <View key={followUsItem.icon} style={styles.preference} />
          ))}
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
      {/* </Animated.View> */}
    </DrawerContentScrollView>
  )
}
