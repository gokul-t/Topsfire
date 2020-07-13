import React, { FunctionComponent as Component, useCallback, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, View, ViewStyle, TextStyle, FlatList } from "react-native"
// import { useNavigation } from "@react-navigation/native"

import { Screen, Text, Header, Wallpaper, BaseLayout, PostList } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import config from "../../config"

type HomeScreenParams = {
  navigation: any
}

export const HomeScreen: Component<HomeScreenParams> = observer(function HomeScreen({ navigation: drawerNavigation }) {
  // Pull in one of our MST stores
  const { postStore } = useStores()
  const { posts = [], getPosts, loadMorePosts, nextPage } = postStore;
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  return (
    <BaseLayout headerProps={{
      headerText: config.displayName,
      leftIcon: "menu",
      onLeftPress: () => drawerNavigation.toggleDrawer()
    }} >
      <PostList
        {...{
          posts,
          getPosts,
          loadMorePosts,
          nextPage
        }}
      />
    </BaseLayout >
  )
})
