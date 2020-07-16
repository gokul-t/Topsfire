import React, { FunctionComponent as Component, useCallback, useEffect, useState } from "react"
import { FlatList } from "react-native"
import { PostCard, PostCardAdsType } from "../"
import { useObserver } from "mobx-react-lite"
// import { useStores, PostStore, PostStoreSnapshot } from "../../models"
// import { postListStyles as styles } from "./post-list.styles"

export interface PostListProps {
  posts: any
  getPosts: any
  loadMorePosts: any
  nextPage: boolean
  categoryId?: string
  horizontal?: boolean
  filter: Function
  cardType?: number,
  onPress?: Function
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
  const {
    posts = [],
    getPosts,
    loadMorePosts,
    nextPage,
    categoryId,
    horizontal = false,
    filter,
    cardType,
    onPress
  } = props

  const [loading, setLoading] = useState(false)

  const fetchPost = useCallback(async () => {
    if (!loading) {
      setLoading(true)
      try {
        await getPosts({ categoryId })
      } catch (error) {
        __DEV__ && console.tron.log(error)
      }
      setLoading(false)
    }
  }, [loading])

  const handleLoadMore = useCallback(async () => {
    if (!loading && nextPage) {
      setLoading(true)
      try {
        await loadMorePosts({ categoryId })
      } catch (error) {
        __DEV__ && console.tron.log(error)
      }
      setLoading(false)
    }
  }, [loading, nextPage])

  useEffect(() => {
    if (!posts.length)
      fetchPost()
  }, [])

  const renderItem = useCallback(
    renderItemProps => (
      <PostCard
        {...renderItemProps}
        key={renderItemProps.item.id}
        cardType={cardType}
        screenCatId={categoryId}
        onPress={onPress}
      ></PostCard>
    ),
    [],
  )

  const ItemSeparatorComponent = useCallback(
    props =>
      props.highlighted && (
        <PostCardAdsType
          key={"seperator-" + props.leadingItem.index}
          cardType={cardType}
        />
      ),
    [],
  )

  const data = filter ? posts.filter(filter) : posts

  return useObserver(() => (
    <FlatList
      data={data}
      refreshing={loading}
      onRefresh={fetchPost}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={5}
      ItemSeparatorComponent={ItemSeparatorComponent}
      // ListFooterComponent={renderFooter}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id.toString()}
      // extraData={posts}
      horizontal={horizontal}
    />
  ))
}
