import React, { FunctionComponent as Component } from "react"
import { View, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Screen, Header, Wallpaper } from "../"
import { HeaderProps } from "../header/header.props"
import { observer, useObserver } from "mobx-react-lite"
// import { useStores } from "../../models"
import { baseLayoutStyles as styles } from "./base-layout.styles"
import { ScreenProps } from "../screen/screen.props"
import { Appbar } from 'react-native-paper';
import { translate } from "../../i18n/"

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
      <Screen style={styles.CONTAINER} {...screenProps}>
        {headerProps ?
          // <Header
          //   leftIcon="back"
          //   onLeftPress={goBack}
          //   style={styles.HEADER}
          //   titleStyle={styles.HEADER_TITLE}
          //   {...headerProps}
          // /> 
          <AppHeader leftIcon="back" onLeftPress={goBack} {...headerProps}></AppHeader>
          : null}
        <SafeAreaView style={styles.SafeAreaView}>
          {children}
        </SafeAreaView>
      </Screen >
    </View>
  ))
}


function AppHeader(props) {
  const { leftIcon = "back", onLeftPress, headerText, headerTx } = props;
  const header = headerText || (headerTx && translate(headerTx)) || ""

  return <Appbar.Header>
    {leftIcon === "back" ? <Appbar.BackAction onPress={onLeftPress} /> : null}
    {leftIcon === "menu" ? <Appbar.Action icon="menu" onPress={onLeftPress} /> : null}
    <Appbar.Content
      title={header}
    // subtitle="Subtitle"
    />
    {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
    {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
  </Appbar.Header>
}