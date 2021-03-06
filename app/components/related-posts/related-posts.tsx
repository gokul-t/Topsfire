import React, { useCallback } from "react"
import { View, ViewStyle, FlatList } from "react-native"
import {
  Caption,
  Surface,
  Title,
} from "react-native-paper"
import { CategoryPostList } from "../"
import { relatedPostsStyles as styles } from "./related-posts.styles"

export interface RelatedPostsProps {
  /**
   * Text which is looked up via i18n.
   */
  post: any
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function RelatedPosts(props: RelatedPostsProps) {
  // grab the props
  const { post } = props
  const renderRelatedPost = useCallback(
    ({ item }) => {
      const categoryModel = item;
      return (
        <Surface key={categoryModel.id}>
          <Caption style={{ marginLeft: 5 }}>{categoryModel.name}</Caption>
          <CategoryPostList
            key={categoryModel.id}
            categoryId={categoryModel.id}
            filter={excludePost}
            cardType={2}
          ></CategoryPostList>
        </Surface>
      )
    },
    [],
  );

  const excludePost = useCallback(
    p => {
      return p.id !== post.id
    },
    [post.id],
  )

  return (
    <View key={"relatedPostsView"}>
      <Title> Related Posts </Title>
      <FlatList
        data={post.categoryModels}
        renderItem={renderRelatedPost}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}
