import React, { FunctionComponent as Component, useCallback, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Avatar, Button, Badge, Card, Subheading, Paragraph } from "react-native-paper"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { AdMobBanner } from "react-native-admob"

// import { Text } from "../"
import { observer, useObserver } from "mobx-react-lite"
import { useStores, Post } from "../../models"
import { postCardStyles as styles } from "./post-card.styles"
import config from "../../config"

export interface PostCardProps {
  item: Post
  screenCatId: string,
  cardType?: number,
  separators?: any,
  index?: number
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
  const { item, screenCatId, cardType = 1, separators, index } = props
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

  useEffect(() => {
    if (separators && index && index % 5 === 0)
      return separators.highlight()
    return separators.unhighlight()
  }, [])

  return useObserver(() => (
    <TouchableOpacity onPress={goPostScreen}>
      {cardType === 1 ? <PostCardType1 item={item} /> : <PostCardType2 item={item} />}
    </TouchableOpacity>
  ))
})

export const PostCardAdsType = React.memo((props: { cardType: number }) => {
  return props.cardType === 1 ? <PostCardAdsType1 /> : <PostCardAdsType2 />
})

function PostCardType1({ item }) {
  return <Card style={styles.CARD} elevation={12}>
    <Card.Cover source={{ uri: item.imageUrl }} />
    <Card.Content style={styles.CardContent}>
      <Subheading numberOfLines={3}>{item.formattedTitle}</Subheading>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {item.categoryModels.map(c => <Badge key={c.id} style={{ marginRight: 3 }}>{c.name}</Badge>)}
        <Paragraph style={{ marginLeft: 'auto' }}>
          <MaterialCommunityIcons name="clock" />
          {` ${item.formattedDate}`}
        </Paragraph>
      </View>
    </Card.Content>
  </Card>
}

export function PostCardAdsType1(props) {
  return <Card style={styles.CARD} elevation={12}>
    <View style={{
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      marginTop: 15,
      marginBottom: 15
    }}>
      <View style={{
        minHeight: 250,
        minWidth: 300,
        backgroundColor: "grey"
      }}>
        <AdMobBanner
          adSize="mediumRectangle"
          adUnitID={config.adUnitID.banner}
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
        />
      </View>
    </View>
  </Card>
}

function PostCardType2({ item }) {
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

export function PostCardAdsType2() {
  return <View style={{
    // minHeight: 90,
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    flex: 1
  }} >
    <AdMobBanner
      adSize="fullBanner"
      adUnitID={config.adUnitID.banner}
      testDevices={[AdMobBanner.simulatorId]}
      onAdFailedToLoad={error => console.error(error)}
    />
  </View>
}