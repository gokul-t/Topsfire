import React, { FunctionComponent as Component } from "react"
import { View, FlatList } from "react-native"
import { Text } from "../"
import { observer, useObserver } from "mobx-react-lite"
// import { useStores } from "../../models"
import { postListStyles as styles } from "./post-list.styles"

export interface PostListProps {
  posts: any,
  refreshing: boolean
}

/**
 * This is a React functional component, ready to 
 *
 * Component description here for TypeScript tips.
 */
export const PostList: Component<PostListProps> = props => {
  // Note: if you want your componeobservernt to refresh when data is updated in the store,
  // wrap this component in `` like so:
  // `export const PostList = observer(function PostList { ... })`

  // Enable this line to retrieve data from the rootStore (or other store)
  // const rootStore = useStores()
  // or
  // const { otherStore, userStore } = useStores()

  const { posts = [], refreshing } = props;

  const renderItem = () => <Text>HII</Text>

  return useObserver(() => (
    <FlatList
      data={posts}
      // onRefresh={fetchPosts}
      refreshing={refreshing}
      // onEndReached={handleLoadMore}
      onEndReachedThreshold={10}
      // ListFooterComponent={renderFooter}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      extraData={posts}
    />
  ))
}
