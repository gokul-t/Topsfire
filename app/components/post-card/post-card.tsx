import React, { FunctionComponent as Component, useCallback } from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Avatar, Button, Card, Subheading, Paragraph } from "react-native-paper"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

// import { Text } from "../"
import { observer, useObserver } from "mobx-react-lite"
import { useStores, Post } from "../../models"
import { postCardStyles as styles } from "./post-card.styles"

export interface PostCardProps {
  item: Post
  screenCatId: string,
  cardType?: number
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
  const { item, screenCatId, cardType = 1 } = props
  const goPostScreen = () =>
    navigation.navigate("post", {
      postId: item.id,
      screenCatId,
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
      {cardType === 1 ? <CardType1 item={item} /> : <CardType2 item={item} />}
    </TouchableOpacity>
  ))
})


function CardType1({ item }) {
  return <Card style={styles.CARD} elevation={12}>
    <Card.Cover source={{ uri: item.imageUrl }} />
    <Card.Content style={styles.CardContent}>
      <Subheading>{item.formattedTitle}</Subheading>
      <Paragraph>
        <MaterialCommunityIcons name="clock" />
        {` ${item.formattedDate}`}
      </Paragraph>
    </Card.Content>
  </Card>
}

function CardType2({ item }) {
  return (
    <Card style={styles.CARD2} elevation={12}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Image source={{ uri: item.imageUrl }} style={{
          height: 100,
          width: 100,
          borderRadius: 5
        }} />
        <Card.Content>
          <Subheading numberOfLines={3}>{item.formattedTitle}</Subheading>
          <Paragraph>
            <MaterialCommunityIcons name="clock" />
            {` ${item.formattedDate}`}
          </Paragraph>
        </Card.Content>
      </View>
    </Card>
  );
}