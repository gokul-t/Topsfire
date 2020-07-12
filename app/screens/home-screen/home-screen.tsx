import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { Button, View, ViewStyle, TextStyle } from "react-native"
// import { useNavigation } from "@react-navigation/native"

import { Screen, Text, Header, Wallpaper, BaseLayout } from "../../components"
import { color, spacing } from "../../theme"

// import { useStores } from "../models"

type HomeScreenParams = {
  navigation: any
}

export const HomeScreen: Component<HomeScreenParams> = observer(function HomeScreen({ navigation: drawerNavigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  return (
    <BaseLayout headerProps={{
      headerTx: "homeScreen.header",
      leftIcon: "menu",
      onLeftPress: () => drawerNavigation.toggleDrawer()
    }} >
    </BaseLayout >
  )
})
