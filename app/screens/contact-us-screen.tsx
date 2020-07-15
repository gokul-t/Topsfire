import React, { FunctionComponent as Component, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { Text, View, ViewStyle, Linking } from "react-native"
import { Screen, BaseLayout } from "../components"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import {
  Avatar,
  Button,
  Card,
  Subheading,
  Paragraph,
  Title,
  Caption,
  TouchableRipple,
} from "react-native-paper"
import AppJson from "../../app"
import config from "../config"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { color } from "../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

type ContactUsScreenParams = {
  navigation: any
}

const CARD: ViewStyle = {
  margin: 15,
  flex: 1,
  flexDirection: "row",
  backgroundColor: color.palette.white,
}
const CardContent: ViewStyle = {
  paddingHorizontal: 10,
  marginHorizontal: 5,
  flex: 1,
}
export const ContactUsScreen: Component<ContactUsScreenParams> = observer(function ContactUsScreen({
  navigation: drawerNavigation,
}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
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
    <BaseLayout
      headerProps={{
        headerTx: "contactUsScreen.header",
        leftIcon: "menu",
        onLeftPress: () => drawerNavigation.toggleDrawer(),
      }}
      screenProps={{ preset: "scroll" }}
    >
      <Card style={CARD} elevation={12}>
        <Card.Content style={CardContent}>
          <Title>{AppJson.name}</Title>
          <Caption>{AppJson.tagLine}</Caption>
          {AppJson.email && <Title>Email :</Title>}
          {AppJson.email && <Caption>{AppJson.email}</Caption>}
        </Card.Content>
      </Card>
      <Card style={CARD} elevation={12}>
        <Card.Content style={CardContent}>
          <Subheading>Follow Us</Subheading>
          {config.followUs
            .filter(f => f.url)
            .map(followUsItem => (
              <TouchableRipple
                key={followUsItem.icon}
                onPress={() => handleClick(followUsItem.url)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                  }}
                >
                  <Paragraph>
                    <MaterialCommunityIcons name={followUsItem.icon} />
                    {"   "}
                    {followUsItem.name}
                  </Paragraph>
                </View>
              </TouchableRipple>
            ))}
        </Card.Content>
      </Card>
    </BaseLayout>
  )
})
