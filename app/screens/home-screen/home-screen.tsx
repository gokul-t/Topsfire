import React, { FunctionComponent as Component, useCallback, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, View, ViewStyle, TextStyle, FlatList } from "react-native"
// import { useNavigation } from "@react-navigation/native"

import { Screen, Text, Header, Wallpaper, BaseLayout, PostCard } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"

type HomeScreenParams = {
  navigation: any
}

export const HomeScreen: Component<HomeScreenParams> = observer(function HomeScreen({ navigation: drawerNavigation }) {
  // Pull in one of our MST stores
  const { postStore } = useStores()
  const [loading, setLoading] = useState(false);
  const { posts = [], getPosts, loadMorePosts, nextPage } = postStore;
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const fetchPost = useCallback(async () => {
    if (!loading) {
      setLoading(true)
      try {
        await getPosts({})
      } catch (error) {
        __DEV__ && console.tron.log(error);
      }
      setLoading(false)
    }
  }, [loading])

  const handleLoadMore = useCallback(async () => {
    if (!loading && nextPage) {
      setLoading(true)
      try {
        await loadMorePosts({});
      } catch (error) {
        __DEV__ && console.tron.log(error);
      }
      setLoading(false)
    }
  }, [loading, nextPage]);

  useEffect(() => {
    fetchPost()
  }, [])
  
  const renderItem = useCallback((renderItemProps) => <PostCard {...renderItemProps}></PostCard>,[])

  return (
    <BaseLayout headerProps={{
      headerTx: "homeScreen.header",
      leftIcon: "menu",
      onLeftPress: () => drawerNavigation.toggleDrawer()
    }} >
      <FlatList
        data={posts}
        refreshing={loading}
        onRefresh={fetchPost}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={10}
        // ListFooterComponent={renderFooter}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        extraData={posts}
      />
    </BaseLayout >
  )
})
