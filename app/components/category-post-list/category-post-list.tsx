import React, { FunctionComponent as Component } from "react"
import { View } from "react-native"
import { PostList } from "../"
import { observer, useObserver } from "mobx-react-lite"
import { useStores } from "../../models"
import { categoryPostListStyles as styles } from "./category-post-list.styles"

export interface CategoryPostListProps {
  categoryId: string
  horizontal?: boolean
  filter?: Function,
  cardType?: number,
  onPress?: any
}

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const CategoryPostList: Component<CategoryPostListProps> = props => {
  // Note: if you want your componeobservernt to refresh when data is updated in the store,
  // wrap this component in `` like so:
  // `export const CategoryPostList = observer(function CategoryPostList { ... })`

  // Enable this line to retrieve data from the rootStore (or other store)
  // const rootStore = useStores()
  // or
  const { categoryId, ...rest } = props
  const { categoryPostStore } = useStores()

  const postStore = categoryPostStore.getPostStore(categoryId)
  const { posts = [], getPosts, loadMorePosts, nextPage } = postStore

  return useObserver(() => (
    <PostList
      {...{
        posts,
        getPosts,
        loadMorePosts,
        nextPage,
        categoryId,
        ...rest
      }}
    />
  ))
}
