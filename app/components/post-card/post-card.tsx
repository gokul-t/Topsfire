import React, { FunctionComponent as Component } from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Avatar, Button, Card, Subheading, Paragraph } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import { Text } from "../"
import { observer, useObserver } from "mobx-react-lite"
import { useStores, Post } from "../../models"
import { postCardStyles as styles } from "./post-card.styles"

export interface PostCardProps {
  item: Post,
  screenCatId: string
}

/**
 * This is a React functional component, ready to 
 *
 * Component description here for TypeScript tips.
 */
export const PostCard: Component<PostCardProps> = React.memo(props => {
  const navigation = useNavigation()
  // Note: if you want your componeobservernt to refresh when data is updated in the store,
  // wrap this component in `` like so:
  // `export const PostCard = observer(function PostCard { ... })`

  // Enable this line to retrieve data from the rootStore (or other store)
  // const rootStore = useStores()
  // or
  // const { otherStore, userStore } = useStores()
  const { item, screenCatId } = props;
  const goPostScreen = () => navigation.navigate("post", {
    postId: item.id,
    screenCatId
  })
  //   <Image
  //   source={item.imageUrl ? {
  //     uri: item.imageUrl
  //   } : null}
  //   style={{
  //     height: 75,
  //     width: 75,
  //     borderRadius: 10
  //   }}
  // />



  return useObserver(() => (
    <TouchableOpacity onPress={goPostScreen}>
      <Card style={styles.CARD} elevation={12}>
        <Card.Cover source={{ uri: item.imageUrl }} />
        <Card.Content style={styles.CardContent}>
          <Subheading>{item.formattedTitle}</Subheading>
          <Paragraph>
            <MaterialCommunityIcons name="clock" />
            {` ${item.formattedDate}`}
          </Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  ))
})
