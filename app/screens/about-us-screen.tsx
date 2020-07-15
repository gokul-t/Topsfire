import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text, BaseLayout } from "../components"
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

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { color } from "../theme"
import AppJson from "../../app"
import config from "../config"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

type AboutUsScreenParams = {
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
export const AboutUsScreen: Component<AboutUsScreenParams> = observer(function AboutUsScreen({
  navigation: drawerNavigation,
}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <BaseLayout
      headerProps={{
        headerTx: "aboutUsScreen.header",
        leftIcon: "menu",
        onLeftPress: () => drawerNavigation.toggleDrawer(),
      }}
      screenProps={{ preset: "scroll" }}
    >
      <Card style={CARD} elevation={12}>
        <Card.Content style={CardContent}>
          <Title>{AppJson.name}</Title>
          <Caption>{AppJson.tagLine}</Caption>
          <Paragraph>
            We are promoting Self Un-employed Women’s to create their business by making craft
            items.we provide all steps to create craft work model example we are providing
            images,YouTube videos etc
          </Paragraph>
        </Card.Content>
      </Card>
    </BaseLayout>
  )
})
