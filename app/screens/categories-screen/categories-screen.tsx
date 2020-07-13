import React, { FunctionComponent as Component, useCallback, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, FlatList, TouchableOpacity, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { List } from 'react-native-paper';

import { Screen, Text, BaseLayout, BulletItem } from "../../components"
import { useStores } from "../../models"
import { color } from "../../theme"


type CategoriesScreenParams = {
  navigation: any
}

export const CategoriesScreen: Component<CategoriesScreenParams> = observer(function CategoriesScreen({ navigation: drawerNavigation }) {
  // Pull in one of our MST stores
  const { categoryStore } = useStores()
  const [loading, setLoading] = useState(false);
  // OR
  // const rootStore = useStores()
  // Pull in navigation via hook
  const navigation = useNavigation()
  const goCategoryPostsScreen = (item) => navigation.navigate("categoryPosts", {
    categoryId: item.id
  })
  const { categories, getCategories, loadMoreCategories, nextPage } = categoryStore;
  const fetchCategories = useCallback(async () => {
    if (!loading) {
      setLoading(true)
      try {
        await getCategories()
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
        await loadMoreCategories();
      } catch (error) {
        __DEV__ && console.tron.log(error);
      }
      setLoading(false)
    }
  }, [loading, nextPage]);

  useEffect(() => {
    fetchCategories()
  }, [])

  const renderItem = useCallback(({ item }) => <List.Item
    title={item.formattedName}
    description={item.formattedDescription}
    left={props => <List.Icon {...props} icon="folder" />}
    key={item.id} onPress={() => goCategoryPostsScreen(item)}
  />, [])

  return (
    <BaseLayout headerProps={{
      headerTx: "categoriesScreen.header",
      leftIcon: "menu",
      onLeftPress: () => drawerNavigation.toggleDrawer()
    }}
    >
      <FlatList
        data={categories}
        onRefresh={fetchCategories}
        refreshing={loading}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        // ListFooterComponent={renderFooter}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        extraData={categories}
      />
    </BaseLayout >
  )
})
