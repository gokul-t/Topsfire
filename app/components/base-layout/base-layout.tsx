import React, { FunctionComponent as Component } from "react"
import { View, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Screen, Header, Wallpaper } from "../"
import { HeaderProps } from "../header/header.propss"
import { color, spacing } from "../../theme"
import { observer, useObserver } from "mobx-react-lite"
// import { useStores } from "../../models"
import { baseLayoutStyles as styles } from "./base-layout.styles"
import { ScreenProps } from "../screen/screen.props"

export interface BaseLayoutProps {
  headerProps?: HeaderProps,
  screenProps?: ScreenProps
}

/**
 * This is a React functional component, ready to 
 *
 * Component description here for TypeScript tips.
 */
export const BaseLayout: Component<BaseLayoutProps> = props => {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  // Note: if you want your componeobservernt to refresh when data is updated in the store,
  // wrap this component in `` like so:
  // `export const BaseLayout = observer(function BaseLayout { ... })`

  // Enable this line to retrieve data from the rootStore (or other store)
  // const rootStore = useStores()
  // or
  // const { otherStore, userStore } = useStores()
  const { headerProps, screenProps = {}, children } = props;
  return useObserver(() => (
    <View style={styles.FULL}>
      <Wallpaper />
      <Screen style={styles.CONTAINER} backgroundColor={color.transparent} {...screenProps}>
        {headerProps ? <Header
          leftIcon="back"
          onLeftPress={goBack}
          style={styles.HEADER}
          titleStyle={styles.HEADER_TITLE}
          {...headerProps}
        /> : null}
        <SafeAreaView style={styles.screen}>
          {children}
        </SafeAreaView>
      </Screen >
    </View>
  ))
}
