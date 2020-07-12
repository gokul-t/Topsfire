import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text, BaseLayout } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { color } from "../../theme"

type CategoriesScreenParams = {
  navigation: any
}

export const CategoriesScreen: Component<CategoriesScreenParams> = observer(function CategoriesScreen({ navigation: drawerNavigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <BaseLayout headerProps={{
      headerTx: "categoriesScreen.header",
      leftIcon: "menu",
      onLeftPress: () => drawerNavigation.toggleDrawer()
    }} >
    </BaseLayout >
  )
})
