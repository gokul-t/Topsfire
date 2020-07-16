import * as React from "react"
import { Alert, View, ViewStyle, Image, Dimensions, Share } from "react-native"
import {
  Badge,
  Card,
  Subheading,
  Paragraph,
  FAB,
} from "react-native-paper"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import AppJson from "../../../app"
import { postBannerStyles as styles } from "./post-banner.styles"

export interface PostBannerProps {
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
export function PostBanner(props: PostBannerProps) {
  // grab the props
  const { post } = props

  return (
    <>
      <View key={"bannerView"}>
        <FAB
          style={styles.FAB}
          icon="share"
          onPress={() => onShare(post.formattedTitle, post.link)}
        />
        <Image
          source={{
            uri: post.imageUrl,
          }}
          // resizeMode="contain"
          style={{
            height: 200,
            width: Dimensions.get("window").width,
          }}
        />
      </View>
      <Card key={"titleView"}>
        <Card.Content>
          <Subheading>{post.formattedTitle}</Subheading>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {post.categoryModels.map(c => (
              <Badge key={c.id} style={{ marginRight: 3 }}>
                {c.name}
              </Badge>
            ))}
            <Paragraph style={{ marginLeft: "auto" }}>
              <MaterialCommunityIcons name="clock" />
              {` ${post.formattedDate}`}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
    </>
  )
}


const onShare = async (message?: string, url?: string) => {
  try {
    const result = await Share.share({
      message: message + "\n" + url,
      url,
      title: "Shared via " + AppJson.name,
    })
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      __DEV__ && console.tron.log(result)
    }
  } catch (error) {
    Alert.alert(error.message)
  }
}
