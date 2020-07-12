import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text , BaseLayout} from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const CategoryPostsScreen: Component = observer(function CategoryPostsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <BaseLayout headerProps={{
      headerText: "categoriesScreen.header",
    }} >
    
    </BaseLayout >
  )
})
